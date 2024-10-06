import BaseModel, { Model } from '@/models/Model';
import { Nullable } from '@/utils/common';
import { sessions } from '@prisma/client';

export interface User extends Model {
  fullname: Nullable<string>;
  username: string;
  password: string;
  email: Nullable<string>;
  phone: Nullable<string>;
  admin: boolean;
  sessions?: sessions[]; // preload using @prisma/client
}

export type Users = User[];

export const $name: string = 'users';

export class $model extends BaseModel.$model implements User {
  public readonly name: string = $name;

  public readonly fullname: Nullable<string>;
  public readonly username: string;
  public readonly password: string;
  public readonly email: Nullable<string>;
  public readonly phone: Nullable<string>;
  public readonly admin: boolean;

  constructor(
    id: number,
    uuid: string,
    fullname: string | null,
    username: string,
    password: string,
    email: Nullable<string>,
    phone: Nullable<string>,
    admin: boolean,
    created_at: Date,
    updated_at: Date,
    deleted_at: Date | null
  ) {
    super(id, uuid, created_at, updated_at, deleted_at);
    this.fullname = fullname;
    this.username = username;
    this.password = password;
    this.email = email;
    this.phone = phone;
    this.admin = admin;
  }
}

export function createUser(
  id: number,
  uuid: string,
  fullname: Nullable<string>,
  username: string,
  password: string,
  email: Nullable<string>,
  phone: Nullable<string>,
  admin: boolean,
  created_at: Date,
  updated_at: Date,
  deleted_at: Nullable<Date>
): User {
  return new $model(id, uuid, fullname, username, password, email, phone, admin, created_at, updated_at, deleted_at);
}

export default {
  $name,
  $model,
};
