<template>
  <div :class="$style.bannerWarpper">
    <img v-if="bigImg" :class="$style.headBigImg" :src="headImg" alt="banner" />

    <img v-else :class="$style.headImg" :src="headImg" alt="banner" />
  </div>
</template>

<script>
export default {
  name: 'AppHeaderImg',
  props: {
    /**
     * 顶部图片及文字展示
     * @filed {string} headImg 图片链接
     * */
    headImg: {
      type: String,
      required: true,
      default: '',
    },
    bigImg: {
      type: Boolean,
      default: false,
    },
  },

  methods: {},
};
</script>

<style lang="less" module>
@import '~vant/lib/style/var.less';
@import '~@scf/ding-style-less/var.less';

.bannerWarpper {
  margin: 40px;
  border-radius: @border-radius;
  position: relative;
  letter-spacing: 26px;

  .headBigImg {
    width: 100%;
    height: 320px;
    border-radius: @border-radius;
  }

  .headImg {
    width: 100%;
    height: 280px;
    border-radius: @border-radius;
  }
}
</style>
