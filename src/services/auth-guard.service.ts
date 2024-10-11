import {
  CanActivate,
  ClassProvider,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '@/globals/constants';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { IS_AUTHORIZE_KEY } from '@/decorators/authorize.decorator';
import { IClaimsJwtToken } from '@/schemas/JwtToken';
import {
  createLogger,
  createServiceProvider as createProviderService,
  defineProperty,
  extractTokenFromHeader,
  isActivated,
} from '@/utils/common';
import type { Request } from 'express';
import { SessionService } from './session.service';
import { Session } from '@/models/Session';

@Injectable()
export class AuthGuard implements CanActivate {
  public readonly logger: Logger = createLogger(this);

  private readonly sessionService: SessionService;
  private readonly jwtService: JwtService;
  private readonly reflector: Reflector;

  constructor(sessionService: SessionService, jwtService: JwtService, reflector: Reflector) {
    this.sessionService = sessionService;
    this.jwtService = jwtService;
    this.reflector = reflector;
  }

  static provider(): ClassProvider {
    return createProviderService(APP_GUARD, AuthGuard);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    isActivated(this);

    const isAuthorize = this.reflector.getAllAndOverride<boolean>(IS_AUTHORIZE_KEY, [context.getHandler(), context.getClass()]);

    if (!isAuthorize) {
      return true;
    }

    const request = context.switchToHttp().getRequest() as Request;
    const token = extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const options = { secret: jwtConstants.secretKey };
      const payload = (await this.jwtService.verifyAsync(token, options)) as IClaimsJwtToken;

      const tokenId = payload?.jti.trim() ?? '';
      const sessionId = payload?.sid.trim() ?? '';
      const username = payload?.username.trim() ?? '';
      const role = payload?.role.trim() ?? '';

      (() => {
        if (!tokenId || !sessionId || !username || !role) {
          throw new UnauthorizedException();
        }
      })();

      const session = await this.sessionService.sessionUserPreload({
        uuid: sessionId,
        deleted_at: null,
      });

      const user = session?.user;

      (() => {
        if (!session || user?.username !== username) {
          throw new UnauthorizedException();
        }
      })();

      const sessionTokenId = session.token_id;
      const sessionNewTokenId = session.new_token_id;

      (() => {
        if (sessionTokenId !== tokenId && sessionNewTokenId !== tokenId) {
          throw new UnauthorizedException();
        }
      })();

      await (async (session: Session) => {
        if (sessionNewTokenId !== tokenId) {
          // make it request as RequestAuthGuard interface
          defineProperty(request, 'user', user);
          defineProperty(request, 'session', session);
          defineProperty(request, 'role', role);
          return;
        }

        const updatedAt = new Date();

        // update session
        session = await this.sessionService.updateSession({
          where: {
            uuid: sessionId,
            deleted_at: null,
          },
          data: {
            token_id: tokenId, // replace old token with new token
            new_token_id: null, // replace empty token with null
            updated_at: updatedAt,
          },
        });

        if (!session) {
          throw new InternalServerErrorException();
        }

        // make it request as RequestAuthGuard interface
        defineProperty(request, 'user', user);
        defineProperty(request, 'session', session);
        defineProperty(request, 'role', role);
      })(session);
    } catch (e) {
      this.logger.error(`Error: ${e}`);
      throw new UnauthorizedException();
    }

    return true;
  }
}
