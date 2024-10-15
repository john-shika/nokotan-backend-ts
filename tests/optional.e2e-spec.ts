import { OptionalConditionOperator, Optional } from '@/utils/common';

describe('Optional (e2e)', () => {
  it('/number (OPTIONAL)', async () => {
    let temp: Optional<number> = null;

    if (OptionalConditionOperator.None(temp)) {
      expect(temp).toBeNull();
    } else {
      fail();
    }

    temp = 12;

    if (OptionalConditionOperator.Ok(temp)) {
      const num: number = OptionalConditionOperator.Some(temp);
      expect(num).toBeDefined();
    } else {
      fail();
    }
  });
});
