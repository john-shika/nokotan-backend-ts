import { OptionalConditionOperator, Optional } from '@/utils/common';
import { TransformText } from '@/utils/transform-text';

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

describe('Transform Text (e2e)', () => {
  it('/snake_case (TRANSFORM TEXT)', async () => {
    const temp: string = TransformText.toSnakeCase('camelCase');
    expect(temp).toBe('camel_case');
  });
  it('/SNAKE_CASE_UPPER (TRANSFORM TEXT)', async () => {
    const temp: string = TransformText.toSnakeCaseUpper('camelCase');
    expect(temp).toBe('CAMEL_CASE');
  });
  it('/kebab-case (TRANSFORM TEXT)', async () => {
    const temp: string = TransformText.toKebabCase('PascalCase');
    expect(temp).toBe('pascal-case');
  });
  it('/KEBAB-CASE-UPPER (TRANSFORM TEXT)', async () => {
    const temp: string = TransformText.toKebabCaseUpper('PascalCase');
    expect(temp).toBe('PASCAL-CASE');
  });
});
