<template>
  <div>
    <div :class="$style.headWarpper">
      <div :class="$style.headTitle">{{ photoesTitle }}</div>
      <div :class="$style.headCount">{{ PAGING_TOTALCOUNT || 0 }}张回忆</div>
    </div>

    <van-pull-refresh v-model="PAGING_LOADING" @refresh="onRefresh">
      <div v-if="PAGING_LIST && !PAGING_LIST.length" class="page-no-data_icon_mobile">
        <i-ding-empty status="data" text="暂无数据" />
      </div>
      <van-list v-model="load" :finished="!PAGING_MORE" finished-text="没有更多了" @load="onLoad">
        <div :class="$style.photoesWarpper">
          <img
            v-for="(i, index) in PAGING_LIST"
            :key="i.id"
            :class="$style.photo"
            :src="i.photo"
            alt=""
            @click="onClickImg(index)"
          />
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { List, PullRefresh, ImagePreview } from 'vant';
import DingEmpty from '@/components/ding-empty/ding-empty-mobile';

import Paging from '@/mixins/paging/paging';
import { GetPhotoList } from './services/services';

export default {
  name: 'photoList',
  components: {
    'van-list': List,
    'van-pull-refresh': PullRefresh,
    'i-ding-empty': DingEmpty,
  },
  mixins: [Paging],
  data() {
    return {
      photoesId: this.$route.params.id,
      load: false,
      photoesTitle: this.$route.query.title,
    };
  },
  mounted() {},
  methods: {
    /**
     * 请求页面数据方法
     */
    GET_PAGING(val) {
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
        id: this.photoesId,
        size: 15,
      };
      this.GET_PAGING_NEXT(false).then((l) => {
        this.load = l;
      });
    },
    /**
     * 点击选择图片
     */
    onClickImg(index) {
      ImagePreview({
        images: this.PAGING_LIST.map((i) => i.photo),
        startPosition: index,
      });
    },
  },
};
</script>

<style lang="less" module>
@import '~vant/lib/style/var.less';
@import '~@scf/ding-style-less/var.less';

.headWarpper {
  border-radius: @border-radius;
  background: #f1e5c5;
  overflow: hidden;
  margin: @padding-content;
  padding: 10px @padding-content;
}

.headTitle {
  color: #844d2d;
  font-size: 14px;
  line-height: 24px;
  font-weight: bold;
  text-align: center;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.headCount {
  color: #844d2d;
  font-size: 12px;
  line-height: 24px;
  text-align: center;
  margin-top: 10px;
}
.photoesWarpper {
  margin: 0 @padding-content;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.photo {
  width: 104px;
  height: 104px;
  border-radius: @border-radius;
  margin-right: 14px;
  margin-bottom: @padding-content;
}

.photo:nth-child(3n) {
  margin-right: 0;
}
</style>
