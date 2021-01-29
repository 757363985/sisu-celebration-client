<template>
  <div :class="$style.content">
    <div :class="$style.banner" />
    <ul :class="$style.selectContent">
      <li
        v-for="i in selectList"
        :key="i.query"
        :style="{ backgroundImage: `url(${i.img})` }"
        :class="$style.select"
        @click="onClickSelect(i.query)"
      />
    </ul>
  </div>
</template>

<script>
import xiaoyuanfengjing from '@/assets/guangyinhuiyi/xiaoyuanfengjing.png';
import wentihuodong from '@/assets/guangyinhuiyi/wentihuodong.png';
import zhengwuhuodong from '@/assets/guangyinhuiyi/zhengwuhuodong.png';
import qitaliuying from '@/assets/guangyinhuiyi/qitaliuying.png';
import yiciqingchun from '@/assets/guangyinhuiyi/yiciqingchun.png';

const selectList = [
  {
    img: xiaoyuanfengjing,
    query: 2,
  },
  {
    img: wentihuodong,
    query: 4,
  },
  {
    img: zhengwuhuodong,
    query: 5,
  },
  {
    img: qitaliuying,
    query: 3,
  },
];

export default {
  name: 'ShadowSelect',
  data() {
    return {
      selectList,
      yiciqingchun,
    };
  },
  methods: {
    onClickSelect(i) {
      this.$router.push({
        path: 'shadow',
        query: { type: i },
      });
    },
  },
};
</script>

<style lang="less" module>
.content {
  padding: 30px 40px;
  .banner {
    width: 100%;
    height: 320px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    background-image: url(../../assets/guangyinhuiyi/yiciqingchun.png);
    border-radius: 10px;
  }
  .selectContent {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 40px;

    .select {
      cursor: pointer;
      width: 490px;
      height: 188px;
      background-size: cover;
      background-repeat: no-repeat;
      margin-bottom: 20px;
    }
  }
}
</style>
