<template>
  <div :class="$style.box" :style="{ width: width + 'px' }" @click="onClickBox">
    <img v-lazy="icon" width="100%" alt="图片" />
    <i-modal :visible="visible" @cancel="onCancelModal">
      需到档案馆核实身份信息后再进行查询，谢谢。
    </i-modal>
  </div>
</template>

<script>
import Modal from '@/components/modal/modal-pc';

export default {
  name: 'IconBox',
  components: {
    'i-modal': Modal,
  },
  props: {
    icon: {
      type: String,
      default: () => '',
    },
    route: {
      type: String,
      default: () => '',
    },
    width: {
      type: Number,
      default: () => 490,
    },
    canCheckGrade: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    onClickBox() {
      // 不能查看成绩且route为'/grade'的元素点击事件
      if (!this.canCheckGrade && this.route === '/grade') {
        this.visible = true;
        return;
      }
      this.$router.push(this.route);
    },
    onCancelModal() {
      this.visible = false;
      console.log('aaaa', this.visible);
    },
  },
};
</script>

<style lang="less" module>
@import '~vant/lib/style/var.less';
@import '~@scf/ding-style-less/var.less';

.box {
  cursor: pointer;
  height: 188px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  margin-top: 20px;
}
</style>
