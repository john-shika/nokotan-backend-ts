import { Session } from '@/models/Session';
import { User } from '@/models/User';
import type { Request } from 'express';

export interface RequestAuthGuard extends Request {
  session: Session;
  user: User;
  role: string;
}
