import { getEnv } from '@/utils/common';

export const jwtConstants = {
  secretKey: getEnv('JWT_SECRET_KEY'),
};
