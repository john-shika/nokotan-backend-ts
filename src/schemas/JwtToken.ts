import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IMessageBody, MessageBodySerialize } from '@/schemas/MessageBody';
import { ValidateNested } from 'class-validator';

export interface IClaimsJwtToken {
  sub?: string;
  username: string;
  iat?: number;
  exp?: number;
}

export class ClaimsJwtToken implements IClaimsJwtToken {
  public readonly username: string;
  public readonly sub?: string;
  public readonly iat?: number;
  public readonly exp?: number;

  constructor(username: string, sub?: string, iat?: number) {
    this.username = username;
    this.sub = sub;
    this.iat = iat;
  }
}

export interface IAccessJwtTokenData {
  access_token: string;
}

export interface IAccessJwtTokenMessageBody extends IMessageBody<IAccessJwtTokenData> {
  data: IAccessJwtTokenData;
}

export class AccessJwtTokenData implements IAccessJwtTokenData {
  public readonly access_token: string;

  constructor(access_token: string) {
    this.access_token = access_token;
  }
}

export class AccessJwtTokenDataSerialize {

  @ApiProperty()
  @Expose({ name: 'access_token' })
  public readonly accessToken: string;
}

export class AccessJwtTokenMessageBodySerialize extends MessageBodySerialize<AccessJwtTokenDataSerialize> {

  @Expose({ name: 'data' })
  @Type(() => AccessJwtTokenDataSerialize)
  @ValidateNested()
  declare data: AccessJwtTokenDataSerialize;
}

export default AccessJwtTokenData;
