<template>
  <div :class="$style.scanContent">
    <div :class="$style.scanImg">
      <!-- <van-button v-show="!isStart" :class="$style.btn" @click="onClickStartCheckFace"
        >点击开始人脸识别</van-button
      > -->
      <video v-show="isStart" id="video" width="100%" />
      <div v-show="isStart" :class="$style.success">
        <img v-show="isSuccess" :src="success" alt="人像识别成功图片" />
        <span>{{ isSuccess ? '识别成功' : '正在识别中...  请抬头直视摄像头' }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { openCamera, stopVideo, exportVideoToImg } from '@/helpers/open-camera';

import * as APIS from '../services';
import * as COMMON_APIS from '@/apis/common';

const success = require('@/assets/grade/success.png');

// 轮询最大次数
const MAX_COUNT = 30;

// 定时器
const TIMER = { current: null };

// 当前路由
const PATH = '/cunzhao';

// 是否停止轮询
let stopTimer = false;

export default {
  name: 'UserInfoCard',
  data() {
    return {
      // 是否开始人脸识别
      isStart: false,
      success,
      isSuccess: false,
      maxCount: MAX_COUNT,
      stop: false,
      mediaStreamTrack: null,
      noScroe: false,
      visible: false,
    };
  },
  // 组件销毁生命周期函数
  beforeDestroy() {
    this.isStartPrompt(true);
    this.mediaStreamTrack && this.mediaStreamTrack.stop();
    stopTimer = true;
  },
  async mounted() {
    const [video, mediaStreamTrack] = await openCamera('video');
    this.mediaStreamTrack = mediaStreamTrack;

    // 关闭位操作检测
    this.isStartPrompt(false);

    // 展示video标签
    this.isStart = true;
    this.video = video;

    // 开始轮询
    stopTimer = false;

    // 开始截图轮询
    setTimeout(() => {
      this.cutImg();
    }, 3000);
  },
  methods: {
    /**
     * 截取照片,发送到后台
     */
    async cutImg() {
      clearTimeout(TIMER.current);
      // 停止轮询
      if (stopTimer || this.$route.path !== PATH) {
        return;
      }

      const { video } = this;
      let tempFile = {};

      const imageFile = await exportVideoToImg(this.video);

      tempFile = imageFile;
      // 开始上传
      const formData = new FormData();
      formData.append('file', tempFile);
      try {
        const {
          data: { token },
        } = await APIS.PostFaceRecognition(formData);

        if (token) {
          // 人脸识别成功

          // 视频停止播放
          stopVideo(video);

          // 成功
          this.isSuccess = true;

          // 在这里获取用户信息
          const { data } = await COMMON_APIS.GetUserInfo(token);

          // 存储到redux中
          this.$store.dispatch('updateUserInfo', data);

          // 在这里开启未操作检测
          this.isStartPrompt(true);
        } else {
          //重置临时file数组
          tempFile = {};
          // 继续查找，小于30秒
          if (this.maxCount > 0) {
            this.maxCount = this.maxCount - 1;

            TIMER.current = setTimeout(() => {
              this.cutImg();
            }, 1500);
            return;
          } else {
            // 超出30秒
            this.maxCount = MAX_COUNT;
            stopVideo(video);
            // 在这里开启未操作检测
            this.isStartPrompt(true);
          }
        }
      } catch (e) {
        // 出错
        // 暂停视频
        stopVideo(video);
        // 重置最大值
        this.maxCount = MAX_COUNT;
        // 在这里开启未操作检测
        this.isStartPrompt(true);
      }
    },
    /**
     * @method 是否开启未操作检测
     */
    isStartPrompt(type) {
      this.$store.dispatch('updatePrompt', type);
    },
  },
};
</script>

<style lang="less" module>
@import '~vant/lib/style/var.less';
@import '~@scf/ding-style-less/var.less';

.scanContent {
  margin-top: 30px;
  .scanImg {
    width: 100%;
    // height: 1000px;
    min-height: 500px;
    background: #f1e5c5;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .btn {
    width: 40%;
    background: #844d2d;
    font-size: 36px;
    padding: 40px;
    height: 120px;
    border-radius: 10px;
    color: #ffffdc;
    outline: none;
    border: none;
  }
  .success {
    position: absolute;
    width: 920px;
    height: 200px;
    z-index: 1;
    color: #ffffff;
    background: rgba(0, 0, 0, 0.4);
    font-size: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 50px;
    img {
      margin-right: 20px;
    }
  }
}
</style>
