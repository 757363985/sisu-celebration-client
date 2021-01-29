<template>
  <div :class="$style.scanContent">
    <div v-if="url" :class="$style.scanImg">
      <img :src="url" alt="" />
    </div>
    <div :class="$style.text">请使用微信扫码功能</div>
  </div>
</template>

<script>
import { Toast } from 'vant';

import * as COMMON_APIS from '@/apis/common';

import { generateQr } from '@/configs/app';
// 轮询倒计时时长
const TIMER = { current: null };

// 轮询最大时长
const MAX_COUNT = 30;

// 当前路由
const PATH = '/cunzhao';

// 是否停止轮询
let stopTimer = false;

export default {
  name: 'Scan',

  props: {
    startScan: {
      type: Number,
      default: () => 0,
    },
  },
  data() {
    return {
      url: '',
      // 最大次数
      maxCount: MAX_COUNT,
      visible: false,
    };
  },
  watch: {
    startScan(val) {
      if (val === 1) {
        // 开始扫描轮询
        stopTimer = false;
        this.scan();
      } else {
        stopTimer = true;
        this.maxCount = MAX_COUNT;
      }
    },
  },
  beforeDestroy() {
    this.isStartPrompt(true);

    // 停止轮询
    this.getReource('', true);
  },

  methods: {
    scan() {
      // 生成key
      const key = +new Date() + Math.random().toFixed(0);

      // 生成二维码给用户扫描,到微信页面获取用户授权
      this.url = generateQr('auth-page', key);

      // 轮询照片
      this.getReource(key);

      this.isStartPrompt(false);
    },
    /**
     * 轮询获取远程资源
     * @param key 作为获取用户token的唯一key
     * @param cb 成功回调
     *  */
    async getReource(key) {
      clearTimeout(TIMER.current);
      if (this.$route.path !== PATH || stopTimer) return;
      try {
        const { data: resData } = await COMMON_APIS.GetScanResource({ key });
        // 如果用户授权了
        if (resData && resData.key === key && resData.resources) {
          // 拿到token，在这里获取用户信息
          const { data } = await COMMON_APIS.GetUserInfo(resData.resources);

          // 更新用户信息
          this.$store.dispatch('updateUserInfo', data);
        } else {
          TIMER.current = setTimeout(() => {
            if (this.maxCount > 0) {
              this.maxCount = this.maxCount - 1;
              this.getReource(key);
            } else {
              this.isStartPrompt(true);
              Toast.fail('获取授权失败！');
              this.maxCount = MAX_COUNT;
            }
          }, 1000);
        }
      } catch (e) {
        this.isStartPrompt(true);
      }
    },
    /**
     * @method 是否开启未操作检测
     */
    isStartPrompt(type) {
      this.$store.dispatch('updatePrompt', type);
    },
  },
};
</script>

<style lang="less" module>
@import '~vant/lib/style/var.less';
@import '~@scf/ding-style-less/var.less';

.scanContent {
  padding: 0 40px;
  .scanImg {
    width: 500px;
    height: 500px;
    background: #844d2d;
    margin: 0 auto;
    margin-top: 165px;
  }
  .text {
    text-align: center;
    color: #844d2d;
    margin-top: 50px;
    font-size: 36px;
  }
}
</style>
