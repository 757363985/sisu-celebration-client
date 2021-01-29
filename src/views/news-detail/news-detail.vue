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
  margin: 30px 40px;
  padding: 40px 30px;
  border-radius: 10px;
  background: #f1e5c5;
  color: #844d2d;
}

.newsTitle {
  font-size: 42px;
  font-weight: bold;
  line-height: 60px;
  height: 120px;
  overflow: hidden;
}

.timeCount {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}

.time,
.count {
  font-size: 32px;
  line-height: 32px;
}

.content {
  background: #f1e5c5;
  margin: 0 40px 40px 40px;
  padding: 40px 30px;
  max-width: calc(100% - 80px);
  overflow: hidden;
  border-radius: 10px;
  font-size: 32px;
}
</style>
