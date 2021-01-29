import Fetch, { buildURL } from '@/apis/fetch';

/**
 * 上传图片
 *
 * */
export const PostUserHeadImg = (parmas) => {
  return Fetch(buildURL('common/scan-qr/upload'), parmas, 'POST');
};

/**
 * 通过code获取用户信息
 * */
export const GetUserINfo = (parmas) => {
  return Fetch(buildURL('wechat/login/info'), parmas, 'POST');
};
