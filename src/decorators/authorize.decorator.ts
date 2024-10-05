import { SetMetadata } from '@nestjs/common';

export const IS_AUTHORIZE_KEY = 'isAuthorize';
export const Authorize = () => SetMetadata(IS_AUTHORIZE_KEY, true);
