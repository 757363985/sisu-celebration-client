import Fetch, { buildURL } from './fetch';
/** 是否是正式打包 */
const isProduction = process.env.NODE_ENV === 'production';

/** 发送短信 */
export const PostSendMessage = (data) => {
  return Fetch(buildURL('user/sms'), data, 'POST');
};

/**
 * 获取ossToken
 */
export const GetOssToken = () => {
  return Fetch(buildURL('oss/bucket/sisu'), {}, 'GET');
};

/**
 * 获取与扫描二维码的key对应的资源
 */
export const GetScanResource = (params) => {
  return Fetch(buildURL('common/scan-qr/'), params, 'GET');
};
/**
 * 获取与扫描二维码key对应的切割人体资源
 */
export const GetScanPictureResource = (params) => {
  return Fetch(buildURL('common/scan-qr/face/process'), params, 'GET');
};
/**
 * 根据token查询用户信息
 */
export const GetUserInfo = (token) => {
  return Fetch(buildURL('wechat/login/by-token'), {}, 'GET', { Authorization: token });
};

/**
 * 上传文件/图片
 */
export const PostUpload = (file) => {
  return Fetch(buildURL('imageinfo/upload'), file, 'FORM_DATA');
};

/**
 * 二维码扫描登录
 */
export const PostScanLogin = (data) => {
  return Fetch(buildURL('wechat/qr/scan/login'), data, 'POST');
};

/**
 *  微信登录
 *  @param code 微信code获取token
 *  */
export const PostWechatLogin = (code) => {
  return Fetch(buildURL('wechat/login'), code, 'POST');
};

/**
 * 获取组织机构
 */
export const GetOrg = (params) => {
  return Fetch(buildURL('org'), params, 'GET');
};

// 生成二维码链接
export const qrCodeLink = buildURL('imageinfo/qrcode');

/**
 * 通过code获取用户信息
 * */
export const GetUserINfo = (parmas) => {
  return Fetch(buildURL('wechat/login/info'), parmas, 'POST');
};

/**
 * 获取光影回忆/毕业留影照片数量
 */
export const GetPhotoNumber = (params) => {
  return Fetch(buildURL('photo/group/number'), params, 'GET');
};

export const GetBanner = async () => {
  if (isProduction) {
    return Fetch('/public/banner.json', {}, 'GET');
  }
  return require(`@/public/banner.json`);
};

/**
 * @method 是否可以查询成绩
 */
export const GetGradeCanCheck = () => {
  if (isProduction) {
    return Fetch('/public/grade.json', {}, 'GET');
  }
  return { grade: true };
};
