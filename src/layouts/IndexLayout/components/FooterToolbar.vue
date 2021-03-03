<template>
    <div class="indexlayout-footer-toolbar" :class="{narrow: collapsed }">
        <slot></slot>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import { StateType as GlobalStateType } from '@/store/global';

interface FooterToolbarSetupData {
    collapsed: boolean;
}

export default defineComponent({
    name: 'FooterToolbar',
    setup(): FooterToolbarSetupData {
        const store = useStore<{global: GlobalStateType}>(); 

        const collapsed = computed<boolean>(() => store.state.global.collapsed);

        return {
            collapsed: collapsed as unknown as boolean
        }

    }
})
</script>
<style lang="scss" scoped>
@import '../../../assets/css/global.scss';
.indexlayout-footer-toolbar {
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
  box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.03);
  transition-duration: 0.1s;
  &.narrow {
    left: $menu-collapsed-width;
  }
}
</style>