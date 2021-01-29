import Fetch, { buildURL } from '@/apis/fetch';

/**
 * 上传图片
 *
 * */

export const PostFile = (parmas) => {
  return Fetch(buildURL('fileinfo/upload'), parmas, 'FORM_DATA');
};

/**
 * 新增媒体资源
 *
 * */

export const PostMdeiaResource = (parmas) => {
  return Fetch(buildURL('media-resource'), parmas, 'POST');
};
