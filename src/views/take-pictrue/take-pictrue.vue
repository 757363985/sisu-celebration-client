<template>
  <div :class="$style.pictrueContent">
    <div :class="$style.banner" />

    <div :class="$style.notice">
      <i-notice text="请选择主题照片，并上传本人照片，人工智能合成照片" />
    </div>

    <div :class="$style.imgContent">
      <div v-for="i in imgList" :key="i.id" :class="$style.imgItem" @click="onClickItem(i.id)">
        <div v-lazy:background-image="`${i.cover}?width=485`" :class="$style.img" />
        <div :class="$style.text">{{ i.title }}</div>
        <img :class="$style.radio" :src="i.select ? selectTrue : selectFalse" alt="选中" />
      </div>
    </div>

    <div :class="$style.btn" @click="onClickNextStep">下一步</div>
  </div>
</template>

<script>
import { Toast } from 'vant';

import Notice from '@/components/notice/notice';

import * as APIS from './services';

const selectFalse = require('@/assets/take-photo/select-false.png');
const selectTrue = require('@/assets/take-photo/select-true.png');

export default {
  name: 'TakePictrueNext',
  components: {
    'i-notice': Notice,
  },
  data() {
    return {
      radio: true,
      imgList: [],
      selectFalse,
      selectTrue,
      selectItem: null,
    };
  },
  created() {
    APIS.GetPictrueList().then((res) => {
      this.imgList = res.data;
    });
  },
  methods: {
    onClickItem(key) {
      this.imgList = this.imgList.map((item) => {
        const { id } = item;
        if (key === id) {
          this.selectItem = item;
          return {
            ...item,
            select: true,
          };
        }
        return {
          ...item,
          select: false,
        };
      });
    },
    onClickNextStep() {
      if (!this.selectItem) {
        return Toast('请选择主题照片！');
      }
      this.$store.dispatch('updateDragImg', { bgInfo: this.selectItem });
      this.$router.push({
        path: '/take-pictrue/next',
      });
    },
  },
};
</script>

<style lang="less" module>
@import '~vant/lib/style/var.less';
@import '~@scf/ding-style-less/var.less';

.pictrueContent {
  padding: 0 40px;
  margin-bottom: 180px;
  .banner {
    background-image: url('../../assets/take-photo/banner.png');
    width: 100%;
    height: 320px;
    margin-top: 30px;
    border-radius: 10px;
    overflow: hidden;
    background-size: 100%;
    background-repeat: no-repeat;
  }
  .notice {
    margin-top: 30px;
  }

  .btn {
    width: 90%;
    background-color: #844d2d;
    height: 120px;
    font-size: 42px;
    color: #ffffdc;
    text-align: center;
    line-height: 120px;
    border-radius: 10px;
    position: fixed;
    bottom: 40px;
    left: 0;
    margin-left: 5%;
  }
  .imgContent {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 30px;
    .imgItem {
      position: relative;
      width: 485px;
      border-radius: 10px;
      background-color: #f1e5c5;
      overflow: hidden;
      margin-bottom: 30px;
      .img {
        height: 280px;
        background: burlywood;
        overflow: hidden;
        background-repeat: no-repeat;
        background-size: cover;
      }
      .text {
        height: 120px;
        font-size: 36px;
        text-align: center;
        line-height: 120px;
        color: #844d2d;
        font-weight: bold;
      }
      .radio {
        width: 40px;
        height: 40px;
        position: absolute;
        top: 20px;
        right: 20px;
      }
    }
  }
}
</style>
