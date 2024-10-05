import { IClaimsJwtToken } from '@/schemas/JwtToken';
import { CanActivate, ClassProvider, Logger } from '@nestjs/common';
import type { Request } from 'express';
import { Session } from '@/models/Session';

export type Nullable<T extends any> = T | null;
export type Optional<T extends any> = Nullable<T> | undefined;

export class OptionIsNoneError extends Error {
  constructor(message?: string) {
    super(message ?? 'Option is None');
  }
}

export const None = null;

export class Option {
  static None<T extends any>(opt: Optional<T>): boolean {
    return opt === null || opt === undefined;
  }

  static Ok<T extends any>(opt: Optional<T>): boolean {
    return opt !== null && opt !== undefined;
  }

  static Some<T extends any>(opt: Optional<T>): T {
    if (Option.None(opt)) throw new OptionIsNoneError();
    return opt;
  }
}

export function getName(obj: Optional<any>): string {
  if (obj === undefined || obj === null) return '';
  if (typeof obj?.name === 'string') return obj.name;
  if (typeof obj === 'string') return obj;
  return obj.constructor.name;
}

export function createLogger(obj: Optional<any>): Logger {
  // TODO: create customizable logger instance

  return new Logger(getName(obj) ?? 'MyLogger');
}

export function definePropertyReadOnly(obj: object, name: string, value: any) {
  Object.defineProperty(obj, name, {
    value: value,
    enumerable: true,
    configurable: false,
    writable: false,
  });
}

export function defineProperty(obj: object, name: string, value: any) {
  Object.defineProperty(obj, name, {
    value: value,
    enumerable: true,
    configurable: true,
    writable: true,
  });
}

export function getEnv(name: string): string {
  return process.env?.[name] ?? '';
}

export function getTimeUTCNow(): number {
  return new Date().getTime();
}

export function getDateISOString(): string {
  return new Date().toISOString();
}

export function provideService(providerName: string, service: any): ClassProvider<any> {
  return {
    provide: providerName,
    useClass: service,
  };
}

export function getIPAddress(req: Request): string {
  return req.ip || '127.0.0.1';
}

export function getUserAgent(req: Request): string {
  return req.headers['user-agent'] || 'Agent/1.0';
}

export function extractTokenFromHeader(request: Request): string | undefined {
  const tokens = request.headers.authorization?.split(' ') ?? [];
  if (tokens.length > 1) {
    const [type, token] = tokens.map((e) => e.trim());
    if (type === 'Bearer') return token;
  }
  return undefined;
}

export interface Logging {
  logger: Logger;
}

export function isActivated(obj: Logging & CanActivate): boolean {
  obj.logger.debug(`${getName(obj)} activated`);
  return true;
}

export function getJwtTokenExpiredAt(claimsJwtToken: IClaimsJwtToken): Date {
  return new Date((claimsJwtToken?.exp ?? 0) * 1000);
}

export function getJwtTokenCreatedAt(claimsJwtToken: IClaimsJwtToken): Date {
  return new Date((claimsJwtToken?.iat ?? 0) * 1000);
}

export class DateTime extends Date {
  constructor(val?: DateTime | Date | string | number) {
    super(val ?? DateTime.UTCNow());
  }

  static UTCNow(): DateTime {
    return new Date();
  }

  static addDays(date: DateTime | Date, days: number): DateTime | Date {
    return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
  }

  static addHours(date: DateTime | Date, hours: number): DateTime | Date {
    return new Date(date.getTime() + hours * 60 * 60 * 1000);
  }

  static addMinutes(date: DateTime | Date, minutes: number): DateTime | Date {
    return new Date(date.getTime() + minutes * 60 * 1000);
  }

  static addSeconds(date: DateTime | Date, seconds: number): DateTime | Date {
    return new Date(date.getTime() + seconds * 1000);
  }

  static addMilliseconds(date: DateTime | Date, milliseconds: number): DateTime | Date {
    return new Date(date.getTime() + milliseconds);
  }

  static isAfter(date: DateTime | Date, other: DateTime | Date): boolean {
    return date.getTime() > other.getTime();
  }

  static isBefore(date: DateTime | Date, other: DateTime | Date): boolean {
    return date.getTime() < other.getTime();
  }

  static Equals(date: DateTime | Date, other: DateTime | Date): boolean {
    return date.getTime() === other.getTime();
  }
}

export function sessionIsOnline(session: Session, tolerance?: number): boolean {
  const currentTime = DateTime.UTCNow();
  const expiredAt = DateTime.addSeconds(session.updated_at, tolerance ?? 12);
  return session.deleted_at == null && DateTime.isAfter(expiredAt, currentTime);
}
