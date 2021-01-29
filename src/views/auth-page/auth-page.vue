<template>
  <div>
    <div :class="$style.authContent">
      <div :class="$style.authText">
        <div :class="$style.img">
          <van-icon v-show="showImg" color="#844d2d" size="80" name="checked" />
        </div>
        <h1>{{ text }}</h1>
      </div>
      <van-button v-show="showImg" :class="$style.btn" @click="onClickCloseWindow"
        >完成授权</van-button
      >
      <van-button v-show="btnText" :class="$style.btn" @click="onClickBind">{{
        btnText
      }}</van-button>
    </div>
  </div>
</template>

<script>
import { Button, Icon } from 'vant';

import * as COMMON_APIS from '@/apis/common';
import { getwxAuthToken } from '@/helpers/weixin-jsapi';

const success = require('@/assets/take-photo/img-success.png');

export default {
  name: 'AuthPage',
  components: {
    'van-button': Button,
    'van-icon': Icon,
  },
  data() {
    return {
      text: '正在登录，请稍候...',
      key: '',
      success,
      showImg: false,
      btnText: '',
    };
  },
  mounted() {
    const { key } = this.$route.query;
    // 获取微信回调参数
    getwxAuthToken('auth-page', key)
      .then(({ code, state }) => {
        // 如果拿到code，且code没使用过
        if (state && code !== 'success') {
          // 登录获取token
          return COMMON_APIS.PostScanLogin({ code, key: state });
        }
      })
      .then(() => {
        this.text = '授权成功!';
        this.showImg = true;
      })
      .catch((e) => {
        if (e.code && e.code === 200002) {
          this.text = '授权失败，请确认是否绑定用户信息！';
          this.btnText = '去绑定';
        }
      });
  },
  methods: {
    onClickCloseWindow() {
      wx.closeWindow();
    },
    onClickBind() {
      const a = document.createElement('a');
      a.href = `${location.origin}/#/user-bind`;
      a.click();
    },
  },
};
</script>

<style lang="less" module>
@import '~vant/lib/style/var.less';
@import '~@scf/ding-style-less/var.less';
.authContent {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .authText {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    h1 {
      margin-top: 20px;
      color: #844d2d;
    }
  }
  .btn {
    width: 60%;
    background-color: #844d2d;
    border-radius: 4px;
    margin-top: 40px;
    color: #fff;
  }
}
</style>
