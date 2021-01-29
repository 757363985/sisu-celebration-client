import Fetch, { buildURL } from '@/apis/fetch';

/**
 * 人脸识别
 */
export const PostFaceRecognition = (files) => {
  return Fetch(buildURL('common/scan/face/upload'), files, 'FORM_DATA');
};

/** 根据名字查询寸照 */
export const GetPhotoByName = (param) => {
  return Fetch(buildURL('common/inch-photo/name'), param, 'GET');
};
