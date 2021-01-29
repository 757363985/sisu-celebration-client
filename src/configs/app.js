import * as COMMON_APIS from '@/apis/common';

/**
 * 应用配置
 * @typedef {Object} AppConfig
 * @property {string} corpId - 企业 id
 * @property {number} realAgentId - 钉钉微应用对应的企业 id
 * @property {number} agentId - 应用在系统内的应用 id
 * @property {string} name - 应用名称
 * @property {string} homepageLink - 应用首页
 */

/**
 * 配置文件
 * @type {AppConfig}
 */
let config = {};

/**
 * 当前应用的标识，用于获取应用配置
 */
export const APP_MARK_CODE = 'mark_code';

/**
 * 设置应用配置
 * @param {AppConfig} val 配置
 */
export const setConfig = (val) => {
  config = val;
};

/**
 * 获取应用配置
 */
export const getConfig = () => config;

// 公众号AppId
const appId = 'wx2153258c058fb3aa';

//回调地址
export const callbackAddress = 'http://dag.sisu.edu.cn/';

// 授权跳转链接
export const authLink = (state, router) =>
  `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${encodeURIComponent(
    `${callbackAddress}#/${router}`,
  )}&response_type=code&scope=snsapi_userinfo&state=${state}#wechat_redirect`;

// 生成二维码
export const generateQr = (route, key) =>
  `${window.location.origin}${COMMON_APIS.qrCodeLink}?content=${encodeURIComponent(
    `${callbackAddress}#/${route}`,
  )}?key=${key}&width=500&height=500`;

export const generateImgQr = (url) =>
  `${window.location.origin}${COMMON_APIS.qrCodeLink}?content=${encodeURIComponent(
    url,
  )}&width=500&height=500`;
