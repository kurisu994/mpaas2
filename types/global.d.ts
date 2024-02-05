/// <reference types="@tarojs/taro" />

declare module '*.png';
declare module '*.gif';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.styl';

declare namespace NodeJS {
  interface ProcessEnv {
    TARO_ENV: 'weapp' | 'swan' | 'alipay' | 'h5' | 'rn' | 'tt' | 'quickapp' | 'qq' | 'jd';
    /** api接口前缀 */
    TARO_APP_API: string;
    /** 文件上传api */
    TARO_APP_FILE_API: string;
    /** 对应grayTag的配置 */
    TARO_APP_TAG: string;
  }
}

declare const my: any;
type Tuple<L, M, R> = [L, M, R];
type Pair<L, R> = [L, R];
