import { Nullable } from '@/utils/common';

export interface IRegisterBodyForm {
  fullname: string;
  username: string;
  password: string;
  email: Nullable<string>;
  phone: Nullable<string>;
}
