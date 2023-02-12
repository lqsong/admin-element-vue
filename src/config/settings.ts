/**
 * @description: 站点配置
 * @author LiQingSong
 */
import {
	TAjaxHeadersTokenKey,
	TAjaxResponseNoVerifyUrl,
	THomePath,
	TMenuLayout,
	TMenuLayoutStorageKey,
	TMenuStyle,
	TMenuStyleStorageKey,
	TSiteTitle,
	TSiteTokenKey,
	TTheme,
	TThemeStorageKey,
} from "@/@types/config.settings.d";

/**
 * @description: 站点名称
 */
export const siteTitle: TSiteTitle = "Admin-Element-Vue";

/**
 * @description: 首页路由path
 */
export const homePath: THomePath = "/home";

/**
 * @description: 站点本地存储Token 的 Key值
 */
export const siteTokenKey: TSiteTokenKey = "admin-element-vue-token";

/**
 * @description: Ajax请求头发送Token 的 Key值
 */
export const ajaxHeadersTokenKey: TAjaxHeadersTokenKey = "x-token";

/**
 * @description: Ajax返回值不参加统一报错的api地址
 */
export const ajaxResponseNoVerifyUrl: TAjaxResponseNoVerifyUrl = ["/user/login", "/user/info"];

/**
 * @description: Layout 模板主题
 */
export const theme: TTheme = "light";

/**
 * @description: Layout 模板主题本地存储(localStorage)的key名称
 */
export const themeStorageKey: TThemeStorageKey = "admin-element-vue-theme";

/**
 * @description: Layout 菜单导航布局
 */
export const menuLayout: TMenuLayout = "vertical";

/**
 * @description: Layout 菜单导航布局本地存储(localStorage)的key名称
 */
export const menuLayoutStorageKey: TMenuLayoutStorageKey = "admin-element-vue-memu-layout";

/**
 * @description: Layout 菜单导航风格
 */
export const menuStyle: TMenuStyle = "dark";

/**
 * @description: Layout 菜单导航风格本地存储(localStorage)的key名称
 */
export const menuStyleStorageKey: TMenuStyleStorageKey = "admin-element-vue-memu-style";

/**
 * @description: Layout 是否启用多标签Tab页
 */
export const isTabsNav: boolean = true;

/**
 * @description: Layout 多标签Tab页白名单，不用在tabNav组件中显示的路由
 */
export const tabsNavWhiteList: string[] = ["/403", "/500"];

/**
 * @description: Layout 是否启用底部
 */
export const isLayoutFooter: boolean = true;
