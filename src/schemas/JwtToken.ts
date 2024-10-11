import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { MessageBodySerialize } from '@/schemas/MessageBody';
import { ValidateNested } from 'class-validator';
import type { IMessageBody } from '@/schemas/MessageBody';

export interface IClaimsJwtToken {
  username: string;
  role: string;
  jti?: string;
  sub?: string;
  sid?: string;
  iat?: number;
  exp?: number;
}

export class ClaimsJwtToken implements IClaimsJwtToken {
  public readonly username: string;
  public readonly role: string;
  public readonly jti?: string;
  public readonly sub?: string;
  public readonly sid?: string;
  public readonly iat?: number;
  public readonly exp?: number;

  constructor(username: string, role: string, jti?: string, sub?: string, sid?: string, iat?: number, exp?: number) {
    this.username = username;
    this.role = role;
    this.jti = jti;
    this.sub = sub;
    this.sid = sid;
    this.iat = iat;
    this.exp = exp;
  }
}

export interface IAccessJwtTokenData {
  accessToken: string;
}

export interface IAccessJwtTokenMessageBody extends IMessageBody<IAccessJwtTokenData> {
  data: IAccessJwtTokenData;
}

export class AccessJwtTokenData implements IAccessJwtTokenData {
  public readonly accessToken: string;

  constructor(access_token: string) {
    this.accessToken = access_token;
  }
}

export class AccessJwtTokenDataSerialize {
  @ApiProperty()
  @Expose({ name: 'accessToken' })
  public readonly accessToken: string;
}

export class AccessJwtTokenMessageBodySerialize extends MessageBodySerialize<AccessJwtTokenDataSerialize> {
  @ApiProperty({ type: AccessJwtTokenDataSerialize })
  @Expose({ name: 'data' })
  @Type(() => AccessJwtTokenDataSerialize)
  @ValidateNested()
  declare data: AccessJwtTokenDataSerialize;
}

export default AccessJwtTokenData;
