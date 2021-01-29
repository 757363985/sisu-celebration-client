<template>
  <div>
    <div :class="$style['time-line']">
      <div :class="$style['item']">
        <div :class="$style['line']"></div>
        <span :class="$style['line-time']">{{ time }}</span>
        <img :class="$style['dot']" :src="dot" alt="" />
        <div
          :class="$style['img']"
          :style="{
            backgroundImage: `url(${coverImg})`,
          }"
        ></div>
        <p :class="$style['txt']">
          {{ historyText }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Dot from './assets/dot.png';
export default {
  name: 'SCFDingTimeLine',
  props: {
    coverImg: {
      type: String,
      required: true,
      default: '',
    },
    time: {
      type: Number,
      required: true,
      default: 0,
    },
    historyText: {
      type: String,
      required: true,
      default: '',
    },
  },
  data: () => {
    return {
      dot: Dot,
    };
  },
};
</script>

<style lang="less" module>
@import '~@scf/ding-style-less/var.less';

.time-line {
  position: relative;
  // padding-bottom: 26px;
  min-height: 70px;
  .line {
    width: 1px;
    background-color: #f1e5c5;
    height: calc(100% + 36px);
    position: absolute;
    left: 50px;
    top: 36px;
  }
  .item {
    padding-left: 150px;
    position: relative;
    margin-bottom: 26px;
    min-height: 70px;
    // padding-bottom: 25px;
    .line-time {
      position: absolute;
      left: 0;
      top: 26px;
      font-size: 14px;
      line-height: 14px;
      color: #844d2d;
      font-weight: bold;
    }
    .dot {
      width: 12px;
      height: 12px;
      position: absolute;
      top: 26px;
      left: 44px;
    }
    .img {
      position: absolute;
      left: 70px;
      top: 0;
      width: 70px;
      height: 70px;
      border-radius: 3px;
      background-size: cover;
      background-position: center;
    }
    .txt {
      font-size: 12px;
      line-height: 18px;
      color: #844d2d;
    }
  }
}
</style>
