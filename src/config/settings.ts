import { RoutesDataItem } from "@/utils/routes";

export type Theme = 'dark' | 'light';

export type NavMode = 'vertical' | 'horizontal';

/**
 * 站点配置
 * @author LiQingSong
 */
export interface SettingsType {
    /**
     * 站点名称
     */
    siteTitle: string;
  
    /**
     * 站点首页路由
     */
    homeRouteItem: RoutesDataItem;
  
    /**
     * 站点本地存储Token 的 Key值
     */
    siteTokenKey: string;
  
    /**
     * Ajax请求头发送Token 的 Key值
     */
    ajaxHeadersTokenKey: string;
  
    /**
     * Ajax返回值不参加统一验证的api地址
     */
    ajaxResponseNoVerifyUrl: string[];

    /**
     * iconfont.cn 项目在线生成的 js 地址
     */
    iconfontUrl: string[];

    /**
     * Layout 头部固定开启
     */
     headFixed: boolean;

     /**
      * Layout tab菜单开启
      */
     tabNavEnable: boolean;
 
     /**
      * IndexLayout 顶部菜单开启
      */
     topNavEnable: boolean;
 
     /**
      * UniversalLayout 模板主题
      */
     theme: Theme;
 
     /**
       * UniversalLayout 导航模式
       */
     navMode: NavMode;
 
     /**
      * UniversalLayout 左侧侧边固定开启
      */
     leftSiderFixed: boolean;
}
  
const settings: SettingsType = {
    siteTitle: 'ADMIN-ELEMENT-VUE',
    homeRouteItem: {
        icon: 'control',
        title: 'index-layout.menu.home.workplace',
        path: '/home/workplace',
        component: ()=> import('@/views/home/index.vue')
    },
    siteTokenKey: 'admin_element_vue_token',
    ajaxHeadersTokenKey: 'x-token',
    ajaxResponseNoVerifyUrl: [
        '/user/login', // 用户登录
        '/user/info', // 获取用户信息
    ],
    iconfontUrl: [],

    /* 以下是针对所有 Layout 扩展字段 */
    headFixed: true,
    tabNavEnable: true,

    /* 以下是针对 IndexLayout 扩展字段 */
    topNavEnable: true,

    /* 以下是针对 UniversalLayout 扩展字段 */
    theme: 'light',
    navMode: 'vertical',
    leftSiderFixed: true,
};

export default settings;
  