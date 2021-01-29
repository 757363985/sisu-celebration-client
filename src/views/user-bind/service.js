import Fetch, { buildURL } from '@/apis/fetch';

/**
 * 绑定用户信息
 * @param {avatar:string;graduationYear:string,department:number,major:number,classNum:number,name:string,mobile:string} data
 * */
export const PutBindUserInfo = (data) => {
  return Fetch(buildURL('user/bind'), data, 'PUT');
};

/**
 * 绑定信息，提交信息
 * @param {avatar:string;graduationYear:string,department:number,major:number,classNum:number,name:string,mobile:string} data
 *  */
export const PostUserVerify = (data) => {
  return Fetch(buildURL('subscription/verify'), data, 'POST');
};

/**
 * 提交信息
 * @param data
 */
export const PostReportVerify = (data) => {
  return Fetch(buildURL('wechat/subscription/verify'), data, 'POST');
};
/**
 * 确认绑定
 * @param {userId:number,code:string} data
 */
export const PostConfirmBind = (data) => {
  return Fetch(buildURL('wechat/subscription/binding'), data, 'POST');
};
