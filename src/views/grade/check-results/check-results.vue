<template>
  <div :class="$style.topCntent">
    <!-- tab栏 -->
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

    <!-- 提示 -->
    <div v-if="!showType" :class="$style.notice">
      <i-notice text="请尽量将面部展示在屏幕正中" />
    </div>

    <!-- 人脸识别 -->
    <i-face v-if="!showType" @click="onClickCheck" />

    <!-- 微信扫码 -->
    <i-scan v-show="showType === 1" :startScan="showType" />

    <!-- 按姓名查询 -->
    <i-name-search v-if="showType === 2" @search="onSearch" />

    <!-- 人员信息card -->
    <div :class="$style.userInfo">
      <i-user-info-card
        v-if="$store.state.userInfo"
        :userInfo="$store.state.userInfo"
        @click="onClickCheck"
      />
    </div>

    <!-- 没有查询到成绩是的弹窗 -->
    <i-modal :visible="visible" @cancel="onCanCel">
      <div :class="$style.emptyContent">
        {{ grade }}
      </div>
    </i-modal>
  </div>
</template>

<script>
import Notice from '@/components/notice/notice';
import Modal from '@/components/modal/modal-pc';
import NameSearch from '@/components/name-search/name-search';
import UserInfoCard from './components/user-info-card';

import Face from './components/face';
import Scan from './components/scan';

/** 无成绩提示 */
import { grade } from '@/configs/toast-message';

import * as APIS from '../service';

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
  },
  data() {
    return {
      titleItem,
      showType: 0,
      visible: false,
      grade,
    };
  },
  computed: {
    scroeDetail() {
      return this.$store.state.scroeDetail;
    },
  },
  watch: {
    // 监听成绩数据变化，检测是否查询到成绩数据
    scroeDetail(val) {
      this.visible = val.list && !val.list.length;
    },
  },
  methods: {
    onCanCel() {
      this.visible = false;
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
    /** 点击查询成绩 */
    onClickCheck() {
      const list = this.$store.state.scroeDetail.list;
      if (!list || !list.length) {
        this.visible = true;
        return;
      }
      this.$router.push('/grade/grade-results');
    },
    /** 按名字查询成绩 */
    async onSearch(name) {
      const { data } = await APIS.GetSelectScoreByName({ name });

      // 将成绩数据存在vuex中
      this.$store.dispatch('updateScroeDetail', data);

      if (!data.list || !data.list.length) {
        this.visible = true;
        return;
      }
      this.$router.push('/grade/grade-results');
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
.emptyContent {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
