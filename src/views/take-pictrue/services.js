import Fetch, { buildURL } from '@/apis/fetch';

/** 获取图片列表数据 */
export const GetPictrueList = () => {
  return Fetch(buildURL('photo-build'), {}, 'GET');
};

/**扫码上传照片 */
export const PostScanUploadImg = (data) => {
  return Fetch(buildURL('common/scan-qr/upload'), data, 'POST');
};

/** 切割人体图片 */
export const PostCutUserImg = (data) => {
  return Fetch(buildURL('common/face/process'), data, 'POST');
};

/** 合成照片 */
export const PostImge = (data) => {
  return Fetch(buildURL('common/compound/download'), data, 'POST');
};
