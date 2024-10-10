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
  createProviderService as createProviderService,
  defineProperty,
  extractTokenFromHeader,
  isActivated,
} from '@/utils/common';
import type { Request } from 'express';
import { SessionService } from './session.service';

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

  static provider(): ClassProvider<any> {
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

      const token_id = payload?.jti.trim() ?? '';
      const sessionId = payload?.sid.trim() ?? '';
      const username = payload?.username.trim() ?? '';
      const role = payload?.role.trim() ?? '';

      (() => {
        if (!token_id || !sessionId || !username || !role) {
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

      let newTokenId = session.new_token_id;

      (() => {
        if (session.token_id !== token_id && newTokenId !== token_id) {
          throw new UnauthorizedException();
        }
      })();

      // remove new token from session
      if (newTokenId === token_id) newTokenId = null;

      await (async () => {
        if (newTokenId !== null) return;

        const updatedAt = new Date();

        // update session
        const session = await this.sessionService.updateSession({
          where: {
            uuid: sessionId,
            deleted_at: null,
          },
          data: {
            token_id: token_id, // replace new token if exists
            new_token_id: newTokenId, // can be replaced by new token with refresh mode
            updated_at: updatedAt, // auto update for check online
          },
        });

        if (!session) {
          throw new InternalServerErrorException();
        }

        // make it request as RequestAuthGuard interface
        defineProperty(request, 'user', user);
        defineProperty(request, 'session', session);
        defineProperty(request, 'role', role);
      })();
    } catch (e) {
      this.logger.error(`Error: ${e}`);
      throw new UnauthorizedException();
    }

    return true;
  }
}
