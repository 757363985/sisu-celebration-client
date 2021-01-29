<template>
  <div :class="$style.compoundContent">
    <div v-show="isSuccess" :class="$style.success">
      <img :src="success" alt="" />
      <span>合成成功</span>
    </div>

    <div v-show="isSuccess" :class="$style.scan">
      <div :class="$style.scanImg">
        <img width="100%" :src="exportImgUrl" alt="下载图片二维码" />
      </div>
      <span>扫码保存照片至手机</span>
    </div>

    <div v-show="!isSuccess">
      <div :class="$style.notcie">
        <i-notice text="为提高照片合成成功率，请上传清晰的单人人物照片" />
      </div>
      <div :class="$style.bttomBtn">
        <van-button @click="onClickRestart">重新上传</van-button
        ><van-button :loading="loading" :disabled="loading" @click="onClickCompound"
          >确定合成</van-button
        >
      </div>
      <div :class="$style.imgPreview">
        <div>拖动图片</div>
        <canvas id="canvas" />
      </div>
    </div>
  </div>
</template>

<script>
import { Dialog, Button } from 'vant';

import Notice from '@/components/notice/notice';

// import { generateQr } from '@/configs/app';

import DragImg from '@/helpers/drag-img';
import { dataURLtoBlob } from '@/helpers/dataurl-to-blob';

import * as COMMON_APIS from '@/apis/common';
import * as APIS from '../services';

const success = require('@/assets/take-photo/img-success.png');

export default {
  name: 'CompoundImg',
  components: {
    'i-notice': Notice,
    [Dialog.Component.name]: Dialog.Component,
    'van-button': Button,
  },
  data() {
    return {
      dragImg: null,
      exportImgUrl: '',
      success,
      isSuccess: false,
      loading: false,
    };
  },
  mounted() {
    const {
      dragImg: {
        bgInfo: { cover },
        userUrl,
      },
    } = this.$store.state;

    const dragImg = new DragImg();

    dragImg.createCanvas({ backgroundImage: cover });

    dragImg.addImg(userUrl);

    this.dragImg = dragImg;
  },
  methods: {
    /**重新上传 */
    onClickRestart() {
      this.$router.go(-1);
    },
    /**确定合成 */
    async onClickCompound() {
      const file = dataURLtoBlob(this.dragImg.exportImg());
      const formData = new FormData();
      formData.append('file', file);
      this.loading = true;
      try {
        const {
          data: { url, shortUrl },
        } = await COMMON_APIS.PostUpload(formData);

        const { bgInfo } = this.$store.state.dragImg;

        await APIS.PostImge({ coverId: bgInfo.id, url: shortUrl });
        // 生成二维码
        this.exportImgUrl = `${window.location.origin}${COMMON_APIS.qrCodeLink}?content=${url}`;
        this.isSuccess = true;
        this.loading = false;
      } catch (e) {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="less" module>
@import '~vant/lib/style/var.less';
@import '~@scf/ding-style-less/var.less';

.compoundContent {
  padding: 0 40px;
  .notcie {
    margin: 30px 0;
  }
  .bttomBtn {
    position: fixed;
    width: 90%;
    bottom: 40px;
    left: 0;
    margin-left: 5%;
    display: flex;
    justify-content: space-between;

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
  }
  .imgPreview {
    // margin-top: 30px;
    div {
      text-align: center;
      margin: 30px 0;
      font-size: 36px;
      color: #844d2d;
    }
  }
  .success {
    width: 1000px;
    height: 200px;
    border-radius: 10px;
    overflow: hidden;
    font-size: 42px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f1e5c5;
    margin-top: 30px;
    img {
      margin-right: 20px;
    }
  }
  .scan {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: fixed;
    bottom: 123px;
    .scanImg {
      margin-bottom: 64px;
      height: 300px;
      width: 300px;
      background-color: #844d2d;
      overflow: hidden;
    }
    span {
      font-size: 36px;
      text-align: center;
      color: #844d2d;
    }
  }
}
</style>
