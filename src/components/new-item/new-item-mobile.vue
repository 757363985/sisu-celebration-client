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
  padding: @padding-content;
  background: #f1e5c5;
  display: flex;
}

.newsImg {
  width: 120px;
  height: 80px;
  border-radius: @border-radius;
}

.info {
  margin-left: 10px;
  vertical-align: top;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.newsTitle {
  color: #844d2d;
  font-size: 14px;
  line-height: 20px;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

.newsTimeViewCount {
  font-size: 12px;
  color: rgba(132, 77, 45, 0.8);
  line-height: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
