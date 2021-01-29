<template>
  <div>
    <div :class="$style['time-line']">
      <div :class="$style['item']">
        <div :class="$style['line']"></div>
        <span :class="$style['line-time']">{{ time }}</span>
        <span :class="$style['dot']"></span>
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
};
</script>

<style lang="less" module>
@import '~@scf/ding-style-less/var.less';

.time-line {
  position: relative;
  min-height: 200px;
  .line {
    width: 4px;
    background-color: #f1e5c5;
    height: calc(100% + 180px);
    position: absolute;
    left: 134px;
    top: 100px;
  }
  .item {
    padding-left: 428px;
    position: relative;
    margin-bottom: 80px;
    min-height: 200px;
    .line-time {
      position: absolute;
      left: 0;
      top: 86px;
      font-size: 38px;
      line-height: 46px;
      color: #844d2d;
      font-weight: bold;
    }
    .dot {
      border-radius: 50%;
      width: 16px;
      height: 16px;
      background: #844d2d;
      border: 4px solid #844d2d;
      position: absolute;
      top: 100px;
      left: 128px;
      &:after {
        content: '';
        border-radius: 50%;
        width: 20px;
        height: 20px;
        border: 2px solid #844d2d;
        position: absolute;
        left: -8px;
        top: -8px;
      }
    }
    .img {
      position: absolute;
      left: 188px;
      top: 0;
      width: 200px;
      height: 200px;
      border-radius: 6px;
      background-size: cover;
      background-position: center;
    }
    .txt {
      font-size: 32px;
      line-height: 56px;
      color: #844d2d;
    }
  }
}
</style>
