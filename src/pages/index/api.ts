import type { PromiseResp } from '@feewee/groupmini-common';
import { host, http } from '@feewee/groupmini-common';

export interface DisturbSetting {
  id: number;
  /** 是否开启勿扰模式 */
  enabled: boolean;
  /** 勿扰模式开始时间(24小时制) e.g: 09:00 */
  startTime: string;
  /** 勿扰模式结束时间(24小时制) e.g: 23:50 */
  endTime: string;
}
export function fetchUserDisturb(): PromiseResp<DisturbSetting> {
  return http.get(`${host.hermes}/app/account/setting/disturb/detail`);
}

/**
 * 获取最新版本信息
 */
export function apkVersionApi(params?: { appToken?: string; versionCode?: string }): PromiseResp<any> {
  return http.get(`${host.admin}/common/update/check`, { params });
}
