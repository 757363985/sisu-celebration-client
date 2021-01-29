<template>
  <div>
    <i-head-img :headImg="TopImg" :bigImg="true" headText="一次青春，一生回忆" />

    <div :class="$style.searchWarpper">
      <van-dropdown-menu :overlay="false" :class="$style.dropdownMenu">
        <van-dropdown-item v-model="searchWayValue" :options="searchWays" />
      </van-dropdown-menu>
      <input
        v-if="searchWayValue === 0"
        v-model="title"
        :class="$style.searchInputPc"
        placeholder="请输入关键字进行查询"
        confirmType="search"
        type="text"
        @keyup.enter="__onConfirmTitle"
      />
      <span v-else @click="onChooseTime">
        <input
          v-model="phoneTime"
          :class="$style.searchInputPc"
          placeholder="请选择留影时间范围"
          type="text"
          disabled
        />
      </span>
      <van-icon
        v-if="searchWayValue === 0"
        :class="$style.searchIcon"
        name="search"
        @click="__onConfirmTitle"
      />
      <van-icon
        v-if="searchWayValue !== 0 && startDate === ''"
        :class="$style.searchIcon"
        name="arrow-down"
        @click="onChooseTime"
      />

      <van-icon
        v-if="searchWayValue !== 0 && startDate !== ''"
        :class="$style.searchIcon"
        name="close"
        @click="onClearTime"
      />
    </div>

    <div v-if="num" :class="$style.searchText">查询到 {{ num }} 张相关照片</div>
    <div :class="$style.pcPullrefresh">
      <van-pull-refresh v-model="PAGING_LOADING" @refresh="onRefresh">
        <div v-if="PAGING_LIST && !PAGING_LIST.length" class="page-no-data_icon">
          <i-ding-empty status="data" text="暂无数据" />
        </div>
        <van-list v-model="load" :finished="!PAGING_MORE" finished-text="没有更多了" @load="onLoad">
          <div :class="$style.photoListWarpper">
            <div
              v-for="i in PAGING_LIST"
              :key="i.id"
              :class="$style.photoItem"
              @click="onGoShadowList(i.id, i.title)"
            >
              <i-photo-item
                :type="1"
                :photoImg="i.cover"
                :photoTitle="i.title"
                :photoCount="i.counter"
              />
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>

    <van-calendar
      ref="calendar"
      v-model="calendarShow"
      color="#844D2D"
      :max-date="maxDate"
      :min-date="minDate"
      :show-confirm="false"
      type="range"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { Icon, DropdownMenu, DropdownItem, Calendar, List, PullRefresh } from 'vant';
import DingEmpty from '@/components/ding-empty/ding-empty';

import { formatTime } from '@/helpers/time';
import Paging from '@/mixins/paging/paging';

import { GetPhotoListPc } from './services/services';
import * as COMMON_APIS from '@/apis/common';

import PhotoItem from '@/components/photo-item-mobile/photo-item';
import HeadImg from '@/components/head-img-mobile/head-img';

import TopImg from '@/assets/shadow.png';

export default {
  name: 'Shadow',
  components: {
    'i-head-img': HeadImg,
    'i-photo-item': PhotoItem,
    'i-ding-empty': DingEmpty,
    'van-list': List,
    'van-pull-refresh': PullRefresh,
    'van-icon': Icon,
    'van-dropdown-item': DropdownItem,
    'van-dropdown-menu': DropdownMenu,
    'van-calendar': Calendar,
  },
  mixins: [Paging],
  data: () => {
    return {
      TopImg: TopImg,
      searchWayValue: 0,
      title: '',
      searchWays: [
        {
          text: '题目',
          value: 0,
        },
        {
          text: '留影时间',
          value: 1,
        },
      ],
      calendarShow: false,
      phoneTime: '',
      maxDate: new Date(),
      minDate: new Date(1970, 0, 1),
      startDate: '',
      endDate: '',
      load: false,
      num: 0,
      type: null,
    };
  },
  created() {
    const { type } = this.$route.query;
    this.type = type;
  },
  async mounted() {
    const res = await COMMON_APIS.GetPhotoNumber({ types: [this.type] });
    this.num = res?.data?.number;
  },
  methods: {
    /**
     * 请求页面数据方法
     */
    GET_PAGING(val) {
      return GetPhotoListPc(val);
    },
    /**
     * 下拉刷新
     */
    onRefresh() {
      this.GET_PAGING_NEXT(true);
    },
    /**
     * 初始化请求数据和滚动加载
     */
    onLoad() {
      this.PAGING_PARAMS = {
        types: [this.type],
        title: this.title,
        beginTime: this.startDate,
        endTime: this.endDate,
      };
      this.GET_PAGING_NEXT(false).then((l) => {
        this.load = l;
      });
    },
    // 点击弹出选择时间
    onChooseTime() {
      this.calendarShow = true;
    },
    // 点击清除时间
    onClearTime() {
      this.startDate = '';
      this.endDate = '';
      this.phoneTime = '';
      this.$refs.calendar.reset();
      this.PAGING_PARAMS = {
        types: [this.type],
        title: '',
        beginTime: '',
        endTime: '',
        page: 1,
      };
      this.onRefresh();
    },
    // 点击确认时间选择
    onConfirm(value) {
      this.calendarShow = false;
      this.startDate = formatTime(value[0], 'yyyy-MM-dd');
      this.endDate = formatTime(value[1], 'yyyy-MM-dd');
      this.phoneTime = `${this.startDate} 到 ${this.endDate}`;
      this.PAGING_PARAMS = {
        types: [this.type],
        beginTime: formatTime(value[0], 'yyyy-MM-dd hh:mm:ss'),
        endTime: formatTime(value[1], 'yyyy-MM-dd hh:mm:ss'),
        page: 1,
      };
      this.onRefresh();
    },
    // 点击确认搜索
    __onConfirmTitle() {
      this.PAGING_PARAMS = {
        types: [this.type],
        title: this.title,
        page: 1,
      };
      this.onRefresh();
    },
    // 前往相册查看照片
    onGoShadowList(id, title) {
      this.$router.push({ path: `/shadow-list/${id}`, query: { title: title } });
    },
  },
};
</script>

<style lang="less" module>
@import '~vant/lib/style/var.less';
@import '~@scf/ding-style-less/var.less';

.searchWarpper {
  height: 100px;
  margin: 0 40px;
  background: #f1e5c5;
  padding: 0 34px 0 0;
  border-radius: 10px;
}

.searchText {
  text-align: center;
  font-size: 32px;
  color: #844d2d;
  margin-top: 34px;
}

.searchWarpper :global {
  .van-dropdown-menu {
    height: 60px;
    width: 200px;
    display: inline-block;
    vertical-align: top;
    background: transparent;
    margin: 20px 0;
    padding-right: 10px;
    border-right: 1px solid rgba(226, 204, 167, 0.8);
  }

  .van-dropdown-menu__bar {
    background: transparent;
    box-shadow: none;
    height: 100%;
  }

  .van-dropdown-menu__title::after {
    border: 8px solid;
    border-color: transparent transparent #844d2d #844d2d;
    position: absolute;
    right: -20px;
    top: 24px;
  }
  .van-dropdown-menu__item {
    height: 100%;
  }

  .van-ellipsis {
    color: #844d2d;
    font-size: 32px;
    height: 100%;
    line-height: 60px;
    display: inline-block;
  }
  .van-ellipsis::after {
    color: #844d2d;
  }

  .van-popup {
    margin: 0 40px;
    left: 0;
    width: 1000px;
  }
  .van-cell {
    background: #f1e5c5;
    height: 80px;
    padding: 0 36px;
  }
  .van-cell__title {
    font-size: 32px;
    line-height: 80px;
  }

  .van-dropdown-item__option {
    color: #844d2d;
    font-size: 12px;
  }

  .van-icon-success::before {
    font-size: 30px;
    line-height: 80px;
  }
}

.dropItem {
  line-height: 30px;
}

.searchInputPc {
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
  width: 700px;
  padding-left: 40px;
  color: #844d2d;
  font-size: 32px;
}

.searchInputPc::-webkit-input-placeholder {
  color: rgba(132, 77, 45, 0.6);
  line-height: 32px;
  font-size: 32px;
}

.searchIcon {
  font-size: 30px;
  color: #844d2d;
  line-height: 100px;
  float: right;
}

.photoListWarpper {
  margin: 0 40px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.photoItem {
  width: 476px;
  flex-shrink: 0;
  margin-top: 30px;
}

.photoItem:nth-child(odd) {
  margin-right: 14px;
}

.photoItem:nth-child(even) {
  margin-left: 14px;
}

.photoIndexColor {
  font-size: 36px;
}

.pcPullrefresh {
  :global {
    .van-list__finished-text {
      font-size: 32px;
    }
    .van-pull-refresh__head {
      font-size: 32px;
    }
    .van-pull-refresh__track {
      font-size: 32px;
    }
    .van-loading__text {
      font-size: 32px;
    }
  }
}
</style>
