/**
 * 身份证
 */
export const RegIdCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
/**
 * 手机号码
 */
export const RegMobie = /^1[3456789]\d{9}$/;
/**
 * 固定电话
 */
export const RegPhone = /^(\+\d+)?(\d{3,4}-?)?\d{7,8}$/;
/**
 * 银行账户
 */
export const RegAccount = /^\d{15}|\d{19}$/;
/**
 * 车牌
 */
// eslint-disable-next-line max-len
export const RegPlate =
  /^([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[a-zA-Z](([DF]((?![IO])[a-zA-Z0-9](?![IO]))[0-9]{4})|([0-9]{5}[DF]))|[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1})$/;
/**
 * 车架号
 */
export const RegVIN = /^([A-Z0-9]{17})$/;
/**
 * 引擎号
 */
export const RegEngine = /^([A-Z0-9]{7,10})$/;
/**
 * 数字
 */
export const RegNumber = /^([0-9]+)$/;
/**
 * 两位小数
 */
export const RegDouble = /^(0|[1-9]\d{0,4})(\.\d{0,2})?$/;
/**
 * 电子邮箱
 */
export const RegEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
