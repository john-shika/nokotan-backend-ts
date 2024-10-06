import { getEnv, getEnvBool } from '@/utils/common';

export const jwtConstants = {
  secretKey: getEnv('JWT_SECRET_KEY'),
};

export const debugConstants = {
  testing: getEnvBool('IS_TESTING'),
};
