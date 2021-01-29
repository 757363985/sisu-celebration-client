<template>
  <div>
    <i-head-img :headImg="TopImg" headText="一次青春，一生回忆" />

    <div :class="$style.searchWarpper">
      <van-dropdown-menu :overlay="false" :class="$style.dropdownMenu">
        <van-dropdown-item v-model="searchWayValue" :options="searchWays" />
      </van-dropdown-menu>
      <input
        v-if="searchWayValue === 0"
        v-model="title"
        :class="$style.searchInput"
        placeholder="请输入关键字进行查询"
        confirmType="search"
        type="text"
        @keyup.enter="__onConfirmTitle"
      />
      <span v-else @click="onChooseTime">
        <input
          v-model="phoneTime"
          :class="$style.searchInput"
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

    <van-pull-refresh v-model="PAGING_LOADING" @refresh="onRefresh">
      <div v-if="PAGING_LIST && !PAGING_LIST.length" class="page-no-data_icon_mobile">
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

    <van-calendar
      ref="calendar"
      v-model="calendarShow"
      color="#844D2D"
      :max-date="maxDate"
      :min-date="minDate"
      type="range"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { Icon, DropdownMenu, DropdownItem, Calendar, List, PullRefresh } from 'vant';
import DingEmpty from '@/components/ding-empty/ding-empty-mobile';

import { formatTime } from '@/helpers/time';
import Paging from '@/mixins/paging/paging';
import TopImg from '@/assets/shadow-mobile.png';
import { GetPhotoList } from './services/services';
import * as COMMON_APIS from '@/apis/common';

import PhotoItem from '@/components/photo-item-mobile/photo-item-mobile';
import HeadImg from '@/components/head-img-mobile/head-img-mobile';

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
    };
  },
  async mounted() {
    const res = await COMMON_APIS.GetPhotoNumber({ types: 1 });
    this.num = res?.data?.number;
  },
  methods: {
    /**
     * 请求页面数据方法
     */
    async GET_PAGING(val) {
      // const token = localStorage.getItem("token")
      // const { token } = await wxAuth('graduation-photo-mobile');
      // Storage.setToken(token);
      return GetPhotoList(val);
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
        types: [2, 3, 4, 5],
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
        types: [2, 3, 4, 5],
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
        types: [2, 3, 4, 5],
        beginTime: formatTime(value[0], 'yyyy-MM-dd hh:mm:ss'),
        endTime: formatTime(value[1], 'yyyy-MM-dd hh:mm:ss'),
        page: 1,
      };
      this.onRefresh();
    },
    // 点击确认搜索
    __onConfirmTitle() {
      this.PAGING_PARAMS = {
        types: [2, 3, 4, 5],
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
  height: 40px;
  margin: 0 @padding-content;
  background: #f1e5c5;
  padding: 0 14px 0 0;
  border-radius: @border-radius;
}

.searchText {
  text-align: center;
  font-size: 12px;
  color: #844d2d;
  margin-top: 15px;
}

.searchWarpper :global {
  .van-dropdown-menu {
    width: 86px;
    display: inline-block;
    vertical-align: top;
    background: transparent;
    margin: 10px 0;
    padding-right: 10px;
    border-right: 1px solid rgba(226, 204, 167, 0.8);
  }

  .van-dropdown-menu__bar {
    height: 20px;
    background: transparent;
    box-shadow: none;
  }

  .van-dropdown-menu__title::after {
    border-color: transparent transparent #844d2d #844d2d;
  }

  .van-ellipsis {
    color: #844d2d;
    font-size: 12px;
    display: inline-block;
    width: 48px;
    vertical-align: -4px;
  }
  .van-ellipsis::after {
    color: #844d2d;
  }

  .van-popup {
    margin: 0 @padding-content;
    left: 0;
    width: 344px;
  }
  .van-cell {
    background: #f1e5c5;
  }

  .van-dropdown-item__option {
    color: #844d2d;
    font-size: 12px;
  }
}

.dropItem {
  line-height: 30px;
}

.searchInput {
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
  width: 220px;
  padding-left: 10px;
  color: #844d2d;
}

::-webkit-input-placeholder {
  color: rgba(132, 77, 45, 0.6);
  font-size: 12px;
  line-height: 32px;
}

.searchIcon {
  font-size: 16px;
  color: #844d2d;
  line-height: 40px;
  float: right;
}

.photoListWarpper {
  margin: 0 @padding-content;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.photoItem {
  width: 164px;
  flex-shrink: 0;
  margin-top: @padding-content;
}

.photoItem:nth-child(odd) {
  margin-right: 6px;
}

.photoItem:nth-child(even) {
  margin-left: 6px;
}
</style>
