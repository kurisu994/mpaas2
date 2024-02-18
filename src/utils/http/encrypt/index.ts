import Taro from '@tarojs/taro';

const md5 = require('./md5');
const Encrypt = require('./jsencrypt.min.js');

const encryptor = new Encrypt.JSEncrypt();

const PUB_PEM = `
`;
// 设置公钥
encryptor.setPublicKey(PUB_PEM);

export async function encrypt(path?: string) {
  const p = md5_16(path || '');
  Taro.getSystemInfoSync().SDKVersion;
  const u = md5_16('');
  const now = get_now_time();
  const e_data = `${p}#${now}#${u}`;

  const cryptStr = encryptor.encrypt(e_data);
  return cryptStr;
}

function md5_16(data: string) {
  return md5(data).substring(8, 24);
}

function get_now_time(): number {
  const serverTime = Taro.getStorageSync('f_server_time') || 0;
  const localTime = Taro.getStorageSync('f_local_time') || 0;
  return serverTime + (Date.now() - localTime);
}
