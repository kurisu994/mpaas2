import Taro from '@tarojs/taro';
import ERROR_MSG from './errorMsg';
import { encrypt } from './encrypt';

/**
 * response类型简写
 */
export type Resp<T> = FwHttp.ParseResult<T>;
/**
 * page response类型简写
 */
export type PageResp<T> = FwHttp.ParseResult<FwHttp.Page<T>>;
/**
 * promise包装的response类型简写
 */
export type PromiseResp<T> = Promise<Resp<T>>;
/**
 * promise包装的page response类型简写
 */
export type PromisePageResp<T> = Promise<PageResp<T>>;

const C_M = new Map<string, string>([
  ['json', 'application/json'], // json格式提交
  ['form-data', 'multipart/form-data'], // 文件上传
  ['form-urlencoded', 'application/x-www-form-urlencoded'], // 表单提交
]);
const UNKNOWN = 'unknown';
const defaultOption: FwHttp.FetchConfig = {
  baseUrl: process.env.TARO_APP_API,
  url: '',
  method: 'GET',
  header: {},
  dataType: 'json',
  responseType: 'text',
  timeout: 30 * 1000,
  auth: true,
  params: {},
};

const uploadOption: FwHttp.UploadConfig = {
  baseUrl: process.env.TARO_APP_FILE_API,
  url: '',
  fileType: 'image',
  filePath: '',
  name: 'file',
  header: {},
  auth: true,
};

/**
 * 请求
 */
async function _fetch<T>(options: FwHttp.FetchConfig): Promise<FwHttp.ParseResult<T>> {
  const { ignoreAuth, noSign, token = '', ...op } = options;
  await encryptRequest(op, ignoreAuth, noSign, token);
  return new Promise((resolve, reject) => {
    Taro.request(op)
      .then((response) => {
        const res = parseResponse<T>(response);
        if (!res.success) {
          return reject(createError(res));
        }
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * 上传请求
 */
async function _upload<T>(options: FwHttp.UploadConfig): Promise<FwHttp.ParseResult<T>> {
  const { onProgressUpdate, ignoreAuth, noSign, token = '', ...op } = options;
  await encryptRequest(op, ignoreAuth, noSign, token);
  return new Promise((resolve, reject) => {
    const uploadTask = Taro.uploadFile({
      ...op,
      success: (result) => {
        const res = parseResponse<T>(result);
        if (!res.success) {
          return reject(createError(res));
        }
        resolve(res);
      },
      fail: (err) => {
        // 逻辑待定
        reject(err);
      },
    });

    if (onProgressUpdate) {
      uploadTask.onProgressUpdate(onProgressUpdate);
    }
  });
}

/**
 * 为了保持一致的使用习惯，封装成为与axios一致的参数传入
 */
export async function get<T>(requestURL: string, config?: FwHttp.ParamsConfig): Promise<T> {
  const { intactResponse, contentType: _, ...options } = config || {};
  const data = options?.data || undefined;
  const dfOptions = JSON.parse(JSON.stringify(defaultOption));
  const _header = options && options.header ? { ...dfOptions.header, ...options.header } : { ...dfOptions.header };
  const _options: FwHttp.FetchConfig = options ? { ...dfOptions, ...options, header: _header } : dfOptions;

  _options.method = 'GET';
  _options.url = _options?.baseUrl + requestURL;
  _options.data = data || _options.params;
  const res = await _fetch<T>(_options);
  if (intactResponse) {
    return res as T;
  }
  return res?.data;
}

/**
 * 为了保持一致的使用习惯，封装成为与axios一致的参数传入
 */
export async function post<T>(requestURL: string, params?: FwHttp.Params, config?: FwHttp.ParamsConfig): Promise<T> {
  const { intactResponse, contentType = 'json', ...options } = config || {};
  const data = options?.data || params || undefined;
  const dfOptions = JSON.parse(JSON.stringify(defaultOption));
  const _header = options?.header ? { ...dfOptions.header, ...options.header } : { ...dfOptions.header };
  const ct = C_M.get(contentType) || 'application/json';
  _header['content-type'] = ct;
  const _options: FwHttp.FetchConfig = options ? { ...dfOptions, ...options, header: _header } : dfOptions;

  _options.method = 'POST';
  _options.url = _options?.baseUrl + requestURL;
  _options.data = data;

  const res = await _fetch<T>(_options);
  if (intactResponse) {
    return res as T;
  }
  return res?.data;
}

/**
 * 文件上传
 */
export async function upload<T = string>(requestURL: string, filePath: string, config?: FwHttp.UploadConfig): Promise<T> {
  const { intactResponse, contentType: _, ...options } = config || {};
  const dfOptions = JSON.parse(JSON.stringify(uploadOption));
  let _options = { ...dfOptions };
  if (options) {
    _options = { ..._options, ...options };
  }
  _options.url = requestURL;
  _options.filePath = filePath;
  const res = await _upload<T>(_options);
  if (intactResponse) {
    return res as T;
  }
  return res?.data;
}

/**
 * 返回数据格式封装
 */
function parseResponse<T>(response: FwHttp.Promised): FwHttp.ParseResult<T> {
  const status: number = response.statusCode;
  let success: boolean = false;
  let _res: FwHttp.ServerResponse<T> = response.data;

  if (typeof _res === 'string') {
    try {
      _res = JSON.parse(response.data);
    } catch (e) {
      _res = response.data;
    }
  }
  const code = _res.code;
  const result = _res.result;
  const data = _res.data;
  const traceId = _res.traceId;
  if (response.errMsg) {
    success = response.errMsg.indexOf('ok') > -1;
  }
  if (success || (_res.success && _res.code >= 0)) {
    success = true;
  }
  if (status === 401) {
  }
  return { status, code, success, result, data, traceId };
}

/**
 * 抛出一个错误
 */
function createError<T>(responseError: FwHttp.ParseResult<T> | number): FwHttp.ErrorMsg {
  let errorCode: number | string, message: string;

  if (typeof responseError === 'number') {
    errorCode = responseError;
    message = ERROR_MSG[responseError] || '发生了预期之外的错误';
  } else {
    errorCode = responseError.code || responseError.status;
    message = responseError.result || ERROR_MSG[errorCode] || '发生了预期之外的错误';

    if (errorCode == 503) {
      const regex_pattern = /for\s(\w+-\w+)/;
      message = responseError?.result;
      const match = regex_pattern.exec(message);
      if (match) {
        const system_name = match[1];
        message = ' 无法找到服务 ' + system_name;
      }
    }
  }

  const error = new Error(message);
  // @ts-ignore
  error.code = errorCode;
  error.message = message;

  return error;
}

async function encryptRequest(options: FwHttp.FetchConfig | FwHttp.UploadConfig, ignoreAuth?: boolean, noSign?: boolean, token = '') {
  if (!options.header) {
    options.header = {};
  }
  const sysInfo = Taro.getSystemInfoSync() || {};
  options.header['X-Brand'] = sysInfo.brand || UNKNOWN;
  options.header['X-Model'] = sysInfo.model || UNKNOWN;
  options.header['X-Platform'] = sysInfo.platform || UNKNOWN;
  options.header['X-System'] = sysInfo.system || UNKNOWN;
  options.header['X-Width'] = sysInfo.screenWidth || UNKNOWN;
  options.header['X-Height'] = sysInfo.screenHeight || UNKNOWN;
  if (!ignoreAuth) {
    try {
      let tk = token;
      if (!tk) {
        tk = Taro.getStorageSync('token') || '';
      }
      if (tk) {
        options.header.Authorization = tk;
      }
    } catch (error) {
      const err = Error('抱歉，您还未登录');
      // @ts-ignore
      err.code = 401;
      return Promise.reject(err);
    }
  }
  options.header['X-Appid'] = process.env.TARO_APP_PLT_ID;
  if (!noSign) {
    try {
      const path = options.url || '';
      const _p = path
        .replace('http://testgate.feewee.cn', '')
        .replace('https://testgate.feewee.cn', '')
        .replace('http://gate.feewee.cn', '')
        .replace('https://gate.feewee.cn', '')
        .replace('http://gatewx.feewee.cn', '')
        .replace('https://gatewx.feewee.cn', '')
        .split('?')[0];
      const sign: string = await encrypt(_p);
      if (sign) {
        options.header['X-Sign'] = sign;
      }
    } catch (e) {
      console.error(e);
    }
  }
}

export default { get, post, upload };
