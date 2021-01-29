<template>
  <div :class="$style.page">
    <div :class="$style.image" />
    <div :class="$style.mapContent">
      <div :class="$style.map" />
    </div>
  </div>
</template>

<script></script>

<style lang="less" module>
.page {
  padding: 40px;
  .image {
    width: 100%;
    height: 280px;
    background-image: url(../../assets/map/map.png);
    background-size: cover;
    background-repeat: no-repeat;
  }
  .mapContent {
    width: 100%;
    padding: 40px 30px;
    margin-top: 30px;
    background-color: #f1e5c5;
    border-radius: 10px;
    overflow: hidden;
    .map {
      width: 100%;
      height: 711px;
      background-image: url(../../assets/map/school-map.png);
      background-size: cover;
      background-repeat: no-repeat;
    }
  }
}
</style>
