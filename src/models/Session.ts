import BaseModel, { Model } from '@/models/Model';
import { Nullable } from '@/utils/common';
import { User } from '@prisma/client';

export interface Session extends Model {
  user_id: number;
  token_id: Nullable<string>;
  new_token_id: Nullable<string>;
  ip_addr: string;
  user_agent: string;
  expired_at: Nullable<Date>;
  user?: User; // preload using @prisma/client
}

export type Sessions = Session[];

export const $name: string = 'sessions';

export class $model extends BaseModel.$model implements Session {
  public readonly name: string = $name;

  public readonly user_id: number;
  public readonly token_id: string;
  public readonly new_token_id: Nullable<string>;
  public readonly ip_addr: string;
  public readonly user_agent: string;
  public readonly expired_at: Nullable<Date>;

  constructor(
    id: number,
    uuid: string,
    user_id: number,
    token_id: string,
    new_token_id: Nullable<string>,
    ip_addr: string,
    user_agent: string,
    expired_at: Nullable<Date>,
    created_at: Date,
    updated_at: Date,
    deleted_at: Nullable<Date>
  ) {
    super(id, uuid, created_at, updated_at, deleted_at);
    this.user_id = user_id;
    this.token_id = token_id;
    this.new_token_id = new_token_id;
    this.ip_addr = ip_addr;
    this.user_agent = user_agent;
    this.expired_at = expired_at;
  }
}

export function createSession(
  id: number,
  uuid: string,
  user_id: number,
  token_id: string,
  new_token_id: Nullable<string>,
  ip_addr: string,
  user_agent: string,
  expired_at: Nullable<Date>,
  created_at: Date,
  updated_at: Date,
  deleted_at: Nullable<Date>
): Session {
  return new $model(id, uuid, user_id, token_id, new_token_id, ip_addr, user_agent, expired_at, created_at, updated_at, deleted_at);
}

export default {
  $name,
  $model,
};
