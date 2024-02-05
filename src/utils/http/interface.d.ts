declare namespace FwHttp {
  type Method = 'GET' | 'POST' | 'OPTIONS' | 'HEAD' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT';

  type Params = string | object | ArrayBuffer | JSON;

  type ResponseType = 'text' | 'arraybuffer';

  type DataType = 'json' | '其他';
  interface Config {
    /**
     * 请求方式
     */
    method?: Method;
    data?: Params;
    baseUrl?: string;
    /**
     * 如果设为json，会尝试对返回的数据做一次 JSON.parse
     * @default json
     */
    readonly dataType?: DataType;
    readonly responseType?: ResponseType;
    readonly timeout?: number;

    token?: string;
    /**
     * post请求专用 [默认json]
     */
    contentType?: 'form-data' | 'json' | 'form-urlencoded';
    /**
     * 完整响应体
     * 完整响应体指的是包含响应头在哪的完整Response对象
     * 默认是返回Response.data
     */
    intactResponse?: boolean;
    /**
     * 忽略鉴权
     * 指定次参数会移除header里的Authorization
     */
    ignoreAuth?: boolean;
    /** 不对接口进行签名 */
    noSign?: boolean;
  }

  interface FetchConfig extends Config {
    /**
     * 接口地址
     */
    url: string;
    /**
     * 设置请求的 header，header 中不能设置 Referer
     */
    header: HeadersInit;
    [key: string]: any;
  }

  interface ParamsConfig extends Config {
    /**
     * 接口地址
     */
    url?: string;
    /**
     * 设置请求的 header，header 中不能设置 Referer
     */
    header?: HeadersInit;
    [key: string]: any;
  }

  interface UploadConfig extends Config {
    /**
     * 接口地址
     */
    url: string;
    /**
     * 设置请求的 header，header 中不能设置 Referer
     */
    header: HeadersInit;
    filePath: string;
    fileType: string;
    name: string;
    formData?: object;
    auth?: boolean;
    /** 监听上传进度变化事件 */
    onProgressUpdate?: (progress: {
      /** 上传进度百分比 */
      progress: number;
      /** 预期需要上传的数据总长度，单位 Bytes */
      totalBytesExpectedToSend: number;
      /** 已经上传的数据长度，单位 Bytes */
      totalBytesSent: number;
    }) => void;
    /** 中断上传api [暂不支持] */
    abort?: () => void;
  }

  type ErrorCode = Record<number, string>;

  interface Promised<T extends any | string | ArrayBuffer = any> {
    /**
     * 开发者服务器返回的数据
     *
     * **data 数据说明：**
     *
     * 最终发送给服务器的数据是 String 类型，如果传入的 data 不是 String 类型，会被转换成 String 。转换规则如下：
     *
     * *   对于 `GET` 方法的数据，会将数据转换成 query string（encodeURIComponent(k)=encodeURIComponent(v)&encodeURIComponent(k)=encodeURIComponent(v)...）
     * *   对于 `POST` 方法且 `header['content-type']` 为 `application/json` 的数据，会对数据进行 JSON 序列化
     * *   对于 `POST` 方法且 `header['content-type']` 为 `application/x-www-form-urlencoded` 的数据，
     * *   会将数据转换成 query string （encodeURIComponent(k)=encodeURIComponent(v)&encodeURIComponent(k)=encodeURIComponent(v)...）
     */
    data: T;
    /**
     * 开发者服务器返回的 HTTP 状态码
     */
    statusCode: number;
    /**
     * 开发者服务器返回的 HTTP Response Header
     *
     * @since 1.2.0
     */
    header?: any;
    errMsg?: string;
  }

  /**
   * server端返回的数据格式
   */
  interface ServerResponse<T> {
    readonly code: number;
    readonly success: boolean;
    readonly result: string;
    readonly data: T;
    readonly traceId: string;
  }

  interface ParseResult<T> extends ServerResponse<T> {
    /**
     * http状态码
     */
    status: number;
  }

  interface PageParam {
    /**
     * 页码
     */
    current?: number;
    /**
     * 每页数据量
     */
    pageSize?: number;
  }

  interface Page<T> {
    /**
     * 数据列表
     */
    data: T[];
    /**
     * 数据总量
     */
    total: number;
    /**
     * 页码
     */
    current?: number;
    /**
     * 每页数据量
     */
    pageSize?: number;
    [key: string]: any;
  }

  interface ErrorMsg extends Error {
    errorCode?: number | string;
    errorMsg?: string;
  }
}
