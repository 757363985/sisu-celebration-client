<template>
  <div>
    <i-notice text="请使用证件照片，上传照片将作为人脸底库数据" />
    <ul class="list">
      <li class="list-item">
        <a @click="jumpRouter('/user-bind')">用户信息绑定</a>
      </li>
      <li class="list-item">
        <a @click="jumpRouter('/personal-information')">个人信息完善</a>
      </li>
      <li class="list-item">
        <a @click="jumpRouter('/media-resources')">媒体资源征集</a>
      </li>
      <li class="list-item">
        <a @click="jumpRouter('/shadow')">光影回忆</a>
      </li>
      <li class="list-item">
        <a @click="jumpRouter('/graduation-photo')">毕业留影</a>
      </li>
      <li class="list-item">
        <a @click="jumpRouter('/file-solicitation')">档案征集</a>
      </li>
      <li class="list-item">
        <a @click="jumpRouter('/consulting-service')">服务咨询</a>
      </li>
      <li class="list-item">
        <a @click="jumpRouter('/news')">校庆新闻</a>
      </li>
      <li class="list-item">
        <a @click="jumpRouter('/business-guide')">业务指导</a>
      </li>
      <li class="list-item">
        <a @click="jumpRouter('/library')">馆务动态</a>
      </li>
      <li class="list-item">
        <a @click="jumpRouter('/collection')">实物征集</a>
      </li>
      <li class="list-item">
        <a @click="jumpRouter('/advice')">服务咨询</a>
      </li>
      <li class="list-item">
        <a @click="jumpRouter('/history')">历史</a>
      </li>
      <li class="list-item">
        <a @click="jumpRouter('/archives')">档案馆简介</a>
      </li>
      <li class="list-item">
        <a @click="jumpRouter('/cunzhao-content')">我的寸照</a>
      </li>
    </ul>
  </div>
</template>

<script>
import Notice from '@/components/notice/notice-mobile';

export default {
  name: 'GraduationPhoto',
  components: {
    'i-notice': Notice,
  },
  methods: {
    jumpRouter(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style lang="less" scoped>
@import '~vant/lib/style/var.less';
@import '~@scf/ding-style-less/var.less';
.list {
  padding: 20px;
  .list-item {
    margin: 10px 0;
    a {
      color: blue;
      cursor: pointer;
    }
  }
}
</style>
