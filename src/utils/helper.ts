import host from './http/host';

const kb = 1024;
const mb = 1024 * kb;
const gb = 1024 * mb;
const tb = 1024 * gb;

export const SIZE_UNIT = { kb, mb, gb, tb };

/**
 * 格式化价格
 */
export const fmtMoney = (money: number) => {
  let r = `${money}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  if (r.indexOf('.') === -1) r += '.00';
  return r;
};

export function getImageURL(fid: string) {
  if (!!fid && (fid.includes('file:') || fid.includes('content:') || fid.includes('http:') || fid.includes('https:'))) {
    return fid;
  }
  return `${host.file}/show?fid=${fid}`;
}

/**获取B端用户头像*/
export function getBAvatar(id: string | number): string {
  return `${host.ehr}/hr/common/staff/avatar?id=${id}`;
}

/**获取c端用户头像*/
export function getCAvatar(id: string | number): string {
  return `${host.member}/member/avatar?memberId=${id}`;
}
