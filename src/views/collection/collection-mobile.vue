<template>
  <div>
    <!-- <div :class="$style.headWrapper">
      <div :class="$style.newsTitle">{{ newsTitle }}</div>
      <div :class="$style.timeCount">
        <span :class="$style.time">{{ newsTime }}</span>
        <span :class="$style.count">浏览次数:&nbsp;{{ newsViewCount }}</span>
      </div>
    </div> -->
    <i-head-img :headImg="topImg" />

    <div :class="$style.content" v-html="content"></div>
  </div>
</template>

<script>
import { GetContent } from './services/services';
import collectionImg from '@/assets/collection-mobile.png';
import archivewsImg from '@/assets/archives-mobile.png';
import advicesImg from '@/assets/advice-mobile.png';

import HeadImg from '@/components/head-img-mobile/head-img-mobile';

export default {
  name: 'NewsDetail',
  components: {
    'i-head-img': HeadImg,
  },
  data() {
    return {
      content: '1',
      path: '',
      type: NaN,
      topImg: '',
    };
  },

  created() {
    this.path = this.$route.path;
    if (this.path === '/collection') {
      this.type = 3;
      this.topImg = collectionImg;
    } else if (this.path === '/archives') {
      this.type = 4;
      this.topImg = archivewsImg;
    } else {
      this.type = 2;
      this.topImg = advicesImg;
    }
  },
  mounted() {
    GetContent({ type: this.type }).then(({ data }) => {
      this.content = decodeURIComponent(data.content);
    });
  },
  methods: {},
};
</script>

<style lang="less" module>
@import '~vant/lib/style/var.less';
@import '~@scf/ding-style-less/var.less';

.headWrapper {
  margin: @padding-content;
  padding: 10px @padding-content;
  border-radius: @border-radius;
  background: #f1e5c5;
  color: #844d2d;
}

.newsTitle {
  font-size: 14px;
  font-weight: bold;
  line-height: 24px;
  height: 48px;
  overflow: hidden;
}

.timeCount {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}

.content {
  background: #f1e5c5;
  margin: 0 @padding-content @padding-content @padding-content;
  padding: @padding-content;
  max-width: calc(100% - 2 * @padding-content);
  overflow: hidden;
}
</style>
