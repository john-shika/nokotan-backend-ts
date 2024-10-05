import { HttpMessageBody } from '@/utils/net/http';
import { ApiProperty } from '@nestjs/swagger';

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

export interface IAccessJwtTokenMessageBody extends HttpMessageBody<IAccessJwtTokenData> {
  data: IAccessJwtTokenData;
}

export class AccessJwtTokenData implements IAccessJwtTokenData {
  @ApiProperty()
  public readonly access_token: string;

  constructor(access_token: string) {
    this.access_token = access_token;
  }
}
