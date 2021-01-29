import Fetch, { buildURL } from '@/apis/fetch';

/**
 * 获取列表
 * @returns {Promise<{code:any; msg:string; data:{id:number; title:string; cover:string}[]}>}
 */
export const GetPhotoList = (parmas) => {
  return Fetch(buildURL('photo/group'), parmas, 'GET');
};

/**
 * 获取列表
 * @returns {Promise<{code:any; msg:string; data:{id:number; title:string; cover:string}[]}>}
 */
export const GetPhotoListPc = (parmas) => {
  return Fetch(buildURL('photo/group/pc'), parmas, 'GET');
};
