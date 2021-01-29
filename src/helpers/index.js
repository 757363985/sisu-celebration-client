/**
 * 是否是微信浏览器
 */
export const isWeixinBrowser = () => {
  var ua = navigator.userAgent.toLowerCase();
  return ua.match(/MicroMessenger/i) == 'micromessenger';
};

/**
 * 是否是桌面客户端
 */
export const isDesktopClient = process.env.NODE_PLATFOFM === 'PC';
