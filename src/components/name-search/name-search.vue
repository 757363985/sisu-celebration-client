<template>
  <div>
    <input v-model="name" :class="$style.input" placeholder="请输入姓名" />
    <van-button block :class="$style.btn" @click="onClickSearch">查询</van-button>
  </div>
</template>

<script>
import { Button, Toast } from 'vant';
export default {
  name: 'Name',
  components: {
    'van-button': Button,
  },
  data() {
    return {
      name: '',
    };
  },
  methods: {
    onClickSearch() {
      if (!this.name) {
        Toast.fail({ message: '请输入名字' });
        return;
      }
      this.$emit('search', this.name.trim());
    },
  },
};
</script>

<style lang="less" module>
.input {
  width: 100%;
  height: 120px;
  font-size: 32px;
  background-color: #f1e5c5;
  border: none;
  outline: none;
  margin-top: 80px;
  border-radius: 10px;
  padding: 0 33px;
  color: rgba(132, 77, 45, 0.6);
}
input::placeholder {
  color: rgba(132, 77, 45, 0.6);
  font-size: 32px;
}
.btn {
  background-color: #844d2d;
  border-radius: 10px;
  height: 120px;
  font-size: 32px;
  margin-top: 60px;
  color: #ffffdc;
}
</style>
