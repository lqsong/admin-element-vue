/**
 * @description: 站点配置 ts定义
 * @author LiQingSong
 */

/**
 * @description: 站点名称
 */
export type TSiteTitle = string;

/**
 * @description: 首页路由Path
 */
export type THomePath = string;

/**
 * @description: 站点本地存储Token 的 Key值
 */
export type TSiteTokenKey = string;

/**
 * @description: Ajax请求头发送Token 的 Key值
 */
export type TAjaxHeadersTokenKey = string;

/**
 * @description: Ajax返回值不参加统一验证的api地址
 */
export type TAjaxResponseNoVerifyUrl = string[];

/**
 * @description: Layout 模板主题
 */
export type TTheme = "dark" | "light";

/**
 * @description: Layout 模板主题本地存储(localStorage)的key名称
 */
export type TThemeStorageKey = string;

/**
 * @description: Layout 菜单导航布局
 */
export type TMenuLayout = "vertical" | "horizontal";

/**
 * @description: Layout 菜单导航布局本地存储(localStorage)的key名称
 */
export type TMenuLayoutStorageKey = string;

/**
 * @description: Layout 菜单导航风格
 */
export type TMenuStyle = "dark" | "light";

/**
 * @description: Layout 菜单导航风格本地存储(localStorage)的key名称
 */
export type TMenuStyleStorageKey = string;
