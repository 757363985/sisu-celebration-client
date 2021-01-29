import Vue from 'vue';

import App from '@/app.vue';
// import NotInClient from '@/components/not-in-client/not-in-client.vue';

import { Lazyload } from 'vant';
import router from '@/router';
import store from '@/store';
import * as Helpers from '@/helpers';
// import * as WeixinJSAPIS from '@/helpers/weixin-jsapi';
Vue.use(Lazyload);
Vue.config.productionTip = false;

import './global.less';

// 是否是微信环境
(() => {
  if (Helpers.isWeixinBrowser()) {
    // 微信登录
    return Promise.resolve();
  } else {
    // 默认 PC 浏览器/一体机
    return Promise.resolve();
  }
})().then(() => {
  // PC 浏览器/一体机 不需要 750 的限制
  if (!Helpers.isDesktopClient) {
    const body = document.querySelector('body');
    body.classList.add('scf-client-mobile');
  }

  // 初始化应用
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app');
});
