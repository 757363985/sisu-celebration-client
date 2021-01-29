<template>
  <div :class="$style.bannerWarpper">
    <img :class="$style.headImg" :src="headImg" alt="banner" />
  </div>
</template>

<script>
export default {
  name: 'AppHeaderImg',
  props: {
    /**
     * 顶部图片及文字展示
     * @filed {string} headImg 图片链接
     * @filed {string} headText 顶部文字
     * */
    headImg: {
      type: String,
      required: true,
      default: '',
    },
  },

  methods: {},
};
</script>

<style lang="less" module>
@import '~vant/lib/style/var.less';
@import '~@scf/ding-style-less/var.less';

.bannerWarpper {
  margin: @padding-content;
  height: 110px;
  border-radius: @border-radius;
  position: relative;
  letter-spacing: 6px;

  .headImg {
    width: 100%;
    height: 100%;
    border-radius: @border-radius;
  }
}
</style>
