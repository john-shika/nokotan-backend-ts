import { OptCond, Optional } from '@/utils/common';

describe('Optional (e2e)', () => {
  it('/number (OPTIONAL)', async () => {
    let temp: Optional<number> = null;

    if (OptCond.None(temp)) {
      expect(temp).toBeNull();
    } else {
      fail();
    }

    temp = 12;

    if (OptCond.Ok(temp)) {
      const num: number = OptCond.Some(temp);
      expect(num).toBeDefined();
    } else {
      fail();
    }
  });
});
