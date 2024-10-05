import { HttpMessageBody } from '@/utils/net/http';
import { ApiProperty } from '@nestjs/swagger';

export interface IUserProfileLookupData {
  uuid: string;
  used: boolean;
  online: boolean;
  ip_addr: string;
  user_agent: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export type IUserProfileLookupDataMany = IUserProfileLookupData[];

export interface IUserProfileLookupManyMessageBody extends HttpMessageBody<IUserProfileLookupDataMany> {
  data: IUserProfileLookupDataMany;
}

export class UserProfileLookupData implements IUserProfileLookupData {
  @ApiProperty()
  public readonly uuid: string;

  @ApiProperty()
  public readonly used: boolean;

  @ApiProperty()
  public readonly online: boolean;

  @ApiProperty()
  public readonly ip_addr: string;

  @ApiProperty()
  public readonly user_agent: string;

  @ApiProperty()
  public readonly created_at: string;

  @ApiProperty()
  public readonly updated_at: string;

  @ApiProperty()
  public readonly deleted_at?: string;

  constructor(
    uuid: string,
    used: boolean,
    online: boolean,
    ip_addr: string,
    user_agent: string,
    created_at: string,
    updated_at: string,
    deleted_at?: string
  ) {
    this.uuid = uuid;
    this.used = used;
    this.online = online;
    this.ip_addr = ip_addr;
    this.user_agent = user_agent;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
  }
}
