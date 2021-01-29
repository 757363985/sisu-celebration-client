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
import * as APIS from '../../service';

import { generateQr } from '@/configs/app';
// 轮询倒计时时长
const TIME = { getKeyTimer: null };

// 轮询最大时长
const MAX_COUNT = 30;

// 当前路由
const PATH = '/grade/check-results';

//stopTimer
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
        this.maxCount = MAX_COUNT;
        stopTimer = true;
      }
    },
  },
  beforeDestroy() {
    this.isStartPrompt(true);
    stopTimer = true;
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
      clearTimeout(TIME.getKeyTimer);

      if (this.$route.path !== PATH || stopTimer) return;
      try {
        const { data: resData } = await COMMON_APIS.GetScanResource({ key });

        // 如果用户授权了
        if (resData && resData?.key === key && resData && resData?.resources) {
          // 拿到token，在这里获取用户信息
          const { data } = await COMMON_APIS.GetUserInfo(resData.resources);
          // 存储到redux中
          this.$store.dispatch('updateUserInfo', data);

          // 根据token获取成绩数据
          const { data: scoreData } = await APIS.GetScroe(resData.resources);

          // 将成绩数据存在vuex中
          this.$store.dispatch('updateScroeDetail', scoreData);

          // 判定是否有成绩
          this.noScroe = !scoreData.list || !scoreData.list.length;

          // 打开弹窗
          this.visible = this.noScroe;
        } else {
          // 没有结果继续轮询
          TIME.getKeyTimer = setTimeout(() => {
            if (this.maxCount > 0) {
              this.maxCount = this.maxCount - 1;
              this.getReource(key);
            } else {
              Toast.fail({ message: '查询失败！', duration: 2000 });
              this.isStartPrompt(true);
            }
          }, 1000);
        }
      } catch (e) {
        this.isStartPrompt(true);
        clearTimeout(TIME.getKeyTimer);
        this.utl = '';
        console.log(e);
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
