<template>
  <div :class="$style.gradeRestultContent">
    <div :class="$style.headWarpper">
      <img v-if="userInfo.cover" :class="$style.userHead" :src="userInfo.cover" />
      <div v-else :class="$style.userHeadDefault">
        <span v-if="userInfo.name" :class="$style.userHeadText">{{
          userInfo.name && userInfo.name.substr(-2)
        }}</span>
      </div>
      <div :class="$style.userInfo">
        <span :class="$style.userName">
          {{ userInfo.name || '' }}
        </span>
        <span :class="$style.userPhone">
          {{ userInfo.mobile || '' }}
        </span>

        <div :class="$style.userPosition">
          {{ userInfo.department ? userInfo.department + '/' : ''
          }}{{ userInfo.major ? userInfo.major + '/' : '' }}
          {{ userInfo.classNum ? userInfo.classNum + '/' : '' }}
        </div>
      </div>
    </div>

    <div
      v-if="!userInfo.inchPhoto || (userInfo.inchPhoto && !userInfo.inchPhoto.length)"
      :class="$style.empty"
    >
      <ding-empty />
      <div :class="$style.emptyText">
        <span :class="$style.title">暂无寸照信息</span>
        <span :class="$style.text">{{ cunzhao }}</span>
      </div>
    </div>
    <div v-else :class="$style.imgContent">
      <div
        v-for="(i, index) in userInfo.inchPhoto"
        :key="i"
        :class="$style.img"
        :style="{ backgroundImage: `url(${i})` }"
        @click="onClickCheckImg(index)"
      />
    </div>
  </div>
</template>

<script>
import { ImagePreview } from 'vant';

import Empty from '@/components/ding-empty/ding-empty-mobile';
import { getwxAuthCode } from '@/helpers/weixin-jsapi';
import { GetUserINfo } from '@/apis/common';

// 无寸照文字提示
import { cunzhao } from '@/configs/toast-message';

export default {
  name: 'Cunzhao',
  components: {
    [ImagePreview.Component.name]: ImagePreview.Component,
    'ding-empty': Empty,
  },
  data() {
    return {
      userInfo: {},
      show: false,
      cunzhao,
    };
  },
  async mounted() {
    try {
      // 获取用户code
      const { code } = await getwxAuthCode('cunzhao-content', '');
      const { data } = await GetUserINfo({ code });
      this.userInfo = data;
    } catch (e) {
      console.log(e, '出错了');
    }
  },
  methods: {
    onClickCheckImg(index) {
      ImagePreview({
        images: this.userInfo.inchPhoto,
        startPosition: index,
      });
    },
  },
};
</script>

<style lang="less" module>
@import '~vant/lib/style/var.less';
@import '~@scf/ding-style-less/var.less';

.headWarpper {
  margin-top: 10px;
  padding: 20px @padding-content 20px @padding-content;
  margin-bottom: 10px;
  background: #f1e5c5;
  border-radius: @border-radius;
  display: flex;
  .userHead {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: @padding-content;
  }

  .userHeadDefault {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: @padding-content;
    text-align: center;
    background-color: @color-primary;
    color: #fff;
  }

  .userHeadText {
    line-height: 50px;
  }
}

.userInfo {
  .userName {
    font-size: 16px;
    color: @color-primary;
    margin-right: @padding-content;
  }

  .userPhone {
    font-size: 12px;
    color: rgba(132, 77, 45, 0.8);
    flex: 1;
  }

  .userPosition {
    color: rgba(132, 77, 45, 0.6);
    font-size: 12px;
    margin-top: 10px;
  }
}

.gradeRestultContent {
  padding: 0 15px;
  .imgContent {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .img {
    width: 150px;
    height: 200px;
    margin-top: 20px;
    border-radius: @border-radius;
    overflow: hidden;
    position: relative;
    background-repeat: no-repeat;
    background-size: cover;
    .imgText {
      position: absolute;
      width: 100%;
      bottom: 10px;
      display: flex;
      justify-content: space-around;
      font-size: 10px;
      color: #fff;
    }
  }
}
.qrCode {
  width: 100px;
  height: 100px;
  background: #000;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  span {
    text-align: center;
    width: 100%;
    color: #844d2d;
    font-size: 12px;
    color: #fff;
    margin-top: 20px;
  }
}
.photo {
  margin-bottom: 60px;
  // margin-top: 100px;
}
.emptyText {
  width: 200px;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  .title {
    font-size: 14px;
    color: #844d2d;
    text-align: center;
    margin-bottom: 10px;
  }
  .text {
    font-size: 12px;
    color: rgba(132, 77, 45, 0.6);
  }
}
</style>
