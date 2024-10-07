import { SerializeInterceptor } from '@/interceptors/serialize.interceptor';
import { UseInterceptors } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';

export function Serialize<T extends any>(dto: ClassConstructor<T>) {
  return UseInterceptors(new SerializeInterceptor<T>(dto));
}
