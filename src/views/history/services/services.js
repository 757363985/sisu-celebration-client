import Fetch, { buildURL } from '@/apis/fetch';

/**
 * 获取列表
 * @returns {Promise<{code:any; msg:string; data:{id:number; year:string; describe:string;cover:string;type:1|2}[]}>}
 */
export const GetHistory = (parmas) => {
  return Fetch(buildURL('history'), parmas, 'GET');
};
