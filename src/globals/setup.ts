import * as path from 'path';
import * as dotenv from 'dotenv';
import { jwtConstants } from '@/globals/constants';
import { definePropertyReadOnly, getEnv } from '@/utils/common';

export function init() {
  dotenv.config({
    path: path.join(__dirname, '..', '.env'),
  });

  definePropertyReadOnly(jwtConstants, 'secretKey', getEnv('JWT_SECRET_KEY'));
}

export default init;
