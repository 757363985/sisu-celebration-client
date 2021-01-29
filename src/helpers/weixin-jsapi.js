// import { Toast } from 'vant';
import parse from 'qs/lib/parse';

import { authLink } from '@/configs/app';

import * as Storage from '@scf/helpers/es/storage';

import * as COMMON_APIS from '@/apis/common';

/**
 * JSAPI 准备好了
 * @param {() => void} cb 回调事件
 */
export const ready = (cb) => {
  wx.ready(cb);
};

/**
 * @method 微信授权统一方法获取微信code
 * @param {string} routeName 回调路由
 * @param {string} key 如果需要传递key值，就传key值，可忽略
 */
export const getwxAuthCode = async (routeName, key = '') => {
  const querys = parse(location.search.slice(1));
  const { code } = querys;
  if (!code) {
    window.location.href = authLink(key || '', routeName);
  } else {
    // 返回数据 code state token
    return querys;
  }
};

/**
 * @method 获取微信code换取用户token
 * @param {string} routeName 回调路由
 * @param {string} key 如果需要传递key值，就传key值，可忽略
 */
export const getwxAuthToken = async (routeName, key = '') => {
  const querys = parse(location.search.slice(1));

  const { code, state } = querys;

  if (!code) {
    window.location.href = authLink(key || '', routeName);
  }

  if (code && state) {
    return querys;
  }

  if (code && !state) {
    return new Promise((resolve, reject) => {
      COMMON_APIS.PostWechatLogin({ code })
        .then((res) => {
          const {
            data: { token },
          } = res;
          Storage.setToken(token);
          resolve(res.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
};
