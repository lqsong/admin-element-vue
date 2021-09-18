<template>
    <div id="indexlayout">
        <left
          :collapsed="collapsed"
          :topNavEnable="topNavEnable"
          :belongTopMenu="belongTopMenu"
          :defaultActive="defaultActive"
          :menuData="permissionMenuData"
        >
        </left>

        <div
          id="indexlayout-right"
          :class="{'fiexd-header': headFixed}"
        >

            <right-top
              :collapsed="collapsed"
              :tabNavEnable="tabNavEnable"
              :topNavEnable="topNavEnable"
              :belongTopMenu="belongTopMenu"
              :toggleCollapsed="toggleCollapsed"
              :breadCrumbs="breadCrumbs"
              :menuData="permissionMenuData"
              :routeItem="routeItem"
            >              
            </right-top>

            <div class="indexlayout-right-main">
                <permission :roles="routeItem.roles">
                  <router-view></router-view>
                </permission>
                <right-footer></right-footer>
            </div>

        </div>

        <settings></settings>

    </div>
</template>
<script lang="ts">
import { defineComponent, computed, ComputedRef } from "vue";
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { StateType as GlobalStateType } from '@/store/global';
import { StateType as UserStateType } from "@/store/user";
import { 
  vueRoutes, RoutesDataItem, getRouteItem, getSelectLeftMenuPath, 
  formatRoutePathTheParents, getRouteBelongTopMenu, getBreadcrumbRoutes, 
  BreadcrumbType, getPermissionMenuData
} from '@/utils/routes';
import useTitle from '@/composables/useTitle';
import IndexLayoutRoutes from './routes';
import Permission from '@/components/Permission/index.vue';
import Left from './components/Left.vue';
import RightTop from './components/RightTop.vue';
import RightFooter from './components/RightFooter.vue';
import Settings from "./components/Settings.vue";

interface IndexLayoutSetupData {
  collapsed: ComputedRef<boolean>;
  toggleCollapsed: () => void;
  tabNavEnable: ComputedRef<boolean>;
  topNavEnable: ComputedRef<boolean>;
  belongTopMenu: ComputedRef<string>;
  headFixed: ComputedRef<boolean>;
  defaultActive: ComputedRef<string>;
  breadCrumbs: ComputedRef<BreadcrumbType[]>;
  permissionMenuData: ComputedRef<RoutesDataItem[]>;
  routeItem: ComputedRef<RoutesDataItem>;
}

export default defineComponent({
    name: 'IndexLayout',
    components: {
        Permission,
        Left,
        RightTop,
        RightFooter,
        Settings
    },
    setup(): IndexLayoutSetupData {
        const store = useStore<{
            global: GlobalStateType;
            user: UserStateType;
        }>(); 
        const route = useRoute();


        // 所有菜单路由
        const menuData: RoutesDataItem[] = vueRoutes(IndexLayoutRoutes);      

        // 当前路由 item
        const routeItem = computed<RoutesDataItem>(()=> getRouteItem(route.path, menuData));

        // 有权限的菜单
        const permissionMenuData = computed<RoutesDataItem[]>(()=> getPermissionMenuData(store.state.user.currentUser.roles, menuData));

        // 当前路由的顶部菜单path
        const belongTopMenu = computed<string>(()=>getRouteBelongTopMenu(routeItem.value))

        // 当前路由的父路由path[]
        const routeParentPaths = computed<string[]>(()=>formatRoutePathTheParents(routeItem.value.path));

        // 收缩左侧
        const collapsed = computed<boolean>(()=> store.state.global.collapsed);
        const toggleCollapsed = (): void => {
          store.commit('global/changeLayoutCollapsed', !collapsed.value);
        }

        // 右侧顶部tabNav是否开启
        const tabNavEnable = computed<boolean>(()=> store.state.global.tabNavEnable);

        // 右侧顶部导航是否开启
        const topNavEnable = computed<boolean>(()=> store.state.global.topNavEnable);

        // 右侧顶部是否固定
        const headFixed = computed<boolean>(()=> store.state.global.headFixed);


        // 左侧选择的菜单
        const defaultActive = computed<string>(()=> getSelectLeftMenuPath(routeItem.value));


        // 面包屑导航
        const breadCrumbs = computed<BreadcrumbType[]>(() => getBreadcrumbRoutes(routeItem.value,routeParentPaths.value, menuData));

        // 设置title
        useTitle(routeItem);

        
        return {
          collapsed,
          toggleCollapsed,
          tabNavEnable,
          topNavEnable,
          belongTopMenu,
          headFixed, 
          defaultActive,
          breadCrumbs,
          permissionMenuData,
          routeItem
        }


    }
})
</script>
<style lang="scss">
@import '../../assets/css/variables.scss';
#indexlayout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}
#indexlayout-right {
  position: relative;
  flex: 1;
  overflow: auto;
  background-color: $mainBgColor;
  &.fiexd-header {
    display: flex;
    flex-direction: column;
    .indexlayout-right-main {
      flex: 1;
      overflow: auto;
    }
  }
}
.indexlayout-main-conent {
  margin: 24px;
  position: relative;
}
</style>