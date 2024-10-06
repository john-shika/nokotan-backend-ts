import * as path from 'path';
import * as dotenv from 'dotenv';
import { debugConstants, jwtConstants } from '@/globals/constants';
import { definePropertyReadOnly, getEnv, getEnvBool } from '@/utils/common';

export function init() {
  dotenv.config({
    path: path.join(__dirname, '..', '.env'),
  });

  definePropertyReadOnly(jwtConstants, 'secretKey', getEnv('JWT_SECRET_KEY'));
  definePropertyReadOnly(debugConstants, 'testing', getEnvBool('IS_TESTING'));
}

export default init;
