<template>
  <div :class="$style.about">About page.</div>
</template>

<script>
export default {
  name: 'Aboud',
};
</script>

<style lang="less" module>
@import '~vant/lib/style/var.less';
@import '~@scf/ding-style-less/var.less';

.about {
  padding: 0 @padding-content;
  color: @green;
}
</style>
