import Fetch, { buildURL } from '@/apis/fetch';

/**
 * 获取成绩列表
 */
export const PostGradeList = (data) => {
  return Fetch(buildURL('common/score'), data, 'POST');
};

/**
 * 人脸识别
 */
export const PostFaceRecognition = (files) => {
  return Fetch(buildURL('common/scan/face/upload'), files, 'FORM_DATA');
};

/**
 * 根据token查询成绩
 */
export const GetScroe = (token) => {
  return Fetch(buildURL('common/score'), {}, 'GET', { Authorization: token });
};

/**
 * 根据手机号查询成绩
 */
export const GetPhoneScroe = (params) => {
  return Fetch(buildURL('common/score/by-mobile'), params, 'GET');
};

/**
 * 根据名字查询成绩
 */
export const GetSelectScoreByName = (params) => {
  return Fetch(buildURL('common/score/name'), params, 'GET');
};
