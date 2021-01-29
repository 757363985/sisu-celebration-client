<template>
  <div :class="$style.bindCotnent">
    <div :class="$style.form">
      <van-form @submit="onClickSubmit">
        <van-field
          v-model="workLocation"
          readonly
          clickable
          is-link
          label="工作所在地"
          name="workLocation"
          placeholder="请选择工作所在地"
          required
          :rules="[
            {
              required: true,
              message: '请填写工作所在地',
            },
          ]"
          @click="areaShow = true"
        />
        <van-field
          v-model="company"
          label="工作单位"
          name="company"
          placeholder="工作单位"
          required
          :rules="[
            {
              required: true,
              message: '工作单位',
            },
          ]"
        />
        <van-field
          v-model="profession"
          label="职业"
          name="profession"
          placeholder="职业"
          required
          :rules="[
            {
              required: true,
              message: '职业',
            },
          ]"
        />
        <van-field
          v-model="position"
          label="职位"
          name="position"
          placeholder="职位"
          required
          :rules="[
            {
              required: true,
              message: '职位',
            },
          ]"
        />

        <div :class="$style.btnWrapper">
          <van-button block type="primary" native-type="submit" :disabled="saveFetching"
            >提交信息</van-button
          >
        </div>
        <van-popup v-model="areaShow" position="bottom">
          <van-area
            title="选择地区"
            :area-list="areaList"
            @confirm="onConfirmArea"
            @cancel="areaShow = false"
          />
        </van-popup>
      </van-form>
    </div>
    <!-- <div :class="$style.btn" @click="onClickSubmit">
      提交信息
    </div> -->
  </div>
</template>

<script>
import { Form, Field, Button, Dialog, Area, Popup } from 'vant';
import { PutUserInfo } from './services/services';
import areaList from './area';

export default {
  name: 'PersonalInformation',
  components: {
    'van-form': Form,
    'van-field': Field,
    'van-button': Button,
    'van-area': Area,
    'van-popup': Popup,
  },
  data() {
    return {
      saveFetching: false,
      position: '',
      profession: '',
      company: '',
      workLocation: '',
      areaList: areaList,
      areaShow: false,
    };
  },
  mounted() {
    console.log(this.areaList);
  },
  methods: {
    onConfirmArea(value) {
      this.workLocation = value
        .map((item) => {
          return item.name;
        })
        .join('-');
      this.areaShow = false;
    },
    onClickSubmit(value) {
      this.saveFetching = true;
      PutUserInfo(value)
        .then(() => {
          this.saveFetching = false;
          Dialog.alert({
            message: '个人信息完善成功',
          }).then(() => {
            this.$router.back();
          });
        })
        .catch(() => {
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
    margin-top: 10px;
    border-radius: 4px;
    overflow: hidden;
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
