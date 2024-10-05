import { PrismaService } from '@/services/prisma.service';
import { Prisma, User } from '@prisma/client';
import { createLogger, Nullable, Option, Optional } from '@/utils/common';
import { Logger } from '@nestjs/common';

describe('Optional (e2e)', () => {
  it('/number (OPTIONAL)', async () => {
    let temp: Optional<number> = null;

    if (Option.None(temp)) {
      expect(temp).toBeNull();
    } else {
      fail();
    }

    temp = 12;

    if (Option.Ok(temp)) {
      const num: number = Option.Some(temp);
      expect(num).toBeDefined();
    } else {
      fail();
    }
  });
});
