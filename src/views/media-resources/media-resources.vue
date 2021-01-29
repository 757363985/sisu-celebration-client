<template>
  <div :class="$style.bindCotnent">
    <div :class="$style.form">
      <van-form @submit="onSubmitSave">
        <van-field
          v-model="name"
          label="姓名"
          name="name"
          placeholder="姓名"
          required
          :rules="[{ required: true, message: '请输入姓名' }]"
        />
        <van-field
          v-model="mobile"
          label="联系电话"
          name="mobile"
          required
          placeholder="联系电话"
          :rules="[
            { pattern: /^1[3456789]\d{9}$/, required: true, message: '请输入正确的手机号码' },
          ]"
        />
        <van-field
          v-model="typeText"
          readonly
          clickable
          required
          is-link
          name="type"
          label="资源类型"
          placeholder="点击选择资源类型"
          :rules="[{ required: true, message: '点击选择资源类型' }]"
          @click="showType = true"
        />
        <van-popup v-model="showType" position="bottom">
          <van-picker
            show-toolbar
            :columns="columns"
            @confirm="onConfirmType"
            @cancel="showType = false"
          />
        </van-popup>
        <van-field
          v-model="time"
          label="资源时间"
          type="year-month"
          is-link
          readonly
          required
          clickable
          name="resourceTime"
          placeholder="点击选择时间"
          :rules="[{ required: true, message: '点击选择时间' }]"
          @click="calendarShow = true"
        />
        <!-- <van-calendar
          v-model="calendarShow"
          :max-date="maxDate"
          :min-date="minDate"
          @confirm="onConfirmCalendar"
        /> -->
        <van-popup v-model="calendarShow" position="bottom">
          <van-datetime-picker
            type="year-month"
            title="选择年月"
            :min-date="minDate"
            :max-date="maxDate"
            @cancel="onCancelDatePicker"
            @confirm="onConfirmDatePicker"
          />
        </van-popup>

        <van-field
          v-model="topic"
          label="主题"
          name="topic"
          placeholder="主题"
          required
          :rules="[{ required: true, message: '请输入主题' }]"
        />
        <van-field v-model="participant" label="参与人" name="participant" placeholder="参与人" />
        <van-field v-model="location" label="地点" name="location" placeholder="地点" />
        <van-field
          v-model="description"
          rows="3"
          maxlength="50"
          type="textarea"
          label="描述"
          name="description"
          placeholder="描述"
          show-word-limit
        />

        <van-field name="resources" label="媒体资源" required>
          <template #input>
            <van-uploader v-model="resources" :accept="fileType" />
          </template>
        </van-field>
        <div :class="$style.btnWrapper">
          <van-button block type="primary" native-type="submit" :disabled="saveFetching"
            >提交信息</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

import {
  Form,
  Field,
  Popup,
  Uploader,
  Picker,
  // Calendar,
  Button,
  Toast,
  Dialog,
  DatetimePicker,
} from 'vant';

import { formatTime } from '@/helpers/time';

import { PostMdeiaResource, PostFile } from './services/services';

Vue.use(DatetimePicker);

export default {
  name: 'UserBind',
  components: {
    'van-form': Form,
    'van-field': Field,
    'van-popup': Popup,
    'van-uploader': Uploader,
    'van-picker': Picker,
    // 'van-calendar': Calendar,
    'van-button': Button,
    // 'van-datetime-picker': DatetimePicker,
  },
  data() {
    return {
      name: '',
      mobile: '',
      type: 3,
      typeText: '图片',
      location: '',
      participant: '',
      description: '',
      topic: '',
      showType: false,
      fileType: 'image/*',
      resources: [],
      columns: ['视频', '音频', '图片'],
      maxDate: new Date(),
      minDate: new Date(2000, 0, 1),
      calendarShow: false,
      resourceTime: '',
      time: '', //不包含日时分秒
      saveFetching: false,
    };
  },
  methods: {
    onCancelDatePicker() {
      this.calendarShow = false;
    },

    onConfirmDatePicker(date) {
      this.calendarShow = false;
      this.time = formatTime(date, 'yyyy-MM');
      this.resourceTime = formatTime(date, 'yyyy-MM-dd hh:mm:ss');
    },
    onConfirmType(val, index) {
      this.typeText = val;
      this.type = index + 1;
      this.showType = false;
      if (this.type === 1) {
        this.fileType = 'video/*';
      } else if (this.type === 2) {
        this.fileType = 'audio/*';
      } else if (this.type === 3) {
        this.fileType = 'image/*';
      }
    },
    onSubmitSave(value) {
      // console.log(this.data);
      if (!this.resources[0]) {
        Toast('请上传媒体资源文件');
        return;
      }
      // 点击就禁用按钮
      this.saveFetching = true;

      Promise.all(
        this.resources.map((item) => {
          return new Promise((resolve, reject) => {
            if (item.url) {
              return resolve();
            }

            const formData = new FormData();

            formData.append('file', item.file);

            item.status = 'uploading';
            PostFile(formData)
              .then(({ data }) => {
                (item.status = 'done'), (item.url = data.shortUrl);
                resolve();
              })
              .catch(() => {
                item.status = 'failed';
                reject();
              });
          });
        }),
      )
        .then(() => {
          const postParams = value;
          postParams.resources = this.resources.map((item) => {
            return item.url;
          });
          postParams.resourceTime = this.resourceTime;
          postParams.type = this.type;
          PostMdeiaResource(postParams)
            .then(() => {
              this.saveFetching = false;
              Dialog.alert({
                message: '媒体资源上传成功',
              }).then(() => {
                this.$router.back();
              });
            })
            .catch((error) => {
              console.log(error);
              this.saveFetching = false;
            });
        })
        .catch((error) => {
          console.log(error);
          console.log('promiseall结束');
          this.saveFetching = false;
        });
    },
  },
};
</script>

<style lang="less" module>
@import '~vant/lib/style/var.less';
@import '~@scf/ding-style-less/var.less';

.bindCotnent {
  padding: 0 15px;
  .form {
    border-radius: 4px;
    overflow: hidden;
    margin-top: 15px;
    :global {
      .van-form {
        .van-cell {
          background-color: #f1e5c5 !important;
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
  }

  .btnWrapper {
    margin-top: 20px;
  }
}
</style>
