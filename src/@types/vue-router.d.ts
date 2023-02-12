/**
 * @description: 扩展路由类型 ts定义
 * @author LiQingSong
 */
import { RouteRecordRaw } from "vue-router";
import "vue-router";

/**
 * @description: 面包屑类型
 */
export interface IBreadcrumb {
	// 标题，路由在菜单、浏览器title 或 面包屑中展示的文字
	title: string;
	// 路由地址或外链
	path: string;
}

/**
 * tab导航存储规则类型
 */
export type TTabNavType = "path" | "querypath";

/**
 * @description: 扩展 vue-router
 */
declare module "vue-router" {
	// 扩展meta字段 - Layout 可以根据以下参数做些定制化功能，如菜单栏
	interface RouteMeta {
		// 标题，路由在菜单、浏览器title 或 面包屑中展示的文字
		title?: string;
		// 图标的名称，显示在菜单标题前
		icon?: string;
		// 所有父元素的path,下标key按照父元素的顺序，若不设置则根据路由自动生成
		parentPath?: string[];
		/**
		 * 左侧菜单选中，如果设置路径，侧栏将突出显示你设置的路径对应的侧栏导航
		 *   1、（默认 route.path），此参数是为了满足特殊页面特殊需求，
		 *   2、如：详情页等选中侧栏导航或在模块A下面的页面，想选模块B为导航选中状态
		 */
		selectLeftMenu?: string;
		/**
		 * 所属顶级菜单,当顶级菜单存在时，用于选中顶部菜单，与侧栏菜单切换
		 *   1、三级路由此参数的作用是选中顶级菜单
		 *   2、二级路由此参数的作用是所属某个顶级菜单的下面，两个层级的必须同时填写一致，如果path设置的是外链，此参数必填
		 *   3、(默认不设置 path.split('/')[0])，此参数是为了满足特殊页面特殊需求
		 */
		selectTopMenu?: string;
		/**
		 * 面包屑自定义内容：
		 *     1、默认不配置按照路由自动读取；
		 *     2、设置为 false , 按照路由自动读取并不读当前自己；
		 *     3、配置对应的面包屑格式如下：
		 */
		breadcrumb?: IBreadcrumb[] | false;
		// 菜单中是否隐藏
		hidden?: boolean;
		// 权限控制，页面角色(您可以设置多个角色)
		roles?: string[];
		/**
		 * 设置tab导航存储规则类型
		 *    1、默认不配置按照path(route.path)规则
		 *    2、querypath：path + query (route.path+route.query) 规则
		 *       比如：详情页可设置querypath
		 */
		tabNavType?: TTabNavType;
		/**
		 * 设置该字段，则在关闭当前tab页时，作为关闭前的钩子函数
		 * @param close 关闭回调函数
		 */
		tabNavCloseBefore?: (close: () => void) => void;
		/**
		 * 当启用tabNav时，此导航对应页面组件，是否缓存。
		 *    注意：如果设置true，route.name必须也有值且唯一，才会有效(并且对应的页面也需要声明相同name)。
		 *    比如：发布页、编辑页可设置此参数看效果
		 */
		isKeepAlive?: boolean;
	}
}

/**
 * @description: json path key 路由类型
 */
export interface IPathKeyRouter {
	[path: string]: RouteRecordRaw;
}

/**
 * @description: 路由类型 RouteRecordRaw 与 json path key 路由类型 集合
 */
export interface IRouterPathKeyRouter {
	router: RouteRecordRaw[];
	pathKeyRouter: IPathKeyRouter;
}
