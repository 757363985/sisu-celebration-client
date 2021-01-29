<template>
  <div
    v-show="visible"
    :style="{
      zIndex: index,
    }"
    :class="$style.modalContent"
  >
    <div :class="$style.modal">
      <div :class="$style.title">{{ title }}</div>
      <div :class="$style.content">
        <slot />
      </div>
      <div :class="$style.bottom" @click.stop="onclickCancel">{{ cancelText }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'no-operation',
  props: {
    visible: {
      type: Boolean,
      default: () => false,
    },
    cancelText: {
      type: String,
      default: () => '取消',
    },
    title: {
      type: String,
      default: () => '提示',
    },
    index: {
      type: String,
      default: '100',
    },
  },
  methods: {
    onclickCancel() {
      this.$emit('cancel');
    },
  },
};
</script>

<style lang="less" module>
.modalContent {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .modal {
    width: 800px;
    background-color: #f1e5c5;
    border-radius: 10px;
    .title {
      text-align: center;
      font-size: 32px;
      line-height: 100px;
      color: #844d2d;
      border-bottom: 1px solid rgba(132, 77, 45, 0.2);
    }
    .content {
      min-height: 400px;
      border-bottom: 1px solid rgba(132, 77, 45, 0.2);
      font-size: 32px;
      color: #844d2d;
      word-wrap: break-word;
      padding: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .bottom {
      text-align: center;
      font-size: #844d2d;
      font-size: 32px;
      line-height: 100px;
      color: #844d2d;
    }
  }
}
</style>
