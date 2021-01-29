<template>
  <div :class="$style.proxyContent">
    <div :class="$style.notice"><i-notice text="需微信公众号绑定用户信息方可查询成绩" /></div>
    <div :class="$style.form">
      <div :class="$style.formItem">
        <input v-model="mobileNumber" type="text" placeholder="请输入代查人手机号" />
      </div>
      <div :class="$style.formItem">
        <van-button :disabled="isSendCode" :class="$style.btn" @click="onClickSendCode"
          >发送短信验证码</van-button
        >
        <input v-model="code" type="text" placeholder="请输入验证码" />
      </div>
      <div v-show="isSendCode" :class="$style.codeTime">{{ isSendCodeNum }}秒后可重新发送</div>
      <van-button :loading="serchLoading" :class="$style.formBtn" @click="onClickCheckGrade"
        >查询</van-button
      >
    </div>
  </div>
</template>

<script>
import { Button, Toast } from 'vant';
import Notice from '@/components/notice/notice';

import * as APIS from '../service';
import * as COMMON_APIS from '@/apis/common';

const SEND_NUM = 60;

const TIME = { timer: null };

export default {
  name: 'ProxyCheckResults',
  components: {
    'i-notice': Notice,
    'van-button': Button,
  },
  data() {
    return {
      code: '',
      mobileNumber: '',
      // 是否已发送验证码
      isSendCode: false,
      // 发送验证码的倒计时
      isSendCodeNum: SEND_NUM,
      // 查询按钮loading
      serchLoading: false,
    };
  },
  methods: {
    async onClickCheckGrade() {
      if (!this.code) {
        return Toast.fail('请输入验证码');
      }
      this.serchLoading = true;
      try {
        const {
          data: { token },
        } = await APIS.GetPhoneScroe({ mobile: this.mobileNumber, code: this.code });
        const { data } = await COMMON_APIS.GetUserInfo(token);
        // //将用户信息更新
        this.$store.dispatch('updateUserInfo', data);
        // // 根据token获取成绩数据
        const { data: scoreData } = await APIS.GetScroe(token);
        // 将成绩数据存在vuex中
        this.$store.dispatch('updateScroeDetail', scoreData);
        // 取消按钮loading
        this.serchLoading = true;
        // 跳转到成绩页
        this.$router.push('/grade/grade-results');
      } catch (e) {
        // 取消按钮loading
        this.serchLoading = false;
      }
    },

    onClickSendCode() {
      if (!/^1[3456789]\d{9}$/.test(this.mobileNumber)) {
        // 验证手机号是否正确
        return Toast.fail('请输入正确的手机号');
      }
      this.isSendCode = true;
      // 发送验证码
      COMMON_APIS.PostSendMessage({ mobile: this.mobileNumber });
      TIME.timer = setInterval(() => {
        if (this.isSendCodeNum > 0) {
          this.isSendCodeNum = this.isSendCodeNum - 1;
        } else {
          this.isSendCode = false;
          this.isSendCodeNum = SEND_NUM;
          clearInterval(TIME.timer);
        }
      }, 1000);
    },
  },
};
</script>

<style lang="less" module>
@import '~vant/lib/style/var.less';
@import '~@scf/ding-style-less/var.less';

.proxyContent {
  padding: 0 40px;
  .notice {
    margin-top: 30px;
  }
  .form {
    margin-top: 118px;
    .formItem,
    .formBtn {
      width: 100%;
      height: 120px;
      border-radius: 10px;
      margin-top: 30px;
    }
    .formItem {
      position: relative;
      background-color: #f1e5c5;
      .btn {
        position: absolute;
        width: 300px;
        height: 80px;
        text-align: center;
        line-height: 80px;
        color: #ffffdc;
        right: 30px;
        top: 50%;
        font-size: 30px;
        margin-top: -40px;
        background-color: #844d2d;
        border-radius: 10px;
      }
      input {
        width: 100%;
        height: 100%;
        background: transparent;
        outline: none;
        border: none;
        font-size: 30px;
        padding-left: 30px;
        color: #844d2d;
      }
      input::placeholder {
        font-size: 30px;
      }
    }
    .formBtn {
      background-color: #844d2d;
      font-size: 42px;
      color: #ffffdc;
      text-align: center;
      line-height: 120px;
    }
    .formItem:first-child {
      margin: 0;
    }
  }
  .codeTime {
    text-align: right;
    margin-top: 20px;
    padding-left: 16px;
    color: #844d2d;
    font-size: 32px;
  }
}
</style>
