import { applyDecorators, SetMetadata } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

export const IS_AUTHORIZE_KEY = 'isAuthorize';
export const Authorize = () => applyDecorators(ApiBearerAuth(), SetMetadata(IS_AUTHORIZE_KEY, true));
