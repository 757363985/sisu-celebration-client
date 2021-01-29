<template>
  <div :class="$style.gradeRestultContent">
    <i-user-info-card :userInfo="$store.state.userInfo" :show-icon="false" />
    <div v-if="scroeValue && scroeValue.list.length">
      <div v-for="(i, index) in scroeValue.list" :key="index" :class="$style.listItem">
        <div :class="$style.itemText">
          {{ i.name }} {{ i.department }} {{ i.grade }} {{ i.studentNumber }}
        </div>
        <div :class="$style.btnGroup">
          <div :class="$style.btn" @click="onClickPreviewScroe(i)">预览</div>
        </div>
      </div>
    </div>

    <div v-else :class="$style.empty">
      <ding-empty />
    </div>
    <van-image-preview v-model="show" get-container="body" :images="images" @change="imgChange">
      <template v-slot:cover>
        <div>
          <van-button class="positionbtn" @click="onClickPrint">打印</van-button>
        </div>
      </template>
    </van-image-preview>
  </div>
</template>

<script>
import Vue from 'vue';
import { ImagePreview, Button } from 'vant';
import print from 'print-js';

import UserInfoCard from '../check-results/components/user-info-card';
import Empty from '@/components/ding-empty/ding-empty';

Vue.use(ImagePreview);
export default {
  name: 'GradeResults',
  components: {
    'i-user-info-card': UserInfoCard,
    [ImagePreview.Component.name]: ImagePreview.Component,
    'van-button': Button,
    'ding-empty': Empty,
  },
  data() {
    return {
      scroeValue: {},
      show: false,
      imgIndex: 0,
      images: [],
    };
  },
  created() {
    this.scroeValue = this.$store.state.scroeDetail;
  },
  methods: {
    onClickPreviewScroe(i) {
      this.images = i.infoPictures;
      this.show = true;
    },
    imgChange(index) {
      this.imgIndex = index;
    },
    onClickPrint() {
      const { imgIndex, images } = this;
      print(images[imgIndex], 'image');
    },
  },
};
</script>

<style lang="less" module>
@import '~vant/lib/style/var.less';
@import '~@scf/ding-style-less/var.less';

.gradeRestultContent {
  padding: 0 40px;
  .listItem {
    margin-top: 30px;
    width: 100%;
    padding: 20px;
    background-color: #f1e5c5;
    border-radius: 10px;
    font-size: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .itemText {
      color: #844d2d;
    }
    .btnGroup {
      display: flex;
      justify-content: space-between;
    }
  }
  .btn {
    font-size: 32px;
    margin-right: 30px;
    background-color: #844d2d;
    border-radius: 10px;
    color: #ffffdc;
    width: 130px;
    height: 80px;
    text-align: center;
    line-height: 80px;
    transition: background-color 0.5s;
    z-index: 9999;
  }
  .btn:last-child {
    margin: 0;
  }
  .btn:hover {
    background-color: #5f3921;
  }
  .empty {
    margin-top: 20px;
  }
}
</style>
