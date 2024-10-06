import { SetMetadata } from '@nestjs/common';

export const IS_TESTING_KEY = 'isTesting';
export const Testing = () => SetMetadata(IS_TESTING_KEY, true);
