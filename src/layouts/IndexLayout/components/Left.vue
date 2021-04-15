<template>
    <div id="indexlayout-left" :class="{'narrow': collapsed}">
        <div class="indexlayout-left-logo">
            <router-link to="/" class="logo-url">
                <img v-if="collapsed" alt="Vue logo" src="../../../assets/images/logo.png" width="30">
                <h3 v-else class="logo-title">AdminElementVue</h3>
            </router-link>
        </div>
        <div class="indexlayout-left-menu">
            <sider-menu
              :collapsed="collapsed"
              :topNavEnable="topNavEnable"
              :belongTopMenu="belongTopMenu"
              :defaultActive="defaultActive"
              :menuData="menuData"
            >
            </sider-menu>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType} from "vue";
import { RoutesDataItem } from '@/utils/routes';
import SiderMenu from './SiderMenu.vue';
export default defineComponent({
    name: 'Left',
    props: {
      collapsed: {
        type: Boolean,
        default: false
      },
      topNavEnable: {
        type: Boolean,
        default: true
      },
      belongTopMenu: {
        type: String,
        default: ''
      },
      defaultActive: {
          type: String,
          default: ''
      },
      menuData: {
        type: Array as PropType<RoutesDataItem[]>,
        default: () => {
          return [];
        }
      }
    },
    components: {   
        SiderMenu,   
    },
})
</script>
<style lang="scss" scoped>
@import '../../../assets/css/global.scss';
#indexlayout-left {
  display: flex;
  flex-direction: column;
  width: $leftSideBarWidth;
  height: 100vh;
  background-color: $menu-dark-bg;
  color: #c0c4cc;
  transition-duration: 0.1s;
  .indexlayout-left-logo {
    width: 100%;
    height: $headerHeight;
    line-height: $headerHeight;
    text-align: center;
    vertical-align: middle;
    .logo-url {
      display: inline-block;
      width: 100%;
      height: 100%;
      overflow: hidden;
      .logo-title {
        display: inline-block;
        margin: 0;
        font-size: 16px;
        font-family: Roboto, sans-serif;
        color: #c0c4cc;
      }
    }
    img {
      vertical-align: middle;
    }
  }


  .indexlayout-left-menu {
    flex: 1;
    overflow: hidden auto;
    // height: calc(100vh);

    .left-scrollbar {
      width: 100%;
      height: 100%;
    }
  }

  &.narrow {
    width: $menu-collapsed-width;
  }

  @include scrollbar;

}
</style>