import { CallHandler, ClassProvider, ExecutionContext, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { createLogger, createServiceProvider } from '@/utils/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

// import { classToPlain } from 'class-transformer';

export class SerializeInterceptor<T extends any> implements NestInterceptor<T, any> {
  public readonly logger: Logger = createLogger(this);

  constructor(private dto: ClassConstructor<T>) {}
  // constructor(private dto: T) {}

  static provider(): ClassProvider {
    return createServiceProvider(APP_INTERCEPTOR, SerializeInterceptor);
  }

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    return handler.handle().pipe(
      map((data: ClassConstructor<T>) => {
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
          exposeUnsetFields: false,
        });
      })
    );
    // return handler.handle().pipe(
    //   map((data: T) => {
    //     return classToPlain(data, {
    //       excludeExtraneousValues: true,
    //     });
    //   })
    // );
  }
}
