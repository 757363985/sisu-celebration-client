<template>
  <div :class="$style.gradeRestultContent">
    <i-user-info-card :userInfo="userInfo" :show-icon="false" />
    <div :class="$style.imgContent">
      <div
        v-for="i in userInfo.inchPhoto"
        :key="i"
        :class="$style.img"
        :style="{ backgroundImage: `url(${i})` }"
        @click="onClickCheckImg(i)"
      >
        <!-- <img :src="i" width="100%" alt="寸照" /> -->
      </div>

      <van-popup
        v-model="showModal"
        style="width: 60%; background-color: transparent; height: 100%"
      >
        <img :class="$style.photo" :src="imgUrl" width="100%" alt="寸照" />
        <div :class="$style.qrCode">
          <img :src="url" alt="二维码" width="100%" />
          <span>扫码存至手机</span>
        </div>
      </van-popup>
    </div>
    <div v-if="!userInfo.inchPhoto || (userInfo.inchPhoto && !userInfo.inchPhoto.length)">
      <div :class="$style.empty">
        <ding-empty />
      </div>

      <div :class="$style.emptyText">
        <span :class="$style.title">暂无寸照信息</span>
        <span :class="$style.text">{{ cunzhao }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { ImagePreview, Popup } from 'vant';

import UserInfoCard from '../components/user-info-card';
import Empty from '@/components/ding-empty/ding-empty';
import { generateImgQr } from '@/configs/app';

// 无寸照文字提示
import { cunzhao } from '@/configs/toast-message';

Vue.use(ImagePreview);
export default {
  name: 'Cunzhao',
  components: {
    'i-user-info-card': UserInfoCard,
    [ImagePreview.Component.name]: ImagePreview.Component,
    'ding-empty': Empty,
    'van-popup': Popup,
  },
  data() {
    return {
      cunzhao,
      userInfo: {
        // id: 181509,
        // name: '李清龙',
        // department: '俄语系',
        // grade: '2011级',
        // classNum: '2班',
        // idCard: null,
        // archiveNumber: null,
        // serialNumber: null,
        // major: null,
        // graduationYear: null,
        // mobile: '18581364298',
        // company: null,
        // workLocation: null,
        // profession: null,
        // token:
        //   'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzaXN1IiwiaWF0IjoxNjAwMjQzODk1LCJleHAiOjE2MDA0MTY2OTUsInVzZXJJZCI6MTgxNTA5fQ.9avvryWU2E5YpUrmfL4G9pOnKDOYYxL81lu7bR16eys',
        // inchPhoto: [
        // 'http://dag.sisu.edu.cn/group1/M00/00/04/ysrGTl8r4neAUIy-AAAc4rre7aQ767.jpg',
        // 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600254119448&di=83cfcb487b1a2dddb36a6696ce22d3e6&imgtype=0&src=http%3A%2F%2Fpic2.zhimg.com%2Fv2-facb3e1e13112a6560be180d5ad4e1b1_r.jpg',
        // 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600254119447&di=67ada7e05cd8abeb3d5f6b71205c0f73&imgtype=0&src=http%3A%2F%2Fpic1.58cdn.com.cn%2Fp1%2Fbig%2Fn_v2fe99e8afc568479a902d99320aa5c035.jpg%3Fw%3D425%26h%3D320',
        // ],
      },
      show: false,
      url: '',
      showModal: false,
      imgUrl: '',
    };
  },
  created() {
    this.userInfo = this.$store.state.userInfo;
  },
  methods: {
    onClickCheckImg(i) {
      // 生成二维码
      this.url = generateImgQr(i);
      this.imgUrl = i;
      this.showModal = true;
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
.imgContent {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.img {
  width: 480px;
  height: 560px;
  margin-top: 40px;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: cover;
  .imgText {
    position: absolute;
    width: 100%;
    bottom: 35px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    font-size: 36px;
    color: #fff;
  }
}

.emptyText {
  width: 739px;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  .title {
    font-size: 42px;
    color: #844d2d;
    text-align: center;
    margin-bottom: 40px;
  }
  .text {
    font-size: 32px;
    color: rgba(132, 77, 45, 0.6);
  }
}
.qrCode {
  width: 300px;
  height: 300px;
  background: #000;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  span {
    text-align: center;
    width: 100%;
    color: #844d2d;
    font-size: 36px;
    color: #fff;
    margin-top: 20px;
  }
}
.photo {
  margin-bottom: 60px;
  margin-top: 250px;
}
</style>
