<template>
  <div :class="$style.topCntent">
    <div :class="$style.title">
      <div
        v-for="i in titleItem"
        :key="i.id"
        :class="!i.select ? $style.titleItemSelect : $style.titleItem"
        @click="onClickItem(i.id)"
      >
        {{ i.text }}
      </div>
    </div>
    <div v-if="!showType" :class="$style.notice">
      <i-notice text="请尽量将面部展示在屏幕正中" />
    </div>
    <i-face v-if="!showType" @click="onClickCheck" />

    <i-scan v-show="showType === 1" :startScan="showType" />

    <i-name-search v-if="showType === 2" @search="onSeach" />
    <div :class="$style.userInfo">
      <i-user-info-card
        v-if="$store.state.userInfo"
        :userInfo="$store.state.userInfo"
        @click="onClickCheck"
      />
    </div>
    <i-modal :visible="visible" index="101" @cancel="onCanCel">
      <div :class="$style.emtyContent">
        {{ cunzhao }}
      </div>
    </i-modal>
    <i-modal :visible="resultVisible" @cancel="onResultModalCanCel">
      <div :class="$style.resultContent">
        <div
          v-for="i in resultList"
          :key="i.id"
          :class="$style.resultItem"
          @click="onClickCheckPhoto(i)"
        >
          <span
            >{{ i.name || '' }} {{ i.grade || '' }} {{ i.department || '' }}
            {{ i.classNum || '' }}</span
          >
          <van-icon name="arrow" />
        </div>
      </div>
    </i-modal>
  </div>
</template>

<script>
import { Icon } from 'vant';
import Notice from '@/components/notice/notice';
import Modal from '@/components/modal/modal-pc';
import NameSearch from '@/components/name-search/name-search';

import UserInfoCard from './components/user-info-card';
import Face from './components/face';
import Scan from './components/scan';

// 无寸照文字提示
import { cunzhao } from '@/configs/toast-message';

import * as APIS from './services';

const titleItem = [
  {
    text: '人脸识别',
    select: true,
    id: 0,
  },
  {
    text: '微信扫码',
    select: false,
    id: 1,
  },
  {
    text: '姓名查询',
    select: false,
    id: 2,
  },
];

export default {
  name: 'CheckResults',
  components: {
    'i-face': Face,
    'i-scan': Scan,
    'i-notice': Notice,
    'i-user-info-card': UserInfoCard,
    'i-modal': Modal,
    'i-name-search': NameSearch,
    'van-icon': Icon,
  },
  data() {
    return {
      titleItem,
      showType: 0,
      visible: false,
      resultVisible: false,
      resultList: [],
      cunzhao,
    };
  },
  created() {
    this.$store.dispatch('updateUserInfo', null);
  },
  methods: {
    onCanCel() {
      this.visible = false;
    },
    onResultModalCanCel() {
      this.resultVisible = false;
    },
    /**
     * @method 点击人脸识别或者二维码扫描按钮
     * @param key 当前点击对应选项的id
     */
    onClickItem(key) {
      this.showType = key;
      this.titleItem = this.titleItem.map((i) => {
        const { id } = i;
        if (key === id) {
          return {
            ...i,
            select: true,
          };
        }
        return {
          ...i,
          select: false,
        };
      });
    },
    /** 点击跳转到寸照 */
    onClickCheck() {
      const { inchPhoto } = this.$store.state.userInfo;
      if (!inchPhoto) {
        this.visible = true;
        return;
      }
      this.$router.push('/cunzhao-content');
    },
    async onSeach(name) {
      const { data } = await APIS.GetPhotoByName({ name });
      this.resultList = data;
      if (data && data.length) {
        this.resultVisible = true;
      } else {
        this.visible = true;
      }
    },
    onClickCheckPhoto(val) {
      const { inchPhotoUrl } = val;

      if (!inchPhotoUrl || (inchPhotoUrl && !inchPhotoUrl.length)) {
        this.visible = true;
        return;
      }
      // 更新用户信息
      this.$store.dispatch('updateUserInfo', { ...val, inchPhoto: inchPhotoUrl });

      this.$router.push('/cunzhao-content');
    },
  },
};
</script>

<style lang="less" module>
@import '~vant/lib/style/var.less';
@import '~@scf/ding-style-less/var.less';

.topCntent {
  padding: 0 40px;
  .title {
    width: 100%;
    height: 138px;
    background-color: #f1e5c5;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    .titleItem {
      background: #844d2d;
      border-radius: 10px;
      text-align: center;
      width: 50%;
      line-height: 138px;
      font-size: 42px;
      color: #ffffdc;
    }
    .titleItemSelect {
      color: #844d2d;
      border-radius: 10px;
      text-align: center;
      width: 50%;
      line-height: 138px;
      font-size: 42px;
    }
  }
  .notice {
    margin: 30px 0;
  }
  .userInfo {
    margin-top: 88px;
  }
}
.resultContent {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  .resultItem {
    border-bottom: 2px solid rgba(132, 77, 45, 0.1);
    padding: 30px 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    // flex: 1;
    transition: background-color 0.5s ease-in;
  }
  .resultItem:active {
    background-color: #6f4024;
  }
}
.emtyContent {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
