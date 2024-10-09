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

  constructor(sessionsService: SessionService, jwtService: JwtService, reflector: Reflector) {
    this.sessionService = sessionsService;
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

      const sessionUUID = payload?.sub.trim() ?? '';
      const username = payload?.username.trim() ?? '';

      (() => {
        if (!sessionUUID) {
          throw new UnauthorizedException();
        }
      })();

      const session = await this.sessionService.sessionUserPreload({
        uuid: sessionUUID,
        deleted_at: null,
      });

      const user = session?.user;

      (() => {
        if (!session || user?.username !== username) {
          throw new UnauthorizedException();
        }
      })();

      let newToken = session.new_token;

      (() => {
        if (session.token !== token && newToken !== token) {
          throw new UnauthorizedException();
        }
      })();

      // remove new token from session
      if (newToken === token) newToken = null;

      await (async () => {
        const updatedAt = new Date();

        // update session
        const session = await this.sessionService.updateSession({
          where: {
            uuid: sessionUUID,
            deleted_at: null,
          },
          data: {
            token: token, // replace new token if exists
            new_token: newToken, // can be replaced by new token with refresh mode
            updated_at: updatedAt, // auto update for check online
          },
        });

        if (!session) {
          throw new InternalServerErrorException();
        }

        // make it request as RequestAuthGuard interface
        defineProperty(request, 'user', user);
        defineProperty(request, 'session', session);
      })();
    } catch (e) {
      this.logger.error(`Error: ${e}`);
      throw new UnauthorizedException();
    }

    return true;
  }
}
