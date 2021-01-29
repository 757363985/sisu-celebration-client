<template>
  <div :class="$style.notice">
    <van-icon :size="20" :class="$style.icon" name="warning" />
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
  height: 40px;
  color: #844d2d;
  background-color: #f1e5c5;
  padding-left: 15px;
  font-size: 12px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 4px;
  .icon {
    margin-right: 7px;
  }
}
</style>
