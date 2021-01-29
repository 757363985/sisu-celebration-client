import Fetch, { buildURL } from '@/apis/fetch';

/**
 * 获取列表
 * @returns {Promise<{code:any; msg:string; data:{id:number; year:string; describe:string;cover:string;type:1|2}[]}>}
 */
export const GetChronicle = (parmas) => {
  return Fetch(buildURL('history/event/options'), parmas, 'GET');
};
/**
 * 获取大事记详情
 * */

export const GetChronicleDetails = (parmas) => {
  return Fetch(buildURL(`history/${parmas.id}`), {}, 'GET');
};
