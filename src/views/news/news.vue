<template>
  <div>
    <i-head-img :headImg="TopImg" :headText="topText" />

    <div :class="$style.newsListWarpperPc">
      <van-pull-refresh v-model="PAGING_LOADING" @refresh="onRefresh">
        <div v-if="PAGING_LIST && !PAGING_LIST.length" class="page-no-data_icon">
          <i-ding-empty status="data" text="暂无数据" />
        </div>

        <van-list v-model="load" :finished="!PAGING_MORE" finished-text="没有更多了" @load="onLoad">
          <div
            v-for="i in PAGING_LIST"
            :key="i.id"
            :class="$style.newsItemWarpper"
            @click="onGoNewsDetails(i.id)"
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
import DingEmpty from '@/components/ding-empty/ding-empty';

import newsPng from '@/assets/news.png';
import { GetNewsList } from './services/services';
import Paging from '@/mixins/paging/paging';

import NewsItem from '@/components/new-item/news-item';
import HeadImg from '@/components/head-img-mobile/head-img';

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
      TopImg: newsPng,
      topText: '校庆新闻',
      load: false,
    };
  },
  methods: {
    /**
     * 请求页面数据方法
     */
    GET_PAGING(val) {
      this.PAGING_PARAMS = {
        type: 1,
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
        type: 1,
      };
      this.GET_PAGING_NEXT(false).then((l) => {
        this.load = l;
      });
    },
    /**
     * 点击前往新闻详情业
     * */
    onGoNewsDetails(id) {
      this.$router.push(`/news-details/${id}`);
    },
  },
};
</script>

<style lang="less" module>
@import '~vant/lib/style/var.less';
@import '~@scf/ding-style-less/var.less';

.newsItemWarpper {
  margin: 0 40px 30px 40px;
  border-radius: @border-radius;
  overflow: hidden;
}

.newsListWarpperPc {
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
