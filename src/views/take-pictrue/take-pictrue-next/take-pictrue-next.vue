<template>
  <div :class="$style.pictrueContent">
    <div v-show="!isStart" :class="$style.banner">
      <div :class="$style.img">
        <img :src="$store.state.dragImg.bgInfo.cover" width="100%" alt="背景图片" />
      </div>
      <div :class="$style.text">{{ $store.state.dragImg.bgInfo.title }}</div>
    </div>
    <div :class="$style.notice">
      <i-notice text="为提高照片合成成功率，请上传清晰的单人人物照片" />
    </div>
    <div v-if="!isStart" :class="$style.scanContent">
      <div :class="$style.scanTtem" @click="onClickTakePictrue">
        <div :class="$style.icon">
          <img :src="pictrueIcon" alt="拍照" />
        </div>
        <div :class="$style.text">拍照</div>
      </div>
      <div v-show="!qrCode" :class="$style.scanTtem" @click="onClickScanUpload">
        <div :class="$style.icon">
          <img :src="scanIcon" alt="扫描" />
        </div>
        <div :class="$style.text">扫码上传</div>
      </div>
      <div v-show="qrCode" :class="$style.scanTtem">
        <img width="100%" :src="qrCode" alt="二维码图片" />
      </div>
    </div>
    <div v-show="isStart" :class="$style.videoContent">
      <div v-show="mask" :class="$style.timer">
        <span>{{ timer }}</span>
      </div>
      <video id="video" width="100%" />
    </div>

    <div v-show="isStart && timer" :class="$style.bttomBtn">
      <van-button :id="$style.btn" @click="onClickStartTake">开始拍照</van-button>
    </div>

    <div v-show="!timer && isStart" :class="$style.bttomBtn">
      <van-button :loading="iscompound" :disabled="iscompound" @click="onClickRestart"
        >重新上传</van-button
      ><van-button :loading="iscompound" :disabled="iscompound" @click="onClickCompound"
        >合成照片</van-button
      >
    </div>
  </div>
</template>

<script>
import { Toast, Button } from 'vant';
import Notice from '@/components/notice/notice';

import ossUplaod from '@/helpers/oss-upload';
import { openCamera, stopVideo, exportVideoToImg } from '@/helpers/open-camera';

import * as APIS from '../services';
import * as COMMON_APIS from '@/apis/common';

import { generateQr } from '@/configs/app';

const scanIcon = require('@/assets/take-photo/take-scan.svg');

const pictrueIcon = require('@/assets/take-photo/take-pictrue.svg');

let TIME = { timer: null, getKeyTimer: null };

// 倒计时最大值
const MAX_COUNT = 30;

export default {
  name: 'TakePictrue',
  components: {
    'i-notice': Notice,
    'van-button': Button,
  },
  data() {
    return {
      radio: true,
      scanIcon,
      pictrueIcon,
      // 是否已开始拍照
      isStart: false,
      //倒计时
      timer: 5,
      //是否展示倒计时蒙层
      mask: false,
      //video对象
      video: null,
      //isClickScan
      isClickScan: false,
      // 扫码上传二维码
      qrCode: '',
      // 倒计时最大值
      maxCount: MAX_COUNT,
      // 是否合成成功
      iscompound: false,
      mediaStreamTrack: null,
    };
  },
  beforeDestroy() {
    clearTimeout(TIME.timer);
    clearTimeout(TIME.getKeyTimer);
    // 开启未操作检测
    this.isStartPrompt(true);
    this.mediaStreamTrack && this.mediaStreamTrack.stop();
  },
  methods: {
    /**点击拍照 */
    async onClickTakePictrue() {
      clearTimeout(TIME.getKeyTimer);
      clearTimeout(TIME.timer);
      this.qrCode = '';
      [this.video, this.mediaStreamTrack] = await openCamera('video');
      this.isStart = true;
    },
    /**点击开始拍照按钮 */
    onClickStartTake() {
      this.isStartPrompt(false);
      TIME.timer = setInterval(() => {
        if (this.timer > 0) {
          this.mask = true;
          this.timer = this.timer - 1;
        } else {
          clearInterval(TIME.timer);
          this.mask = false;
          stopVideo(this.video);
          this.isStartPrompt(true);
        }
      }, 1000);
    },
    /** 重新上传 */
    onClickRestart() {
      this.timer = 5;
      this.isStart = false;
      navigator.mediaDevices.localMediaStream.stop();
    },
    /**
     * 点击合成照片
     */
    onClickCompound() {
      this.uploadUserHeader();
    },
    /**
     * 上传人像到后台
     */
    async uploadUserHeader() {
      // 停止未操作检测
      this.isStartPrompt(false);
      // 导出video为图片
      const imageFile = await exportVideoToImg(this.video);
      this.iscompound = true;
      try {
        // 上传图片到oss获取到图片的key
        const key = await ossUplaod({ file: imageFile });
        // 获取切割好的人像图片
        const {
          data: { url },
        } = await APIS.PostCutUserImg({ url: key });
        // 更新人物图片数据
        this.$store.dispatch('updateDragImg', { userUrl: url });
        // 开启未操作提示
        this.isStartPrompt(true);
        // 开启未操作提示
        this.$router.push('/take-pictrue/compound-img');
      } catch (e) {
        console.log('出错了', e);
        this.iscompound = false;
        // 开启未操作提示
        this.isStartPrompt(true);
      }
    },
    /**
     * 扫码上传
     */
    onClickScanUpload() {
      if (!this.isClickScan) {
        // 生成唯一key
        const key = +new Date() + Math.random().toFixed(0);

        this.isClickScan = true;
        // 生成二维码
        this.qrCode = generateQr('upload-picture', key);
        // 延迟2秒开始轮询
        setTimeout(() => {
          this.getReource(key);
        }, 2000);
        // 关闭未操作检测
        this.isStartPrompt(false);
      }
    },
    /** 轮询获取远程资源 */
    getReource(key) {
      // 根据移动端定义的key确认是否有数据
      COMMON_APIS.GetScanPictureResource({ key })
        .then(({ data }) => {
          // 如果有图片资源
          if (data && data.url) {
            // 更新vuex中的人体图片数据
            this.$store.dispatch('updateDragImg', { userUrl: data.url });
            //清除定时器
            clearTimeout(TIME.getKeyTimer);
            // 开启未操作提示
            this.isStartPrompt(true);
            // 跳转到拖动图片的页面
            this.$router.push('/take-pictrue/compound-img');
          } else {
            TIME.getKeyTimer = setTimeout(() => {
              if (this.maxCount > 0) {
                this.maxCount = this.maxCount - 1;
                this.getReource(key);
              } else {
                // 开启未操作提示
                this.$store.dispatch('updatePrompt', true);
                Toast.fail('没获取到图片！');
                this.qrCode = '';
                this.maxCount = MAX_COUNT;
                this.isClickScan = false;
                clearTimeout(TIME.getKeyTimer);
              }
            }, 1000);
          }
        })
        .catch(() => {
          this.$store.dispatch('updatePrompt', true);
          this.qrCode = '';
          this.maxCount = MAX_COUNT;
          this.isClickScan = false;
          clearTimeout(TIME.getKeyTimer);
        });
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

.pictrueContent {
  padding: 0 40px;
  .banner {
    width: 100%;
    background: #f1e5c5;
    border-radius: 10px;
    margin: 30px 0 0 0;
    overflow: hidden;
    .img {
      height: 320px;
      overflow: hidden;
    }
    .text {
      height: 100px;
      text-align: center;
      font-size: 32px;
      line-height: 100px;
      font-weight: bold;
      color: #844d2d;
    }
  }
  .scanContent {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    .scanTtem {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 480px;
      height: 480px;
      background: #f1e5c5;
      border-radius: 10px;
      .text {
        color: #844d2d;
        font-size: 42px;
        margin-top: 72px;
      }
    }
  }
  .timer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 400px;
    color: #844d2d;
    z-index: 1000000;
  }
  .videoContent {
    width: 100%;
    // height: 1200px;
    margin-top: 30px;
    border-radius: 10px;
    overflow: hidden;
  }
  .bttomBtn {
    position: fixed;
    width: 90%;
    bottom: 40px;
    left: 0;
    margin-left: 5%;
    display: flex;
    justify-content: space-between;
    z-index: -1;

    button {
      background: #844d2d;
      font-size: 36px;
      padding: 40px;
      height: 120px;
      border-radius: 10px;
      color: #ffffdc;
      outline: none;
      border: none;
    }
    button:first-child {
      width: 320px;
    }
    button:last-child {
      width: 640px;
    }
    #btn {
      width: 100%;
    }
  }
}
.notice {
  margin-top: 30px;
}
</style>
