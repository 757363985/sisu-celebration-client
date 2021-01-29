<template>
  <div class="app-root-header">
    <div class="app-root-header_back" @click="onClickBack" />
    <div class="app-root-header_home" @click="onCLickHome">返回首页</div>
    <div class="app-root-header_title">{{ appHeaderTitle }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'AppRootHeader',

  computed: mapState({
    // 箭头函数可使代码更简练
    appHeaderTitle: (state) => state.appHeaderTitle,
  }),

  methods: {
    /**
     * 点击返回
     */
    onClickBack() {
      this.$router.back();
    },

    /**
     * 点击回首页
     */
    onCLickHome() {
      this.$router.push('/');
    },
  },
};
</script>

<style lang="less">
@import '~vant/lib/style/var.less';
@import '~@scf/ding-style-less/var.less';

@header-height: 120px;
@header-padding: 40px;

.app-root-header {
  position: relative;
  height: @header-height;
  background: url('./img/bg.jpg') 0 0 repeat-x;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 10000000;
}

.app-root-header_title {
  height: @header-height;
  line-height: @header-height;
  text-align: center;
  font-size: 42px;
  color: #ffffdc;
}

.app-root-header_back {
  position: absolute;
  left: @header-padding;
  top: 50%;
  margin-top: -30px;
  .bg-img(60px, 60px);
  background-image: url('./img/back.png');
}

.app-root-header_home {
  position: absolute;
  right: @header-padding;
  top: 50%;
  margin-top: -40px;
  width: 160px;
  height: 80px;
  line-height: 80px;
  border-radius: 6px;
  background: #f1e5c5;
  color: #844d2d;
  font-size: 32px;
  font-weight: 600;
  text-align: center;
}
</style>
