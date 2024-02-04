import Taro from '@tarojs/taro';

/**
 * 保留两位小数
 */
export function toDouble(source: any, length: number = 2): number {
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

/**
 * getIdxById
 * @param {Array} arr
 * @param {Int} id
 * @return {Int} index
 */
export const getIndexByValue = (arr: any[], value: number, okey?: string) => {
  if (!arr || !arr.length) {
    return -1;
  }
  if (!value) {
    return -1;
  }
  let key = okey;
  if (!key) {
    key = 'value';
  }
  let isPrimitive = true;
  for (let i = 0, l = arr.length; i < l; i++) {
    const e = arr[i];

    if (e !== null && typeof e === 'object') {
      isPrimitive = false;
      break;
    }
  }
  for (let i = 0, l = arr.length; i < l; i++) {
    const item = arr[i];
    if (isPrimitive ? item === value : item[key] === value) {
      return i;
    }
  }
  return -1;
};
/**
 * 获取当前页面的路径与参数
 */
export function getCurrentPage(): CurrentPage {
  const pages = Taro.getCurrentPages();
  if (pages.length >= 1) {
    const current = pages[pages.length - 1];
    return {
      route: current.route,
      params: current.options,
    };
  } else {
    return {
      route: '',
      params: {},
    };
  }
}

interface CurrentPage {
  route?: string;
  params: Record<string, any>;
}
