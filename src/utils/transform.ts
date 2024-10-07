export function snakeToCamel(val: string): string {
  return val.toLowerCase().replace(/(_\w)/g, (match) => match[1].toUpperCase());
}
