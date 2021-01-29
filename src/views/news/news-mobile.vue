<template>
  <div>
    <i-head-img :headImg="TopImg" :headText="topText" />

    <div :class="$style.newsListWarpper">
      <van-pull-refresh v-model="PAGING_LOADING" @refresh="onRefresh">
        <div v-if="PAGING_LIST && !PAGING_LIST.length" class="page-no-data_icon_mobile">
          <i-ding-empty status="data" text="暂无数据" />
        </div>
        <van-list v-model="load" :finished="!PAGING_MORE" finished-text="没有更多了" @load="onLoad">
          <div
            v-for="i in PAGING_LIST"
            :key="i.id"
            :class="$style.newsItemWarpper"
            @click="onGoDetails(i.id)"
          >
            <i-news-item
              :newsImg="i.cover"
              :newsTitle="i.title"
              :newsTime="i.publishTime"
              :newsViewCount="i.counter"
            />
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { List, PullRefresh } from 'vant';
import DingEmpty from '@/components/ding-empty/ding-empty-mobile';

import newsPng from '@/assets/news-mobile.png';
import businessPng from '@/assets/business-mobile.jpg';
import libraryPng from '@/assets/library-mobile.png';
import { GetNewsList } from './services/services';
import Paging from '@/mixins/paging/paging';

import NewsItem from '@/components/new-item/new-item-mobile';
import HeadImg from '@/components/head-img-mobile/head-img-mobile';

export default {
  name: 'News',
  components: {
    'i-news-item': NewsItem,
    'i-head-img': HeadImg,
    'i-ding-empty': DingEmpty,
    'van-list': List,
    'van-pull-refresh': PullRefresh,
  },
  mixins: [Paging],
  data() {
    return {
      TopImg: '',
      topText: '',
      load: false,
      // 1新闻 2事务指导 3 馆务动态
      type: 0,
    };
  },
  created() {
    if (this.$route.path === '/news') {
      this.type = 1;
      this.TopImg = newsPng;
      this.topText = '校庆新闻';
    } else if (this.$route.path === '/business-guide') {
      this.type = 2;
      this.TopImg = businessPng;
      this.topText = '事务指导';
    } else {
      this.type = 3;
      this.TopImg = libraryPng;
      this.topText = '馆务动态';
    }
  },
  methods: {
    /**
     * 请求页面数据方法
     */
    GET_PAGING(val) {
      this.PAGING_PARAMS = {
        type: this.type,
      };
      return GetNewsList(val);
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
        type: this.type,
      };
      this.GET_PAGING_NEXT(false).then((l) => {
        this.load = l;
      });
    },
    onGoDetails(id) {
      if (this.type === 1) {
        this.$router.push(`/news-details/${id}`);
      } else if (this.type === 2) {
        this.$router.push(`/business-details/${id}`);
      } else if (this.type === 3) {
        this.$router.push(`/library-details/${id}`);
      }
    },
  },
};
</script>

<style lang="less" module>
@import '~vant/lib/style/var.less';
@import '~@scf/ding-style-less/var.less';

.newsItemWarpper {
  margin: 0 @padding-content 10px @padding-content;
  border-radius: @border-radius;
  overflow: hidden;
}
</style>
