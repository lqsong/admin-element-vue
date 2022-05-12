<template>
  <div id="universallayout-left" :class="{'narrow': collapsed, 'fiexd': leftSiderFixed}">
    <div class="universallayout-left-sider">
      <div class="universallayout-left-logo">
          <router-link to="/" class="logo-url">
              <img v-if="collapsed" alt="" src="../../../assets/images/logo.png" width="30">
              <h3 v-else class="logo-title">AdminElementVue</h3>
          </router-link>
      </div>
      <div class="universallayout-left-menu">
          <sider-menu
            :menu-data="menuData"
            :route-item="routeItem"
            :collapsed="collapsed">
          </sider-menu>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { withDefaults, defineProps, computed, toRefs } from "vue"
import { useStore } from "vuex"
import { StateType as GlobalStateType } from '@/store/global'
import { RoutesDataItem } from '@/utils/routes'
import SiderMenu from "./SiderMenu.vue"

interface Props {
  menuData: RoutesDataItem[];
  routeItem: RoutesDataItem;
}

const props = withDefaults(defineProps<Props>(), {})
const { menuData, routeItem } = toRefs(props)

const store = useStore<{global: GlobalStateType;}>()

// 左侧展开收起
const collapsed = computed(()=> store.state.global.collapsed)

// 左侧侧边固定开启
const leftSiderFixed = computed(()=> store.state.global.leftSiderFixed)

</script>
