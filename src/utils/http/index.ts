import Taro from '@tarojs/taro';
import ERROR_MSG from './errorMsg';

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

const defaultOption: FwHttp.FetchConfig = {
  baseUrl: process.env.TARO_APP_API,
  url: '',
  method: 'GET',
  header: {
    'content-type': 'application/json',
  },
  dataType: 'json',
  responseType: 'text',
  timeout: 30 * 1000,
  auth: true,
  params: {},
};

const uploadOption: FwHttp.UploadConfig = {
  baseUrl: process.env.TARO_APP_FILE_API,
  url: '',
  filePath: '',
  name: 'file',
  header: {},
  auth: true,
};

/**
 * 请求
 */
const _fetch = async (options: FwHttp.FetchConfig): Promise<any> => {
  console.info(options);
  if (options.auth) {
    try {
      const token = Taro.getStorageSync('token') || '';
      if (token) {
        options.header.Authorization = token;
      }
    } catch (error) {
      const err = Error('抱歉，您还未登录');
      // @ts-ignore
      err.code = 401;
      return Promise.reject(err);
    }
  }

  return new Promise((resolve, reject) => {
    Taro.request(options)
      .then((response) => {
        const res = parseResponse(response);
        if (!res.success) {
          return reject(createError(res));
        }
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * 上传请求
 */
const _upload = async (options: FwHttp.UploadConfig): Promise<any> => {
  if (options.auth) {
    try {
      if (!options.header) {
        options.header = {};
      }
      const token = Taro.getStorageSync('token') || '';
      if (token) {
        options.header.Authorization = token;
      }
    } catch (error) {
      const err = Error('抱歉，您还未登录');
      // @ts-ignore
      err.code = 401;
      return Promise.reject(err);
    }
  }

  return new Promise((resolve, reject) => {
    Taro.uploadFile(options)
      .then((response) => {
        const res = parseResponse(response);
        if (!res.success) {
          return reject(createError(res));
        }
        resolve(res);
      })
      .catch((error) => {
        // 逻辑待定
        reject(error);
      });
  });
};

/**
 * 为了保持一致的使用习惯，封装成为与axios一致的参数传入
 */
export function get<T>(requestURL: string, options?: FwHttp.ParamsConfig): Promise<FwHttp.ParseResult<T>> {
  const data = (options && options.data) || undefined;
  const dfOptions = JSON.parse(JSON.stringify(defaultOption));
  const _header = options && options.header ? { ...dfOptions.header, ...options.header } : { ...dfOptions.header };
  const _options: FwHttp.FetchConfig = options ? { ...dfOptions, ...options, header: _header } : dfOptions;

  _options.method = 'GET';
  _options.url = _options?.baseUrl + requestURL;
  _options.data = supportParams(data || _options.params);
  return _fetch(_options);
}

/**
 * 为了保持一致的使用习惯，封装成为与axios一致的参数传入
 */
export function post<T>(requestURL: string, params: any, options?: FwHttp.ParamsConfig): Promise<FwHttp.ParseResult<T>> {
  const data = (options && options.data) || undefined;
  const dfOptions = JSON.parse(JSON.stringify(defaultOption));
  const _header = options && options.header ? { ...dfOptions.header, ...options.header } : { ...dfOptions.header };
  const _options: FwHttp.FetchConfig = options ? { ...dfOptions, ...options, header: _header } : dfOptions;

  _options.method = 'POST';
  _options.url = _options?.baseUrl + requestURL;
  _options.data = supportParams(data || params);
  return _fetch(_options);
}
function supportParams(params: any): any {
  if (typeof params == 'object') {
    for (const key of Object.keys(params)) {
      if (params[key] == null || params[key] == 'null' || params[key] == 'undefined') {
        delete params[key];
      }
      if (params[key] instanceof Array) {
        const arr: any[] = [];
        const list: any[] = params[key];
        for (const listElement of list) {
          const abj = supportParams(listElement);
          abj && arr.push(abj);
        }
        params[key] = arr;
      }
    }
  }
  return params;
}

/**
 * 文件上传
 */
export function upload<T>(requestURL: string, filePath: string, options?: FwHttp.UploadConfig): Promise<FwHttp.ParseResult<T>> {
  const dfOptions = JSON.parse(JSON.stringify(uploadOption));
  let _options = { ...dfOptions };
  if (options) {
    _options = { ..._options, ...options };
  }
  _options.url = requestURL;
  _options.filePath = filePath;

  return _upload(_options);
}

/**
 * 返回数据格式封装
 */
function parseResponse<T>(response: FwHttp.Promised): FwHttp.ParseResult<T> {
  const status: number = response.statusCode;
  let success: boolean = false,
    _res: FwHttp.ServerResponse<T> = response.data,
    isOK: boolean = false;

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

  if (response.errMsg) {
    isOK = response.errMsg.indexOf('ok') > -1;
  }

  if (isOK && _res.success && _res.code >= 0) {
    success = true;
  }

  if (status === 401) {
  }

  return { status, code, success, result, data };
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

export default { get, post, upload };
