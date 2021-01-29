<template>
  <div id="app">
    <div v-show="showHeader" class="line"></div>
    <div class="scf-app-content-wrapper">
      <i-app-root-header v-show="showHeader" />
      <router-view />
    </div>

    <div class="scf-app-content-bg" />
    <!-- 弹出层 -->
    <i-modal :visible="visible" @cancel="onCanCel">
      <div class="time-content">
        倒计时 <span class="time">{{ toHomeTime }}s</span> 返回首页
      </div>
    </i-modal>
  </div>
</template>

<script>
import Modal from '@/components/modal/modal-pc';

import AppRootHeader from '@/components/app-root-header/app-root-header';

import * as Helpers from '@/helpers';

const TIME = { awaitTimer: null, toHomeTimer: null };

// 用户无操作时间
const AWAIT_TIME = 60;

// 返回首页时间
const TO_HOME_TIME = 10;

export default {
  name: 'AppRoot',

  components: {
    'i-app-root-header': AppRootHeader,
    'i-modal': Modal,
  },

  data() {
    return {
      isDesktopClient: Helpers.isDesktopClient,
      // 弹出层展示
      visible: false,

      //长时间未操作倒计时
      awaitTime: AWAIT_TIME,

      // 回到首页倒计时
      toHomeTime: TO_HOME_TIME,
    };
  },
  computed: {
    showHeader() {
      return this.isDesktopClient && this.$route.path !== '/';
    },
    getStoreItem() {
      return this.$store.state.isPrompt;
    },
  },
  watch: {
    getStoreItem() {
      if (this.getStoreItem) {
        console.log('添加事件');
        this.addEvent();
      } else {
        console.log('移除事件');
        this.removeEvent();
      }
    },
    showHeader() {
      if (!this.showHeader) {
        this.removeEvent();
      } else {
        this.addEvent();
      }
    },
  },
  mounted() {
    this.addEvent();
  },
  beforeDestroy() {
    this.removeEvent();
  },
  methods: {
    /**开始倒计时 */
    startCountdown() {
      // 如果弹出层存在就不用再次倒计时
      if (this.visible) {
        return;
      }
      // 重新触发重置所有时间和事件
      clearInterval(TIME.awaitTimer);
      clearInterval(TIME.toHomeTimer);
      this.awaitTime = AWAIT_TIME;
      this.toHomeTime = TO_HOME_TIME;

      if (!this.isDesktopClient || !this.showHeader) {
        return;
      }

      // 用户无操作判断倒计时开始
      TIME.awaitTimer = setInterval(() => {
        console.log(TIME.awaitTimer, '1');
        if (this.awaitTime > 0) {
          //等待时间大于0
          this.awaitTime = this.awaitTime - 1;
        } else {
          // 倒计时到0
          this.visible = true;
          this.awaitTime = AWAIT_TIME;
          clearInterval(TIME.awaitTimer);

          // 开始回到首页倒计时
          TIME.toHomeTimer = setInterval(() => {
            if (this.toHomeTime > 0) {
              // 倒计时大于0
              this.toHomeTime = this.toHomeTime - 1;
            } else {
              // 倒计时等于0
              this.visible = false;
              this.toHomeTime = TO_HOME_TIME;
              clearInterval(TIME.toHomeTimer);
              this.$router.push('/');
            }
          }, 1000);
        }
      }, 1000);
    },
    /** 关闭弹出层 */
    onCanCel() {
      this.removeEvent();
    },
    //开启倒计时监听
    addEvent() {
      this.toHomeTime = TO_HOME_TIME;
      this.awaitTime = AWAIT_TIME;
      document.removeEventListener('scroll', this.startCountdown);
      document.removeEventListener('click', this.startCountdown);
      document.removeEventListener('touchstart', this.startCountdown);
      clearTimeout(TIME.toHomeTime);
      clearTimeout(TIME.awaitTimer);

      // 添加点击监听事件
      document.addEventListener('click', this.startCountdown);
      // 添加滚动监听事件
      document.addEventListener('scroll', this.startCountdown);
      // 添加触摸开始事件
      document.addEventListener('touchstart', this.startCountdown);
    },
    // 清楚倒计时监听
    removeEvent() {
      this.toHomeTime = TO_HOME_TIME;
      this.awaitTime = AWAIT_TIME;
      this.visible = false;
      document.removeEventListener('scroll', this.startCountdown);
      document.removeEventListener('click', this.startCountdown);
      document.removeEventListener('touchstart', this.startCountdown);

      clearInterval(TIME.toHomeTimer);
      clearTimeout(TIME.awaitTimer);
      // 如果不是首页且主动关闭提示
      if (this.showHeader && this.getStoreItem) {
        this.addEvent();
      }
    },
  },
};
</script>

<style lang="less">
@import '~vant/lib/style/var.less';
@import '~@scf/ding-style-less/var.less';

@header-height: 120px;
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.line {
  height: 120px;
}

html body {
  margin: 0 auto;
  position: relative;
  background-color: @color-bg-page;
}

body.scf-client-mobile {
  max-width: 1080px;

  .fix-max-width();

  .scf-app-content-bg {
    background-image: url('./assets/bg-mobile.jpg');
  }
}

#app {
  font-family: @base-font-family;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: @color-text;
  font-size: 12px;
}

.fixed-wrapper {
  .fix-max-width();
  margin: 0 auto;
}

.page-bg-fff {
  background-color: #fff;
  overflow: hidden;
}

.page-404.scf-empty.full-page {
  background-color: transparent;
}

.scf-app-content-wrapper {
  position: relative;
  z-index: 3;
}

.scf-app-content-bg {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 2;
  background: #fef9e6 url('./assets/bg-pc.jpg') 50% 50% no-repeat;
  background-size: 100% 100%;
}

.time {
  font-size: 80px;
  margin: 0 40px;
  color: #844d2d;
}
.time-content {
  line-height: 500px;
}
</style>
