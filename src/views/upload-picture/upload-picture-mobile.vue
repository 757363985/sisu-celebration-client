<template>
  <div :class="$style.wrapper">
    <div v-if="!isCompelete" :class="$style.headWarpper">
      <img v-if="userInfo.cover" :class="$style.userHead" :src="userInfo.cover" />
      <div v-else :class="$style.userHeadDefault">
        <span v-if="userInfo.name" :class="$style.userHeadText">{{
          userInfo.name.substr(-2)
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
    <!-- 上传照片 -->
    <van-field v-if="!isCompelete" name="resources" label="上传照片" required>
      <template #input>
        <van-uploader v-model="resources" :max-count="1" />
      </template>
    </van-field>

    <!-- 上传成功 -->
    <div v-if="isCompelete" :class="$style.successWarpper">
      <van-icon name="checked" color="#844D2D" size="40" />
      <div :class="$style.successText">上传成功</div>
    </div>

    <!-- 提交按钮 -->
    <div :class="$style.btnWarpper" @click="onClickUploadImg">
      <van-button :loading="saveFetching" :disabled="saveFetching" block type="primary">{{
        isCompelete ? '完成' : '确认上传'
      }}</van-button>
    </div>
  </div>
</template>

<script>
import { Uploader, Field, Button, Toast, Icon, Dialog } from 'vant';
import { getwxAuthToken } from '@/helpers/weixin-jsapi';
import uploadOss from '@/helpers/oss-upload';
import { PostUserHeadImg, GetUserINfo } from './services/services';

export default {
  name: 'UploadPicture',
  components: {
    'van-uploader': Uploader,
    'van-field': Field,
    'van-button': Button,
    'van-icon': Icon,
  },
  data() {
    return {
      resources: [],
      saveFetching: false,
      isCompelete: false,
      // 路由参数传递的key,第二次state
      key: '',
      userInfo: {},
    };
  },
  async mounted() {
    const { key } = this.$route.query;
    try {
      const { code, state } = await getwxAuthToken('upload-picture', key);
      this.key = state;
      const { data } = await GetUserINfo({ code });
      this.userInfo = data;
    } catch (e) {
      if (e.code === 200002) {
        Dialog.confirm({
          title: '提示',
          message: '你还没有绑定用户信息，是否绑定？',
        }).then(() => {
          const a = document.createElement('a');
          a.href = `${location.origin}/#/user-bind`;
          a.click();
        });
      }
    }
  },
  methods: {
    // 上传图片
    async onClickUploadImg() {
      if (this.isCompelete) {
        wx.closeWindow();
      } else {
        if (!this.resources[0]) {
          Toast('请上传照片');
          return;
        }
        // 开始上传
        this.saveFetching = true;
        const ossKey = await uploadOss({ file: this.resources[0].file });
        PostUserHeadImg({
          resources: ossKey,
          key: this.key,
        })
          .then(() => {
            // 上传成功
            this.isCompelete = true;
            this.saveFetching = false;
          })
          .catch(() => {
            this.saveFetching = false;
          });
      }
    },
  },
};
</script>

<style lang="less" module>
@import '~vant/lib/style/var.less';
@import '~@scf/ding-style-less/var.less';
.wrapper {
  margin: @padding-content @padding-content 10px @padding-content;

  :global {
    .van-cell {
      background: #f1e5c5 !important;
      .van-field__label {
        color: #844d2d;
      }

      .van-field__control {
        color: rgba(132, 77, 45, 0.4);
      }
    }
    .van-cell::after {
      border-color: rgba(132, 77, 45, 0.1);
    }
  }
}

.headWarpper {
  padding: 20px @padding-content 20px @padding-content;
  margin-bottom: 10px;
  background: #f1e5c5;
  border-radius: @border-radius;
  display: flex;
}
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
.btnWarpper {
  margin-top: 20px;
}

.successWarpper {
  background: #f1e5c5;
  text-align: center;
  padding: @padding-content 0;
  border-radius: @border-radius;
}

.successText {
  color: @color-primary;
  font-size: 14px;
  margin-top: 8px;
}
</style>
