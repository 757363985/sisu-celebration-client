<template>
  <div :class="size === 'normal' ? $style.box : $style.smallBox" @click="onClickImg">
    <img v-lazy="background" :class="$style.img" alt="图片" />
  </div>
</template>

<script>
export default {
  name: 'box',
  props: {
    text: {
      type: String,
      default: () => '',
    },
    background: {
      type: String,
      default: () => '',
    },
    size: {
      type: String,
      default: () => 'normal',
    },
    route: {
      type: String,
      default: () => '',
    },
  },
  methods: {
    onClickImg() {
      this.$router.push(this.route);
    },
  },
};
</script>

<style lang="less" module>
@import '~vant/lib/style/var.less';
@import '~@scf/ding-style-less/var.less';

.box {
  cursor: pointer;
  font-family: 'PingFang SC';
  color: #ffffdc;
  position: relative;
  width: 100%;
  height: 280px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 58px;
  border-radius: 10px;
  overflow: hidden;
  padding: 47px;
  margin-top: 20px;
}
.smallBox {
  cursor: pointer;
  font-family: 'PingFang SC';
  color: #ffffdc;
  position: relative;
  width: 488px;
  text-align: center;
  height: 280px;
  line-height: 280px;
  font-size: 58px;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 20px;
}
.smallBox:last-child {
  margin-right: 0;
}

.img {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  z-index: -1;
}
</style>
