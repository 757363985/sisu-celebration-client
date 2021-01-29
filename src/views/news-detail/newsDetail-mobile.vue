<template>
  <div>
    <div :class="$style.headWrapper">
      <div :class="$style.newsTitle">{{ newsTitle }}</div>
      <div :class="$style.timeCount">
        <span :class="$style.time">{{ newsTime }}</span>
        <span :class="$style.count">浏览次数:&nbsp;{{ newsViewCount }}</span>
      </div>
    </div>

    <div :class="$style.content" v-html="newsContent"></div>
  </div>
</template>

<script>
import { GetNewsDetails } from './services/services';

export default {
  name: 'NewsDetail',
  components: {},
  data() {
    return {
      newsId: NaN,
      newsTitle: '',
      newsTime: '',
      newsViewCount: 0,
      newsContent: '',
    };
  },
  created() {
    this.newsId = this.$route.params.id;
  },
  mounted() {
    GetNewsDetails({ id: this.newsId }).then(({ data }) => {
      this.newsTitle = data.title;
      this.newsContent = decodeURIComponent(data.content);
      this.newsTime = data.publishTime;
      this.newsViewCount = data.counter;
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
