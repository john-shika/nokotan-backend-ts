import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IMessageBody, MessageBodySerialize } from '@/schemas/MessageBody';
import { ValidateNested } from 'class-validator';

export interface IUserSessionLookupData {
  session_id: string;
  used: boolean;
  online: boolean;
  ip_addr: string;
  user_agent: string;
  expired_at: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export type IUserSessionLookupDataMany = IUserSessionLookupData[];

export interface IUserSessionLookupManyMessageBody extends IMessageBody<IUserSessionLookupDataMany> {
  data: IUserSessionLookupDataMany;
}

export class UserSessionLookupData implements IUserSessionLookupData {
  public readonly session_id: string;
  public readonly used: boolean;
  public readonly online: boolean;
  public readonly ip_addr: string;
  public readonly user_agent: string;
  public readonly expired_at: string;
  public readonly created_at: string;
  public readonly updated_at: string;
  public readonly deleted_at?: string;

  constructor(
    session_id: string,
    used: boolean,
    online: boolean,
    ip_addr: string,
    user_agent: string,
    expired_at: string,
    created_at: string,
    updated_at: string,
    deleted_at?: string
  ) {
    this.session_id = session_id;
    this.used = used;
    this.online = online;
    this.ip_addr = ip_addr;
    this.user_agent = user_agent;
    this.expired_at = expired_at;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
  }
}

export class UserSessionLookupDataSerialize {
  @ApiProperty()
  @Expose({ name: 'session_id' })
  public readonly sessionId: string;

  @ApiProperty()
  @Expose({ name: 'used' })
  public readonly used: boolean;

  @ApiProperty()
  @Expose({ name: 'online' })
  public readonly online: boolean;

  @ApiProperty()
  @Expose({ name: 'ip_addr' })
  public readonly ipAddr: string;

  @ApiProperty()
  @Expose({ name: 'user_agent' })
  public readonly userAgent: string;

  @ApiProperty()
  @Expose({ name: 'expired_at' })
  public readonly expiredAt: string;

  @ApiProperty()
  @Expose({ name: 'created_at' })
  public readonly createdAt: string;

  @ApiProperty()
  @Expose({ name: 'updated_at' })
  public readonly updatedAt: string;

  @ApiProperty()
  @Expose({ name: 'deleted_at' })
  public readonly deletedAt?: string;
}

export class UserSessionLookupManyMessageBodySerialize extends MessageBodySerialize<UserSessionLookupDataSerialize[]> {
  @ApiProperty({ type: [UserSessionLookupDataSerialize] })
  @Expose({ name: 'data' })
  @Type(() => UserSessionLookupDataSerialize)
  @ValidateNested({ each: true })
  declare data: UserSessionLookupDataSerialize[];
}

export default UserSessionLookupData;
