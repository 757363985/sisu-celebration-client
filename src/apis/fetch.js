/* eslint-disable prettier/prettier */
import { Toast } from 'vant';
import stringify from 'qs/lib/stringify';

import * as Storage from '@scf/helpers/es/storage';

import * as Helpers from '@/helpers';

/** 是否是一体机 */
const isPC = process.env.NODE_PLATFOFM === 'PC';

/** 是否是正式打包 */
const isProduction = process.env.NODE_ENV === 'production';

const HOST = isPC && isProduction ? '' : '';

/**
 * 构建接口地址
 * @param {string} p 接口路径
 */
export const buildURL = (p) => {
  return HOST + '/api/v1/' + p;
};

/**
 * 构建 Mock 接口地址
 * @param {string} p 接口路径
 */
export const buildMockURL = (p) => {
  return '/mock/100/api/v1/' + p;
};

/**
 * 构建接口地址-授权认证系统
 * @param {string} p 接口路径
 */
export const buildURLAuth = (p) => {
  return HOST + '/api/v1/common-auth/' + p;
};

/**
 * 通用 fetch 封装函数
 * @param {string} url 请求地址
 * @param {any} data 请求携带的参数
 * @param {'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'PATCH' | 'FORM_DATA'} method
 * @param {object} headers 请求头其他/重置数据
 * @returns {Promise<any>}
 */
const Fetch = (url, _data = {}, method = 'GET', headers = {}) => {
  /** 请求参数 */
  const data = { ..._data };
  /** fetch 配置项 */
  const params = {
    method,
    headers: {
      // 'content-type': method === 'FORM_DATA' ? '' : 'application/json',
      Authorization: Storage.getToken(),
      ...headers,
    },
  };

  // FORM_DATA 上传 FormData 数据时，不需要手动设置 content-type，不然会报错
  // 如果不是 FORM_DATA 方式，并且自定义 headers 里没有 content-type 就默认一个 content-type
  if (method !== 'FORM_DATA' && !headers['content-type']) {
    params.headers['content-type'] = 'application/json';
  }

  if (method === 'GET' || method === 'DELETE' || method === 'HEAD') {
    // 每次请求添加时间戳，避免 GET 请求遭遇 HTTP 缓存
    data._ = new Date().getTime();

    // 请求参数合并到 URL 上
    url += `?${stringify(data)}`;
  } else if (method === 'FORM_DATA') {
    // 表单、上传文件
    params.method = 'POST';
    params.body = _data;
  } else {
    params.body = JSON.stringify(data);
  }

  return new Promise((resolve, reject) => {
    fetch(url, params)
      .then((response) => {
        try {
          return response.json();
        } catch (error) {
          throw new Error(response.status + ',' + response.statusText);
        }
      })
      .then((response) => {
        // 判断是否为接口返回数据, 接口返回结果是否为0，0代表正常
        if (response.code === undefined || response.code === 0) {
          return resolve(response);
        } else if (response.code === 401) {
          Storage.setToken('');
          //  用户登录失效
          if (!Helpers.isDesktopClient) {
            const link = '#/auth-page?key=';
            window.location.href = link;
          }
          throw new Error(response.msg);
        }
        return Promise.reject(response);
      })
      .catch((err) => {
        Toast.fail({
          message: err.message || err.msg,
        });
        reject(err);
      });
  });
};

export default Fetch;
