<template>
    <div id="universallayout" :class="{'light': theme === 'light'}">
      <left-sider
        v-if="navMode==='vertical'"
        :menu-data="menuData"
        :route-item="routeItem">
      </left-sider>
      <div id="universallayout-right">
        <right-top
         :menu-data="menuData"
         :route-item="routeItem"
         :bread-crumbs="breadCrumbs">
        </right-top>
        <div id="universallayout-right-main">
          <permission :roles="routeItem.roles">
            <router-view></router-view>
          </permission>
          <right-footer></right-footer>
        </div>
      </div>
    </div>
</template>
<script lang="ts" setup>
import { computed } from "vue"
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { StateType as GlobalStateType } from '@/store/global'
import { RoutesDataItem, BreadcrumbType, PathJsonRoutesDataItem, vueRoutes, jsonPathVueRoutes, getJsonRouteItem, getBreadcrumbRoutes } from '@/utils/routes'
import useTitle from '@/composables/useTitle'
import Permission from '@/components/Permission/index.vue'
import LeftSider from "./components/LeftSider.vue"
import RightTop from './components/RightTop.vue'
import RightFooter from './components/RightFooter.vue'
import LayoutRoutes from './routes'


const store = useStore<{global: GlobalStateType;}>()
const route = useRoute()

// 模板主题
const theme = computed(()=> store.state.global.theme)

// 导航模式
const navMode = computed(()=> store.state.global.navMode)

// 框架所有菜单路由
const menuData: RoutesDataItem[] = vueRoutes(LayoutRoutes)

// 框架所有的路由转成json并统一添加了parentPath
const jsonPathRoutes: PathJsonRoutesDataItem = jsonPathVueRoutes(menuData)

// 当前路由 item
const routeItem = computed<RoutesDataItem>(()=> getJsonRouteItem(route.path, jsonPathRoutes))

// 面包屑导航
const breadCrumbs = computed<BreadcrumbType[]>(() => getBreadcrumbRoutes(route.path, jsonPathRoutes))

// 设置title
useTitle(routeItem);

</script>
<style lang="scss">
@import './css/index.scss';
</style>
