import { OptionalCondition, Optional } from '@/utils/common';

describe('Optional (e2e)', () => {
  it('/number (OPTIONAL)', async () => {
    let temp: Optional<number> = null;

    if (OptionalCondition.None(temp)) {
      expect(temp).toBeNull();
    } else {
      fail();
    }

    temp = 12;

    if (OptionalCondition.Ok(temp)) {
      const num: number = OptionalCondition.Some(temp);
      expect(num).toBeDefined();
    } else {
      fail();
    }
  });
});
