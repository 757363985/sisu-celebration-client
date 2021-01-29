<template>
  <div :class="$style.notice">
    <van-icon :size="36" :class="$style.icon" name="warning" />
    <span>{{ text }}</span>
  </div>
</template>

<script>
import { Icon } from 'vant';

export default {
  name: 'Notice',
  components: {
    'van-icon': Icon,
  },
  props: {
    text: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="less" module>
@import '~vant/lib/style/var.less';
@import '~@scf/ding-style-less/var.less';

.notice {
  width: 100%;
  height: 100px;
  color: #844d2d;
  background-color: #f1e5c5;
  padding-left: 40px;
  font-size: 32px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;
  .icon {
    margin-right: 20px;
  }
}
</style>
