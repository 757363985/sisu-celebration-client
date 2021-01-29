import Fetch, { buildURL } from '@/apis/fetch';

/**
 * 获取列表
 * @returns {Promise<{code:any; msg:string; data:{id:number; title:string; cover:string;publishTime:string;counter:number;type:1|2|3}[]}>}
 */
export const GetNewsList = (parmas) => {
  return Fetch(buildURL('news'), parmas, 'GET');
};
