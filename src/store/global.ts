
import { Mutation/* , Action */ } from 'vuex';
import { StoreModuleType } from "@/utils/store";
import { TabNavItem, equalTabNavRoute } from '@/utils/routes';
import settings, { Theme, NavMode } from '@/config/settings';
import router from '@/config/routes';
import { RouteLocationRaw } from 'vue-router';

export interface StateType {
  /* 以下是针对所有 Layout 扩展字段 */
  // 左侧展开收起
  collapsed: boolean;
  // 头部固定开启
  headFixed: boolean;
  // tab菜单开启
  tabNavEnable: boolean;
  // 头部tab导航列表
  headTabNavList: TabNavItem[];

  /* 以下是针对 IndexLayout 扩展字段 */
  // 顶部菜单开启
  topNavEnable: boolean;

  /* 以下是针对 UniversalLayout 扩展字段 */
  // 模板主题
  theme: Theme;
  // 头部固定开启
  navMode: NavMode;
  // 左侧侧边固定开启
  leftSiderFixed: boolean;
}

export interface ModuleType extends StoreModuleType<StateType> {
  state: StateType;
  mutations: {
    changeLayoutCollapsed: Mutation<StateType>;
    setHeadFixed: Mutation<StateType>;
    setTabNavEnable: Mutation<StateType>;
    setHeadTabNavList: Mutation<StateType>;
    closeCurrentHeadTabNav: Mutation<StateType>;
    setTopNavEnable: Mutation<StateType>;
    setTheme: Mutation<StateType>;
    setNavMode: Mutation<StateType>;
    setLeftSiderFixed: Mutation<StateType>;
  };
  actions: {
  };
}

const homeRoute = router.resolve(settings.homeRouteItem.path);

const initState: StateType = {
  collapsed: false,
  headFixed: settings.headFixed,
  tabNavEnable: settings.tabNavEnable,
  headTabNavList: [
    {
      route: homeRoute,
      menu: settings.homeRouteItem
    }
  ],
  topNavEnable: settings.topNavEnable,
  theme: settings.theme,
  navMode: settings.navMode,
  leftSiderFixed: settings.leftSiderFixed,
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
    setTopNavEnable(state, payload) {
      state.topNavEnable = payload;
    },
    setTheme(state, payload) {
      state.theme = payload;
    },
    setNavMode(state, payload) {
      state.navMode = payload;
    },
    setLeftSiderFixed(state, payload) {
      state.leftSiderFixed = payload;
    },
  },
  actions: {}
}



export default StoreModel;
