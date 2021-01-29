import Fetch, { buildURL } from '@/apis/fetch';

/**
 * 个人信息完善
 *
 * */

export const PutUserInfo = (parmas) => {
  console.log(parmas);
  return Fetch(buildURL('user/complete'), parmas, 'POST');
};
