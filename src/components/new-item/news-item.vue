<template>
  <div :class="$style.newsItemWarpper">
    <img :class="$style.newsImg" :src="newsImg" alt="" />
    <div :class="$style.info">
      <div :class="$style.newsTitle">
        {{ newsTitle || '' }}
      </div>
      <div :class="$style.newsTimeViewCount">
        <div :class="$style.newsTime">{{ newsTime || '' }}</div>
        <div :class="$style.newsViewCount || ''">浏览次数:&nbsp; {{ newsViewCount || 0 }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewsItem',
  props: {
    /**
     * 顶部图片及文字展示
     * @filed {string} newsImg 图片链接
     * @filed {string} newsTitle 新闻标题
     * @filed {string} newsTime 新闻时间
     * @filed {number} newsViewCount 新闻浏览量
     * */
    newsImg: {
      type: String,
      required: true,
      default: '',
    },
    newsTitle: {
      type: String,
      required: true,
      default: '',
    },
    newsTime: {
      type: String,
      required: true,
      default: '',
    },
    newsViewCount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  methods: {},
};
</script>

<style lang="less" module>
@import '~vant/lib/style/var.less';
@import '~@scf/ding-style-less/var.less';

.newsItemWarpper {
  width: 100%;
  padding: 40px;
  background: #f1e5c5;
  display: flex;
}

.newsImg {
  width: 400px;
  height: 240px;
  border-radius: @border-radius;
}

.info {
  margin-left: 30px;
  vertical-align: top;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.newsTitle {
  color: #844d2d;
  font-size: 36px;
  line-height: 50px;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
}

.newsTimeViewCount {
  font-size: 32px;
  color: rgba(132, 77, 45, 0.8);
  line-height: 32px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
