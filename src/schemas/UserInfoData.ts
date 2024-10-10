import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IMessageBody, MessageBodySerialize } from '@/schemas/MessageBody';
import { ValidateNested } from 'class-validator';
import type { Nullable } from '@/utils/common';

export interface IUserInfoData {
  fullname: Nullable<string>;
  username: string;
  email: Nullable<string>;
  phone: Nullable<string>;
  admin: boolean;
}

export interface IUserInfoMessageBody extends IMessageBody<IUserInfoData> {
  data: IUserInfoData;
}

export class UserInfoData implements IUserInfoData {
  public readonly fullname: Nullable<string>;
  public readonly username: string;
  public readonly email: Nullable<string>;
  public readonly phone: Nullable<string>;
  public readonly admin: boolean;

  constructor(
    fullname: Nullable<string>,
    username: string,
    email: Nullable<string>,
    phone: Nullable<string>,
    admin: boolean
  ) {
    this.fullname = fullname;
    this.username = username;
    this.email = email;
    this.phone = phone;
    this.admin = admin;
  }
}

export class UserInfoDataSerialize {

  @ApiProperty()
  @Expose({ name: "fullname" })
  public readonly fullname: Nullable<string>;

  @ApiProperty()
  @Expose({ name: "username" })
  public readonly username: string;

  @ApiProperty()
  @Expose({ name: "email" })
  public readonly email: Nullable<string>;

  @ApiProperty()
  @Expose({ name: "phone" })
  public readonly phone: Nullable<string>;

  @ApiProperty()
  @Expose({ name: "admin" })
  public readonly admin: boolean;
}

export class UserInfoMessageBodySerialize extends MessageBodySerialize<UserInfoDataSerialize> {

  @ApiProperty({ type: [UserInfoDataSerialize] })
  @Expose({ name: 'data' })
  @Type(() => UserInfoDataSerialize)
  @ValidateNested()
  declare data: UserInfoDataSerialize;
}

export default UserInfoData;
