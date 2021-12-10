
import { Mutation/* , Action */ } from 'vuex';
import { StoreModuleType } from "@/utils/store";
import { TabNavItem, equalTabNavRoute } from '@/utils/routes';
import settings from '@/config/settings';
import router from '@/config/routes';
import { RouteLocationRaw } from 'vue-router';

export interface StateType {
  // 左侧展开收起
  collapsed: boolean;
  // 顶部菜单开启
  topNavEnable: boolean;
  // 头部固定开启
  headFixed: boolean;
  // tab菜单开启
  tabNavEnable: boolean;
  // 头部tab导航列表
  headTabNavList: TabNavItem[];
}

export interface ModuleType extends StoreModuleType<StateType> {
  state: StateType;
  mutations: {
    changeLayoutCollapsed: Mutation<StateType>;
    setTopNavEnable: Mutation<StateType>;
    setHeadFixed: Mutation<StateType>;
    setTabNavEnable: Mutation<StateType>;
    setHeadTabNavList: Mutation<StateType>;
    closeCurrentHeadTabNav: Mutation<StateType>;
  };
  actions: {
  };
}

const homeRoute = router.resolve(settings.homeRouteItem.path);

const initState: StateType = {
  collapsed: false,
  topNavEnable: settings.topNavEnable,
  headFixed: settings.headFixed,
  tabNavEnable: settings.tabNavEnable,
  headTabNavList: [
    {
      route: homeRoute,
      menu: settings.homeRouteItem
    }
  ]
};

const StoreModel: ModuleType = {
  namespaced: true,
  name: 'global',
  state: {
    ...initState
  },
  mutations: {
    changeLayoutCollapsed(state, payload) {
      state.collapsed = payload;
    },
    setTopNavEnable(state, payload) {
      state.topNavEnable = payload;
    },
    setHeadFixed(state, payload) {
      state.headFixed = payload;
    },
    setTabNavEnable(state, payload) {
      state.tabNavEnable = payload;
    },
    setHeadTabNavList(state, payload) {
      state.headTabNavList = payload;
    },
    /**
     * 关闭当前tabNav，并跳转自定义路由
     * @param state 
     * @param payload RouteLocationRaw 跳转路由参数，必须
     */
     closeCurrentHeadTabNav(state, payload: RouteLocationRaw) {
      const navList: TabNavItem[] =  state.headTabNavList.filter((item2: TabNavItem) => !equalTabNavRoute(router.currentRoute.value, item2.route, item2.menu.tabNavType))
      state.headTabNavList = [
        ...navList
      ]

      router.push(payload)
    },
  },
  actions: {}
}



export default StoreModel;
