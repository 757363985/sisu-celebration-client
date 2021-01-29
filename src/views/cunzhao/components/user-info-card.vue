<template>
  <div>
    <div :class="$style.card">
      <div :class="$style.userInfo">
        <div :class="$style.img">
          <img v-if="userInfo.avatar" :src="userInfo.avatar" alt="" width="100%" />
          <span v-else>{{ userInfo.name && userInfo.name.substr(-2) }}</span>
        </div>
        <div :class="$style.text">
          <div :class="$style.topText">
            <span>{{ userInfo.name }}</span>
            <!-- <span>CW453455532212</span> -->
          </div>
          <div :class="$style.bottomText">
            <span>{{ userInfo.department }} {{ userInfo.grade }} {{ userInfo.classNum }}</span>
          </div>
        </div>
      </div>
      <div v-if="showIcon" :class="$style.btn" @click="onClickCheck">查询</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GradeResults',
  props: {
    showIcon: {
      type: Boolean,
      default: () => true,
    },
    userInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    onClickCheck() {
      this.$emit('click');
    },
  },
};
</script>

<style lang="less" module>
@import '~vant/lib/style/var.less';
@import '~@scf/ding-style-less/var.less';

.card {
  padding: 45px;
  margin-top: 30px;
  width: 100%;
  height: 240px;
  background-color: #f1e5c5;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .userInfo {
    flex: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .img {
      width: 150px;
      height: 150px;
      background-color: #844d2d;
      border-radius: 100%;
      margin-right: 30px;
      overflow: hidden;
      text-align: center;
      line-height: 150px;
      span {
        color: #ffffdc;
        font-size: 36px;
      }
    }
    .text {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-direction: column;

      .topText {
        margin-bottom: 30px;
        span:first-child {
          font-size: 42px;
          color: #844d2d;
          font-weight: bold;
          margin-right: 30px;
        }
        span:last-child {
          font-size: 36px;
          color: #844d2d;
        }
      }
      .bottomText {
        font-size: 32px;
        color: rgba(132, 77, 45, 0.6);
      }
    }
  }
  .btn {
    width: 160px;
    height: 70px;
    color: #ffffdc;
    background-color: #844d2d;
    text-align: center;
    line-height: 70px;
    font-size: 32px;
    border-radius: 40px;
    transition: background-color 0.5s;
  }
  .btn:hover {
    background-color: #5f3921;
  }
}
</style>
