<template>
    <div class="form-footer-toolbar" :class="{'narrow': isCollapse}">
        <slot></slot>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    name: 'FormFooterToolbar',
    computed: {
        ...mapGetters([
          'sidebarOpened'
        ]),
        isCollapse() {
            return !this.sidebarOpened;
        }
    }
};
</script>
<style lang="scss" scoped>
@import "~@/assets/css/variables.scss";
.form-footer-toolbar {
  position: fixed;
  padding: 0 24px;
  left: $leftSideBarWidth;
  right: 0;
  bottom: 0;
  z-index: 99;
  height: 56px;
  line-height: 56px;
  background: #fff;
  border-top: 1px solid #f0f0f0;
  box-shadow: 0 -1px 2px rgba(0,0,0,.03);
  transition-duration: 0.1s;
  &.narrow{
      left: $leftSideBarMinWidth;      
  }
}
</style>