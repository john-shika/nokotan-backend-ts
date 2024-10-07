import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IMessageBody, MessageBodySerialize } from '@/schemas/MessageBody';
import { ValidateNested } from 'class-validator';

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

export interface IUserProfileLookupManyMessageBody extends IMessageBody<IUserProfileLookupDataMany> {
  data: IUserProfileLookupDataMany;
}

export class UserProfileLookupData implements IUserProfileLookupData {
  public readonly uuid: string;
  public readonly used: boolean;
  public readonly online: boolean;
  public readonly ip_addr: string;
  public readonly user_agent: string;
  public readonly created_at: string;
  public readonly updated_at: string;
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

export class UserProfileLookupDataSerialize {
  @ApiProperty()
  @Expose({ name: 'uuid' })
  public readonly uuid: string;

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
  @Expose({ name: 'created_at' })
  public readonly createdAt: string;

  @ApiProperty()
  @Expose({ name: 'updated_at' })
  public readonly updatedAt: string;

  @ApiProperty()
  @Expose({ name: 'deleted_at' })
  public readonly deletedAt?: string;
}

export class UserProfileLookupManyMessageBodySerialize extends MessageBodySerialize<UserProfileLookupDataSerialize[]> {
  @ApiProperty({ type: [UserProfileLookupDataSerialize] })
  @Expose({ name: 'data' })
  @Type(() => UserProfileLookupDataSerialize)
  @ValidateNested({ each: true })
  declare data: UserProfileLookupDataSerialize[];
}

export default UserProfileLookupData;
