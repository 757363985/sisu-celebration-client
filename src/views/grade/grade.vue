<template>
  <div :class="$style.gradeContent">
    <div :class="$style.card" @click="onClickCheckResults" />
    <div :class="$style.cardTwo" @click="onClickProxyCheckResults" />

    <div :class="$style.scan">
      <div :class="$style.box">
        <img width="100%" :src="qr" alt="公众号二维码" />
      </div>
      <div :class="$style.scanText">请先关注四川外国语大学档案馆微信公众号，并绑定用户</div>
    </div>
  </div>
</template>

<script>
const qr = require('@/assets/gongzhonghao-qr.jpg');

export default {
  name: 'Grade',
  data() {
    return {
      qr,
    };
  },
  methods: {
    onClickCheckResults() {
      this.$router.push('/grade/check-results');
    },
    onClickProxyCheckResults() {
      this.$router.push('/grade/proxy-check-results');
    },
  },
};
</script>

<style lang="less" module>
@import '~vant/lib/style/var.less';
@import '~@scf/ding-style-less/var.less';

.gradeContent {
  padding: 0 40px;
  .card {
    width: 100%;
    height: 250px;
    border-radius: 10px;
    overflow: hidden;
    background-image: url('../../assets/grade/chengjichaxun.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin-top: 30px;
    cursor: pointer;
  }

  .cardTwo {
    width: 100%;
    height: 250px;
    border-radius: 10px;
    overflow: hidden;
    background-image: url('../../assets/grade/daichachengji.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin-top: 30px;
    cursor: pointer;
  }
  .scan {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 663px;
    .box {
      width: 300px;
      height: 300px;
    }
    .scanText {
      color: #844d2d;
      font-size: 36px;
      margin-top: 60px;
    }
  }
}
</style>
