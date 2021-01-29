import Fetch, { buildURL } from '@/apis/fetch';

/**
 * 获取学校简介
 * @returns {Promise<{code:any; msg:string; data:{id:number; content:string; type:1|2|3|4}[]}>}
 */
export const GetContent = (parmas) => {
  return Fetch(buildURL(`content/config`), parmas, 'GET');
};
