<template>
  <div :class="$style.fileWarpper">
    <router-link
      to="/collection"
      :class="$style.itemWarpper"
      :style="{ backgroundImage: `url(${collectionCover})` }"
    ></router-link>
    <router-link
      to="/media-resources"
      :class="$style.itemWarpper"
      :style="{ backgroundImage: `url(${mediaCover})` }"
    ></router-link>

    <div :class="$style.remindText">
      请广大校友积极向学校档案馆提供你的档案资料，为你提供更好的校友服务！
    </div>
  </div>
</template>

<script>
import collectionCover from '@/assets/collectionCover-mobile.png';
import mediaCover from '@/assets/mediaCover-mobile.png';

export default {
  name: 'FileSolicitation',
  data() {
    return {
      collectionCover: collectionCover,
      mediaCover: mediaCover,
    };
  },
};
</script>

<style lang="less" module>
@import '~vant/lib/style/var.less';
@import '~@scf/ding-style-less/var.less';

.fileWarpper {
  margin: 0 @padding-content;
}

.itemWarpper {
  margin-top: @padding-content;
  border-radius: @border-radius;
  background-position: center;
  background-size: cover;
  height: 100px;
  display: block;
}

.remindText {
  font-size: 12px;
  line-height: 24px;
  color: @color-primary;
  text-align: center;
  width: calc(100% - 2 * @padding-content);
  position: fixed;
  bottom: 70px;
}
</style>
