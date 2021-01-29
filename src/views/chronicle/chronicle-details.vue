<template>
  <div>
    <i-head-img :headImg="topImg" />
    <div :class="$style.contentWarpper">
      <div :class="$style.yearText">{{ year }}年大事记</div>
      <div :class="$style.content" v-html="chronicleContent"></div>
    </div>
  </div>
</template>

<script>
import HeadImg from '@/components/head-img-mobile/head-img';
import TopImg from '@/assets/big-event.png';
import { GetChronicleDetails } from './services/services';

export default {
  name: 'NewsDetail',
  components: {
    'i-head-img': HeadImg,
  },
  data() {
    return {
      chronicleId: NaN,
      year: NaN,
      topImg: TopImg,
      chronicleContent: '',
    };
  },
  created() {
    this.chronicleId = this.$route.params.id;
  },
  mounted() {
    GetChronicleDetails({ id: this.chronicleId }).then(({ data }) => {
      console.log(data);
      this.chronicleContent = data.description;
      this.year = data.year;
    });
  },
  methods: {},
};
</script>

<style lang="less" module>
@import '~vant/lib/style/var.less';
@import '~@scf/ding-style-less/var.less';

.contentWarpper {
  background: #f1e5c5;
  margin: 0 40px 40px 40px;
  padding: 40px 30px;
  max-width: calc(100% - 80px);
  overflow: hidden;
  border-radius: 10px;
  font-size: 32px;
}

.yearText {
  font-size: 42px;
  line-height: 42px;
  color: @color-primary;
  font-weight: bold;
}
.content {
  margin-top: 40px;
  color: @color-primary;
}
</style>
