<template>
  <div :class="$style.home">
    <div :class="$style.title">
      <img :class="$style.logo" :src="logo" alt="logo" />
      <img :class="$style.titleBg" :src="titleBg" alt="头部图片" />
    </div>
    <div :class="$style.cotnent">
      <van-swipe :class="$style.banner" autoplay="5000" @change="onChangeSwipe">
        <van-swipe-item v-for="i in bannerList" :key="i">
          <div
            v-lazy:background-image="isProduction ? `/${i}` : require(`@/${i}`)"
            :class="$style.image"
          />
        </van-swipe-item>
        <template #indicator>
          <div :class="$style.customIndicator">{{ current + 1 }}/{{ bannerList.length }}</div>
        </template>
      </van-swipe>
      <div :class="$style.box">
        <i-box
          v-for="i in icons"
          :key="i.text"
          :width="i.width"
          :icon="i.icon"
          :route="i.route"
          :can-check-grade="canCheckGrade"
        />
      </div>
      <div :class="$style.imgBox">
        <i-img-box
          v-for="i in imgBoxs"
          :key="i.text"
          :background="i.background"
          :size="i.size"
          :route="i.route"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

import { SwipeItem, Swipe, Lazyload } from 'vant';

import IconBox from './components/icon-box';
import ImgBox from './components/img-box';

import * as APIS from '@/apis/common';

const logo = require('@/assets/home/logo.png');
const titleBg = require('@/assets/home/home-title-bg.png');

/** 是否是正式打包 */
const isProduction = process.env.NODE_ENV === 'production';

Vue.use(Lazyload);
// 四个小的box
const icons = [
  {
    icon: require('@/assets/home/liuying.png'),
    route: '/graduation-photo',
    width: 490,
  },
  {
    icon: require('@/assets/home/chengji.png'),
    route: '/grade',
    width: 490,
  },
  {
    icon: require('@/assets/home/huiyi.png'),
    route: '/shadow-select',
    width: 320,
  },
  {
    icon: require('@/assets/home/my.png'),
    route: '/cunzhao',
    width: 320,
  },
  {
    icon: require('@/assets/home/paizhao.png'),
    route: '/take-pictrue',
    width: 320,
  },
];

// 四个打的box
const imgBoxs = [
  {
    size: 'normal',
    background: require('@/assets/home/xuexiao-jianjie.png'),
    route: '/school-overview',
  },
  {
    size: 'small',
    background: require('@/assets/home/lishi-yange.png'),
    route: '/history',
  },
  {
    size: 'small',
    background: require('@/assets/home/dashiji.png'),
    route: '/chronicle',
  },
  {
    size: 'small',
    background: require('@/assets/home/xinwen.png'),
    route: '/news',
  },
  {
    size: 'small',
    background: require('@/assets/home/ditu.png'),
    route: '/map',
  },
];

export default {
  name: 'Home',
  components: {
    'i-box': IconBox,
    'i-img-box': ImgBox,
    'van-swipe': Swipe,
    'van-swipe-item': SwipeItem,
  },
  data() {
    return {
      logo,
      titleBg,
      icons,
      imgBoxs,
      bannerList: [],
      current: 0,
      isProduction,
      canCheckGrade: true,
    };
  },
  async created() {
    const { baseUrl, listLength } = await APIS.GetBanner();
    // 创建与banner图片数量长度一致的数组
    const listRes = new Array(listLength).fill(0);

    // 处理banner数组，拼接图片路径
    this.bannerList = listRes.map((item, index) => {
      return `${baseUrl}${index + 1}.jpg`;
    });

    // 获取是否能够查询成绩
    const { grade } = await APIS.GetGradeCanCheck();

    this.canCheckGrade = grade;
  },
  methods: {
    onChangeSwipe(index) {
      this.current = index;
    },
  },
};
</script>

<style lang="less" module>
@import '~vant/lib/style/var.less';
@import '~@scf/ding-style-less/var.less';

.customIndicator {
  position: absolute;
  right: 10px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 36px;
  background: rgba(0, 0, 0, 0.1);
  color: #fff;
}

.home {
  margin-bottom: 10px;
  color: #844d2d;

  .title {
    position: relative;
    background-color: #834b27;
    height: 140px;
    box-sizing: border-box;
    padding: 23px 40px;

    .logo {
      width: 466px;
      height: 94px;
    }
    .titleBg {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 472px;
      height: 100%;
    }
  }
  .cotnent {
    padding: 0 40px;
    .banner {
      margin-top: 30px;
      border-radius: 10px;
      overflow: hidden;
      .bannerText {
        width: 658px;
      }
    }
    .box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
    }
    .imgBox {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
  }
}
.image {
  background-repeat: no-repeat;
  background-size: cover;
  height: 400px;
  overflow: hidden;
  width: 100%;
}
</style>
