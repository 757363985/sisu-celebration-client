<template>
  <div>
    <i-head-img :headImg="TopImg" :headText="topText" />

    <div :class="$style.content" v-html="newsContent"></div>
  </div>
</template>

<script>
import HeadImg from '@/components/head-img-mobile/head-img';
import TopImg from '@/assets/school-intro.png';
import { GetContent } from './services/services';

export default {
  name: 'GraduationPhoto',
  components: {
    'i-head-img': HeadImg,
  },
  data() {
    return {
      TopImg: TopImg,
      topText: '学校简介',
      newsContent: '',
    };
  },
  mounted() {
    GetContent({ type: 1 }).then(({ data }) => {
      this.newsContent = decodeURIComponent(data.content);
    });
  },
};
</script>

<style lang="less" module>
@import '~vant/lib/style/var.less';
@import '~@scf/ding-style-less/var.less';

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
