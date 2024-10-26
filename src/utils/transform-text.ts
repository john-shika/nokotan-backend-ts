import { isNoneOrEmptyWhiteSpace } from '@/utils/common';

export class TransformText {
  static toTitleCase(value: string): string {
    if (isNoneOrEmptyWhiteSpace(value)) return '';
    let val = value.trim().replace(/(?<=[a-z])([A-Z])|(?<=[a-zA-Z])([0-9])|(?<=[0-9])([a-zA-Z])/g, ' $1$2$3');
    val = val.replace(/[-_\s]+/g, ' ');
    val = val.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
    return val;
  }

  static toUpperStart(value: string): string {
    if (isNoneOrEmptyWhiteSpace(value)) return '';
    let val = value.trim();
    return val.replace(/\b\w/g, char => char.toUpperCase());
  }

  static toUpperEnd(value: string): string {
    if (isNoneOrEmptyWhiteSpace(value)) return '';
    let val = value.trim();
    return val.replace(/\w\b/g, char => char.toUpperCase());
  }

  static toLowerStart(value: string): string {
    if (isNoneOrEmptyWhiteSpace(value)) return '';
    let val = value.trim();
    return val.replace(/\b\w/g, char => char.toLowerCase());
  }

  static toLowerEnd(value: string): string {
    if (isNoneOrEmptyWhiteSpace(value)) return '';
    let val = value.trim();
    return val.replace(/\w\b/g, char => char.toLowerCase());
  }

  static toPascalCase(value: string): string {
    let val = this.toTitleCase(value).replace(/ /g, '');
    return this.toUpperStart(val);
  }

  static toCamelCase(value: string): string {
    let val = this.toTitleCase(value).replace(/ /g, '');
    return this.toLowerStart(val);
  }

  private static toSnakeCaseRaw(value: string): string {
    if (isNoneOrEmptyWhiteSpace(value)) return '';
    let val = value.trim().replace(/(?<=[a-z])([A-Z])|(?<=[a-zA-Z])([0-9])|(?<=[0-9])([a-zA-Z])/g, '_$1$2$3');
    val = val.replace(/[-_\s]+/g, '_');
    // val = val.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
    return val;
  }

  static toSnakeCase(value: string): string {
    return this.toSnakeCaseRaw(value).toLowerCase();
  }

  static toSnakeCaseUpper(value: string): string {
    return this.toSnakeCaseRaw(value).toUpperCase();
  }

  private static toKebabCaseRaw(value: string): string {
    if (isNoneOrEmptyWhiteSpace(value)) return '';
    let val = value.trim().replace(/(?<=[a-z])([A-Z])|(?<=[a-zA-Z])([0-9])|(?<=[0-9])([a-zA-Z])/g, '-$1$2$3');
    val = val.replace(/[-_\s]+/g, '-');
    // val = val.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
    return val;
  }

  static toKebabCase(value: string): string {
    return this.toKebabCaseRaw(value).toLowerCase();
  }

  static toKebabCaseUpper(value: string): string {
    return this.toKebabCaseRaw(value).toUpperCase();
  }
}
