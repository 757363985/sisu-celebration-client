<template>
  <div id="app" :class="$style.page">
    <img :src="QR_URL" :class="$style.QR" />

    <div :class="$style.text">请使用钉钉打开</div>
  </div>
</template>

<script>
export default {
  name: 'NotInClient',
  data() {
    return {
      QR_URL: `/api/v1/imageinfo/qrcode?content=${window.location.href}`,
    };
  },
};
</script>
<style lang="less" module>
@import '~vant/lib/style/var.less';
@import '~@scf/ding-style-less/var.less';

.page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.QR {
  display: block;
  // prettier-ignore
  width: 120PX;
  // prettier-ignore
  height: 120PX;
}

.text {
  text-align: center;
  // prettier-ignore
  font-size: 14PX;
  // prettier-ignore
  line-height: 24PX;
  color: @color-title;
  // prettier-ignore
  padding: 20PX 0;
}
</style>
