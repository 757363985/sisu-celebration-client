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

/**
 * 获取照片列表
 * */
export const GetPhotoes = (parmas) => {
  return Fetch(buildURL(`photo/group/item/${parmas.id}/group/`), parmas, 'GET');
};

/**
 * 获取照片列表
 * */
export const GetPhotoesPc = (parmas) => {
  return Fetch(buildURL(`photo/group/item/${parmas.id}/group/pc`), parmas, 'GET');
};
