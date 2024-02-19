/**
 * 保留两位小数
 */
export function toDouble2(source: any, length: number = 2): number {
  if (!source) return 0;
  let result = source;
  if (typeof source !== 'number') {
    result = Number(source);
  }
  try {
    result = Number(result.toFixed(length));
  } catch (e) {
    result = 0;
  }
  return result;
}
