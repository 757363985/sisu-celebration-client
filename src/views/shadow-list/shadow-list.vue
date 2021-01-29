<template>
  <div>
    <div :class="$style.headWarpper">
      <div :class="$style.headTitle">{{ photoesTitle }}</div>
      <div :class="$style.headCount">{{ PAGING_TOTALCOUNT || 0 }}张回忆</div>
    </div>

    <div :class="$style.pcPullrefresh">
      <van-pull-refresh v-model="PAGING_LOADING" @refresh="onRefresh">
        <div v-if="PAGING_LIST && !PAGING_LIST.length" class="page-no-data_icon">
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
  </div>
</template>

<script>
import { List, PullRefresh, ImagePreview } from 'vant';
import DingEmpty from '@/components/ding-empty/ding-empty';

import Paging from '@/mixins/paging/paging';
import { GetPhotoListPc } from './services/services';

export default {
  name: 'photoList',
  components: {
    'i-ding-empty': DingEmpty,
    'van-list': List,
    'van-pull-refresh': PullRefresh,
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
  border-radius: 10px;
  background: #f1e5c5;
  overflow: hidden;
  margin: 30px 40px;
  padding: 60px 40px 40px 40px;
}

.headTitle {
  color: #844d2d;
  font-size: 42px;
  font-weight: bold;
  text-align: center;
  height: 120px;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.headCount {
  color: #844d2d;
  font-size: 32px;
  line-height: 32px;
  text-align: center;
  margin-top: 30px;
}
.photoesWarpper {
  margin: 0 40px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.photo {
  width: 310px;
  height: 310px;
  border-radius: 10px;
  margin-right: 26px;
  margin-bottom: 30px;
}

.photo:nth-child(3n) {
  margin-right: 0;
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
