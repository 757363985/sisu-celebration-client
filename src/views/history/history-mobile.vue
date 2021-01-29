<template>
  <div>
    <i-head-img :headImg="topImg" />
    <div :class="$style.lineTimeWarpper">
      <i-time-line
        v-for="i in lines"
        :key="i.id"
        :coverImg="i.cover"
        :time="i.year"
        :historyText="i.description"
      />
    </div>
  </div>
</template>

<script>
import TimeLine from '@/components/time-line/time-line-mobile';
import HeadImg from '@/components/head-img-mobile/head-img-mobile';
import TopImg from '@/assets/history-mobile.png';

import { GetHistory } from './services/services';

export default {
  name: 'GraduationPhoto',
  components: {
    'i-time-line': TimeLine,
    'i-head-img': HeadImg,
  },
  data() {
    return {
      topImg: TopImg,
      lines: [],
    };
  },
  mounted() {
    GetHistory({ type: 1 }).then(({ data }) => {
      this.lines = data.sort((x, y) => x.year - y.year);
    });
  },
};
</script>

<style lang="less" module>
@import '~vant/lib/style/var.less';
@import '~@scf/ding-style-less/var.less';
.lineTimeWarpper {
  margin: 0 @padding-content;
}
</style>
