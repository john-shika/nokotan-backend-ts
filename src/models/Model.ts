import { Nullable } from '@/utils/common';

export interface Model {
  id: number;
  uuid: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Nullable<Date>;
}

export type Models = Model[];

export const $name: string = 'models';

export class $model implements Model {
  public readonly name: string = $name;

  public readonly id: number;
  public readonly uuid: string;
  public readonly created_at: Date;
  public readonly updated_at: Date;
  public readonly deleted_at: Nullable<Date>;

  constructor(id: number, uuid: string, created_at: Date, updated_at: Date, deleted_at: Nullable<Date>) {
    this.id = id;
    this.uuid = uuid;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
  }
}

export function createModel(id: number, uuid: string, created_at: Date, updated_at: Date, deleted_at: Nullable<Date>): Model {
  return new $model(id, uuid, created_at, updated_at, deleted_at);
}

export default {
  $name,
  $model,
};
