<template>
  <div :class="$style.photoWarpper">
    <img v-lazy="`${photoImg}`" :class="$style.photoImg" alt="photo" />
    <div :class="$style.photoTitle">{{ photoTitle }}</div>
    <div v-if="type === 1" :class="$style.photoes">{{ photoCount }}张回忆</div>
  </div>
</template>

<script>
export default {
  name: 'phoneItem',
  props: {
    /**
     * 顶部图片及文字展示
     * @filed {string} photoImg 图片链接
     * @filed {string} photoTitle 标题
     * @filed {number} photoCount 图片数量
     * @filed {0 | 1}  type 0毕业留影 1光影回忆 默认为0
     * */
    photoImg: {
      type: String,
      required: true,
      default: '',
    },
    photoTitle: {
      type: String,
      default: '',
      required: true,
    },
    photoCount: {
      type: Number,
      default: 0,
    },
    type: {
      type: Number,
      default: 0,
    },
  },
  methods: {},
};
</script>

<style lang="less" module>
@import '~vant/lib/style/var.less';
@import '~@scf/ding-style-less/var.less';

.photoWarpper {
  border-radius: @border-radius;
  background: #f1e5c5;
  width: 100%;
  padding-bottom: 6px;
  overflow: hidden;
}

.photoImg {
  width: 100%;
  height: 164px;
}

.photoTitle {
  color: #844d2d;
  font-size: 12px;
  line-height: 18px;
  font-weight: bold;
  margin: 10px 0 6px 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.photoes {
  color: #844d2d;
  font-size: 10px;
  margin: 0 0 0 10px;
}
</style>
