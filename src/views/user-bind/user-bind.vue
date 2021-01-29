<template>
  <div :class="$style.bindCotnent">
    <div :class="$style.notice">
      <i-notice text="请使用证件照片，上传照片将作为人脸底库数据" />
    </div>
    <div v-if="!isreport" :class="$style.form">
      <van-form @submit="onSubmit">
        <van-field
          name="avatar"
          label="上传头像"
          required
          :rules="[{ message: '请上传头像', required: true }]"
        >
          <template #input>
            <van-uploader v-model="uploader" :max-count="1" />
          </template>
        </van-field>
        <van-field
          v-model="grade"
          label="年级"
          type="year-month"
          readonly
          required
          clickable
          name="grade"
          placeholder="点击选择年级"
          :rules="[{ message: '请选择年级', required: true }]"
          @click="showPicker = true"
        />
        <van-popup v-model="showPicker" position="bottom">
          <van-picker
            show-toolbar
            title="年级"
            :columns="yearColumns"
            @confirm="onConfirm"
            @cancel="showPicker = false"
          />
        </van-popup>
        <!-- 院系 -->
        <van-field
          v-model="department"
          label="院系"
          type="year-month"
          readonly
          required
          clickable
          name="department"
          placeholder="点击选择院系"
          :rules="[{ message: '请选择院系', required: true }]"
          @click="showDepartmenPicker = true"
        />
        <van-popup v-model="showDepartmenPicker" position="bottom">
          <van-picker
            show-toolbar
            title="院系"
            :columns="departmentColums"
            @confirm="onConfirmDepartment"
            @cancel="showDepartmenPicker = false"
          />
        </van-popup>

        <!-- 班级 -->
        <van-field
          v-if="departmentColums.length"
          v-model="className"
          label="班级"
          type="year-month"
          readonly
          clickable
          name="className"
          placeholder="点击选择班级"
          @click="showClassPicker = true"
        />
        <van-popup v-model="showClassPicker" position="bottom">
          <van-picker
            show-toolbar
            title="班级"
            :columns="classColums"
            @confirm="onConfirmClass"
            @cancel="showClassPicker = false"
          />
        </van-popup>

        <!-- <van-field v-model="className" label="班级" name="className" placeholder="班级" /> -->
        <van-field
          v-model="name"
          label="姓名"
          required
          name="name"
          placeholder="姓名"
          :rules="[{ message: '请输入姓名', required: true }]"
        />
        <van-field
          v-model="mobile"
          label="手机号"
          required
          name="mobile"
          placeholder="手机号"
          :rules="[{ pattern: mobilePattern, message: '请输入正确的手机号' }]"
        >
          <template #button>
            <van-button
              size="small"
              type="primary"
              native-type="button"
              :disabled="disabledBtn"
              @click="onClickSendCode"
              >发送验证码</van-button
            >
          </template>
        </van-field>
        <van-field
          v-if="showCode"
          v-model="code"
          label="验证码"
          required
          name="code"
          placeholder="请输入验证码"
          :rules="[{ required: true, message: '请输入验证码' }]"
        >
        </van-field>
        <div v-show="showCode" :class="$style.codeTime">{{ codeTime }}秒后可重新发送</div>
        <van-button :loading="disabledBindBtn" :disabled="disabledBindBtn" :class="$style.btn">
          提交信息
        </van-button>
      </van-form>
    </div>
    <div v-else>
      <div :class="$style.box">
        <div :class="$style.boxItem">
          <span>姓名</span><span>{{ reportData.name }}</span>
        </div>
        <div :class="$style.boxItem">
          <span>毕业年份</span><span>{{ reportData.grade }}</span>
        </div>
        <div :class="$style.boxItem">
          <span>院系</span><span>{{ reportData.department }}</span>
        </div>
      </div>

      <van-button
        :loading="disabledBindBtn"
        :disabled="disabledBindBtn"
        :class="$style.btn"
        @click="onClickConfrimBind"
      >
        确认绑定
      </van-button>
    </div>
    <van-dialog v-model="showDialog" show-cancel-button @confirm="onConfirmdiaLog">
      <ul :class="$style.listContent">
        <li
          v-for="i in userInfos"
          :key="i.id"
          :class="$style.listItem"
          @click="onClickSelectUser(i)"
        >
          <div :class="$style.left">
            <div :class="$style.leftTop">{{ i.name }}</div>
            <div :class="$style.leftBtm">{{ i.grade }} / {{ i.department }} / {{ i.classNum }}</div>
          </div>
          <div v-show="i.select" :class="$style.right">
            <img :src="selectIcon" alt="选中的图片" />
          </div>
        </li>
      </ul>
    </van-dialog>
  </div>
</template>

<script>
import Vue from 'vue';
import { Form, Field, Popup, Picker, Uploader, Button, Toast, Dialog } from 'vant';

import Notice from '@/components/notice/notice-mobile';

import * as APIS from './service';
import * as COMMON_APIS from '@/apis/common';

import { getwxAuthCode } from '../../helpers/weixin-jsapi';

const selectIcon = require('@/assets/select.png');

Vue.use(Dialog);

let timer = null;
// 验证码倒计时时长
const CODE_TIME = 60;

export default {
  name: 'UserBind',
  components: {
    'i-notice': Notice,
    'van-form': Form,
    'van-field': Field,
    'van-popup': Popup,
    'van-picker': Picker,
    'van-uploader': Uploader,
    'van-button': Button,
    [Dialog.Component.name]: Dialog.Component,
  },
  data() {
    return {
      grade: '',
      department: '',
      className: '',
      showPicker: false,
      showDepartmenPicker: false,
      showClassPicker: false,
      showDialog: false,
      name: '',
      mobile: '',
      // 文件上传对象
      uploader: [],
      // 毕业年份选项
      yearColumns: [],
      // 班级选项：
      classColums: [],
      // 院系选项
      departmentColums: [],
      // 验证码倒计时
      codeTime: CODE_TIME,
      // 展示倒计时
      showCode: false,
      //发送验证码按钮禁用
      disabledBtn: false,
      //提交信息确认绑定按钮状态
      disabledBindBtn: false,
      //确认绑需要提交的数据
      reportData: null,
      // 是否提交
      isreport: false,
      // 正则验证手机号
      mobilePattern: /^1[3456789]\d{9}$/,
      // 用户身份信息数组
      userInfos: [],
      code: '',
      // 微信code
      wxCode: '',
      selectIcon,
      //头像数据
      avatar: '',
      // 是否绑定成功
      isBindSuccess: false,
    };
  },
  async mounted() {
    const { code } = await getwxAuthCode('user-bind', '');
    if (code) {
      this.wxCode = code;
      COMMON_APIS.GetOrg({ parentId: 0 }).then((res) => {
        this.yearColumns = res.data.map((i) => ({ text: i.name, dataIndex: i.id }));
      });
    }
  },
  methods: {
    /** 毕业年份点击确认 */
    onConfirm(val) {
      if (!val) {
        return;
      }
      this.grade = val.text;
      this.department = '';
      this.showPicker = false;
      // 获取班级数据
      COMMON_APIS.GetOrg({ parentId: val.dataIndex }).then((res) => {
        this.departmentColums = res.data.map((i) => ({ text: i.name, dataIndex: i.id }));
      });
    },
    onConfirmDepartment(val) {
      if (!val) {
        return;
      }
      this.department = val.text;
      this.className = '';
      this.showDepartmenPicker = false;
      COMMON_APIS.GetOrg({ parentId: val.dataIndex }).then((res) => {
        this.classColums = res.data.map((i) => ({ text: i.name, dataIndex: i.id }));
      });
    },
    onConfirmClass(val) {
      if (!val) {
        return;
      }
      this.className = val.text;
      this.showClassPicker = false;
    },
    /** 点击提交表单 */
    async onSubmit(value) {
      if (!this.code) {
        return Toast.fail('请输入验证码');
      }
      const [{ file }] = value.avatar;
      const formData = new FormData();
      formData.append('file', file);
      try {
        this.disabledBindBtn = true;
        const {
          data: { shortUrl },
        } = await COMMON_APIS.PostUpload(formData);
        this.avatar = shortUrl;
        value.avatar = shortUrl;
        const { data } = await APIS.PostReportVerify(value);
        if (!data.length) {
          this.disabledBindBtn = false;
          return Dialog({ message: '暂未查询到用户信息，请联系管理员' });
        } else {
          this.showDialog = true;
          this.userInfos = data.map((i) => ({ ...i, select: false }));
          if (data.length === 1) {
            this.reportData = data[0];
            this.onConfirmdiaLog();
          }
          this.disabledBindBtn = false;
        }
      } catch (e) {
        this.disabledBindBtn = false;
        console.log(e, '出错了');
      }
    },
    /**点击发送验证码，并开始倒计时 */
    onClickSendCode() {
      if (!this.mobilePattern.test(this.mobile)) {
        return Toast.fail('请输入正确的手机号！');
      }
      this.disabledBtn = true;
      this.showCode = true;
      COMMON_APIS.PostSendMessage({ mobile: this.mobile })
        .then(() => {
          timer = setInterval(() => {
            if (this.codeTime > 0) {
              this.codeTime = this.codeTime - 1;
            } else {
              this.showCode = false;
              this.disabledBtn = false;
              this.codeTime = CODE_TIME;
              clearInterval(timer);
            }
          }, 1000);
        })
        .catch(() => {
          this.disabledBtn = false;
        });
    },
    /** 确认绑定*/
    async onClickConfrimBind() {
      try {
        // 提交信息获取userId
        this.disabledBindBtn = true;
        // 提交信息
        const {
          data: { token },
        } = await APIS.PostConfirmBind({
          userId: this.reportData.id,
          code: this.wxCode,
          avatar: this.avatar,
          mobile: this.mobile,
        });
        // 本地缓存写入token
        localStorage.setItem('token', token);
        Toast.success('绑定成功,页面即将关闭');
        this.disabledBindBtn = false;
        this.isBindSuccess = true;
        setTimeout(() => {
          wx.closeWindow();
        }, 1500);
      } catch (e) {
        this.disabledBindBtn = false;
      }
    },
    /** 选择用户 */
    onClickSelectUser(item) {
      // console.log(item);
      // // 选择用户身份
      this.reportData = item;
      const { id } = item;
      this.userInfos = this.userInfos.map((i) => {
        const { id: key } = i;
        if (id === key) {
          return {
            ...i,
            select: true,
          };
        } else {
          return {
            ...i,
            select: false,
          };
        }
      });
    },
    /** 弹出层点击确认 */
    onConfirmdiaLog() {
      if (!this.reportData) {
        setTimeout(() => {
          this.showDialog = true;
        });
        return Toast.fail('请选择用户！');
      }
      this.showDialog = false;
      this.isreport = true;
    },
  },
};
</script>

<style lang="less" module>
@import '~vant/lib/style/var.less';
@import '~@scf/ding-style-less/var.less';
.bindCotnent {
  padding: 0 15px;
  .notice {
    margin: 10px 0;
  }
  .form {
    border-radius: 4px;
    overflow: hidden;
    :global {
      // 修改表单样式
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
  .btn {
    margin-top: 70.5px;
    width: 100%;
    height: 40px;
    background: #844d2d;
    text-align: center;
    line-height: 40px;
    border-radius: 4px;
    color: #ffffff;
  }
  .codeTime {
    text-align: right;
    margin-top: 20px;
    padding-left: 16px;
    color: #844d2d;
  }

  .box {
    background: #f1e5c5;
    border-radius: 4px;
    margin-top: 15px;
    .boxItem {
      width: 100%;
      height: 50px;
      border-bottom: 1px solid rgba(132, 77, 45, 0.1);

      line-height: 50px;
      padding-left: 12px;
      span:first-child {
        color: #844d2d;
        font-size: 14px;
        margin-right: 32px;
      }
      span:last-child {
        color: #844d2d;
        font-size: 12px;
      }
    }
    .boxItem:last-child {
      border-bottom: none;
    }
  }

  .btn {
    margin-top: 70.5px;
    width: 100%;
    height: 40px;
    background: #844d2d;
    text-align: center;
    line-height: 40px;
    border-radius: 4px;
    color: #ffffff;
  }

  .listContent {
    background-color: #f1e5c5 !important;
    list-style: none;
    .listItem {
      padding: 14px;
      font-size: 14;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid rgba(132, 77, 45, 0.1);
      align-items: center;
      // align-items: center;
      .left {
        flex: 1;
        display: flex;
        flex-direction: column;
        .leftTop {
          color: #844d2d;
          margin-bottom: 10px;
        }
        .leftBtm {
          color: #aa8262;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
