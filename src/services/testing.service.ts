import { CanActivate, ClassProvider, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { debugConstants } from '@/globals/constants';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { createLogger, createServiceProvider, isActivated } from '@/utils/common';
import { IS_TESTING_KEY } from '@/decorators/testing.decorator';

@Injectable()
export class TestingService implements CanActivate {
  public readonly logger: Logger = createLogger(this);

  private readonly reflector: Reflector;

  constructor(reflector: Reflector) {
    this.reflector = reflector;
  }

  static provider(): ClassProvider {
    return createServiceProvider(APP_GUARD, TestingService);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    isActivated(this);

    const isTesting = this.reflector.getAllAndOverride<boolean>(IS_TESTING_KEY, [context.getHandler(), context.getClass()]);

    return !(!debugConstants.testing && isTesting);
  }
}
