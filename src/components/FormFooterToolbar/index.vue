<script lang="ts">
/**
 * 表单页面 底部
 * @author LiQingSong
 *
 * */
import { defineComponent } from "vue";
export default defineComponent({
  name: 'FormFooterToolbar'
})
</script>
<template>
  <div class="form-footer-toolbar">
    <slot></slot>
  </div>
</template>
<style lang="scss" scoped>
.form-footer-toolbar {
  position: fixed;
  padding: 0 24px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  height: 56px;
  line-height: 56px;
  /* background: #fff; */
  border-top: 1px solid #f0f0f0;
  box-shadow: 0 3px 6px -4px rgba(0,0,0,.12), 0 6px 16px 0 rgba(0,0,0,.08), 0 9px 28px 8px rgba(0,0,0,.05);
  transition-duration: 0.1s;
  z-index: 1;
  text-align: right;
}
</style>
