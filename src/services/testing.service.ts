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
import { debugConstants, jwtConstants } from '@/globals/constants';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { IS_AUTHORIZE_KEY } from '@/decorators/authorize.decorator';
import { IClaimsJwtToken } from '@/schemas/JwtToken';
import {
  createLogger,
  provideService as createProviderService,
  defineProperty,
  extractTokenFromHeader,
  getName,
  isActivated,
  Logging,
} from '@/utils/common';
import type { Request } from 'express';
import { SessionsService } from './sessions.service';
import { IS_TESTING_KEY } from '@/decorators/testing.decorator';

@Injectable()
export class TestingService implements CanActivate {
  public readonly logger: Logger = createLogger(this);

  private readonly reflector: Reflector;

  constructor(reflector: Reflector) {
    this.reflector = reflector;
  }

  static provider(): ClassProvider<any> {
    return createProviderService(APP_GUARD, TestingService);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    isActivated(this);

    const isTesting = this.reflector.getAllAndOverride<boolean>(IS_TESTING_KEY, [context.getHandler(), context.getClass()]);

    return !(!debugConstants.testing && isTesting);
  }
}
