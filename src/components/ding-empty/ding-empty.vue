<template>
  <div :class="$style.scf_empty">
    <img :class="$style.scf_empty_img" :src="imageURL" />

    <p :class="$style.scf_empty_txt">{{ description }}</p>

    <p v-if="this.status === '404' && backLink !== ''">
      <router-link :to="backLink" :class="$style.scf_empty_back_link">返回</router-link>
    </p>

    <slot />
  </div>
</template>

<script>
import IMG_404 from './img/404.png';
import IMG_403 from './img/403.png';
import IMG_DATA from './img/data.png';

/** 默认页面文字描述 */
const DEFAULT_TEXTS = {
  data: '无数据',
  404: '访问的页面不存在',
  403: '无权访问',
};

/** 默认页面图片地址 */
const DEFAULT_IMGS = {
  data: IMG_DATA,
  404: IMG_404,
  403: IMG_403,
};

export default {
  name: 'Ding404',
  props: {
    /**
     * 组件状态 'data'|'404'|'403'
     */
    status: {
      type: String,
      default: 'data',
    },

    /**
     * 自定义页面图片
     */
    image: {
      type: String,
      default: '',
    },

    /**
     * 页面文字描述
     */
    text: {
      type: String,
      default: '',
    },

    /**
     * 404 状态返回页面的路由路径
     */
    backLink: {
      type: String,
      default: '',
    },

    /**
     * 是否全屏
     */
    fullPage: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    /** 页面文字描述 */
    description: function () {
      if (this.text !== '') {
        return this.text;
      }

      return DEFAULT_TEXTS[this.status] || '';
    },

    /** 页面提示图片地址 */
    imageURL: function () {
      if (this.image) {
        return this.image;
      }

      return DEFAULT_IMGS[this.status] || '';
    },
  },
};
</script>

<style lang="less" module>
@import '~@scf/ding-style-less/var.less';

.scf_empty {
  text-align: center;
  padding: @padding-content 0;
}

.scf_empty_img {
  display: block;
  width: 124px;
  height: 124px;
  margin: 0 auto;
}

.scf_empty_txt {
  font-size: 26px;
  color: @color-primary;
  padding: @padding-content;
  line-height: 20px;
}

.scf_empty_back_link {
  color: @color-primary;
  text-decoration: none;
}
</style>
