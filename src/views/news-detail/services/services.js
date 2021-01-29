import Fetch, { buildURL } from '@/apis/fetch';

/**
 * 获取新闻详情
 * @returns {Promise<{code:any; msg:string; data:{id:number; title:string; content:string;publishTime:string;counter:number;type:1|2|3;cover:string}[]}>}
 */
export const GetNewsDetails = (parmas) => {
  return Fetch(buildURL(`news/${parmas.id}`), {}, 'GET');
};
