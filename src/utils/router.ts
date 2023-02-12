/**
 * @description: 路由工具
 * @author LiQingSong
 */
import { RouteLocationNormalizedLoaded, RouteRecordRaw } from "vue-router";
import { IPathKeyRouter, IRouterPathKeyRouter, IBreadcrumb, TTabNavType } from "@/@types/vue-router";
import { merge } from "lodash";
import { isExternal } from "@/utils/is";
import { equalObject } from "@/utils/object";

/**
 * @description: 根据 routes: RouteRecordRaw[] 重置
 * @param routes 路由配置
 * @param parentPath 上级path
 * @param parentPaths 父级path数组集合
 * @returns IRouterPathKeyRouter
 */
export const formatRoutes = (
	routes: RouteRecordRaw[],
	parentPath = "/",
	parentPaths: string[] = [],
): IRouterPathKeyRouter => {
	const items: RouteRecordRaw[] = [];
	let jsonItems: IPathKeyRouter = {};

	routes.forEach((item) => {
		// 设置路径
		let path = item.path || "";
		if (!isExternal(item.path)) {
			path = item.path.startsWith("/")
				? item.path
				: `${parentPath.endsWith("/") ? parentPath : `${parentPath}/`}${item.path}`;
		}
		item.path = path;

		// 设置 meta
		const meta = item.meta || {};
		// 设置 meta.parentPath
		const pPaths = meta.parentPath && meta.parentPath.length > 0 ? meta.parentPath : parentPaths;
		meta.parentPath = pPaths;
		item.meta = meta;

		// children赋值
		let pkChildren: IPathKeyRouter | undefined;
		if (item.children) {
			const cRoutes = formatRoutes(item.children, path, [...pPaths, path]);
			item.children = cRoutes.router;
			pkChildren = cRoutes.pathKeyRouter;
		}

		// 最终 item 赋值
		items.push(item);
		jsonItems[path] = item;
		if (pkChildren) {
			jsonItems = merge(jsonItems, pkChildren);
		}
	});

	return {
		router: items,
		pathKeyRouter: jsonItems,
	};
};

/**
 * @description: 根据自定义传入验证的权限名 判断当前用户是否有权限
 * @param userRoles  用户的权限
 * @param roles  自定义验证的权限名
 * @returns boolean
 */
export const hasPermissionRoles = (userRoles: string[], roles?: string | string[]): boolean => {
	if (userRoles.length < 1) {
		return false;
	}

	if (userRoles.includes("admin")) {
		return true;
	}

	if (typeof roles === "undefined") {
		return true;
	}

	if (typeof roles === "string") {
		return userRoles.includes(roles);
	}

	if (roles instanceof Array && roles.length === 0) {
		return true;
	}

	if (roles instanceof Array && roles.length > 0) {
		return roles.some((role) => userRoles.includes(role));
	}

	return false;
};

/**
 * 根据 hidden 判断是否有数据子集
 * @param children RouteRecordRaw[]
 */
export const hasChildRoute = (children: RouteRecordRaw[]): boolean => {
	const showChildren = children.filter((item) => {
		if (item.meta?.hidden) {
			return false;
		}
		return true;
	});
	if (showChildren.length > 0) {
		return true;
	}
	return false;
};

/**
 * 获取当前路由选中的侧边栏菜单path
 * @param route route
 */
export const getSelectLeftMenuPath = (route: RouteRecordRaw): string => {
	return route.meta?.selectLeftMenu || route.path;
};

/**
 * 根据路由 pathname 数组 - 返回对应的 route 数组
 * @param pathname string[] 路由path数组
 * @param jsonRoutesData IPathKeyRouter 经过formatRoutes处理，框架的所有pathKeyRouter路由
 * @returns RouteRecordRaw[]
 * @author LiQingSong
 */
export const getPathsTheRoutes = (pathname: string[], jsonRoutesData: IPathKeyRouter): RouteRecordRaw[] => {
	const routeItem: RouteRecordRaw[] = [];

	for (let index = 0, len = pathname.length; index < len; index += 1) {
		const element = pathname[index];
		const item = jsonRoutesData[element] || {};
		if (item.path !== "") {
			routeItem.push(item);
		}
	}

	return routeItem;
};

/**
 * 获取面包屑对应的数组
 * @param pathname string 当前路由path
 * @param jsonRoutesData  IPathKeyRouter  IPathKeyRouter 经过formatRoutes处理，框架的所有pathKeyRouter路由
 * @returns BreadcrumbType[]
 * @author LiQingSong
 */
export const getBreadcrumbRoutes = (pathname: string, jsonRoutesData: IPathKeyRouter): IBreadcrumb[] => {
	const route: RouteRecordRaw = jsonRoutesData[pathname] || {};
	if (!route.path) {
		return [];
	}

	if (!route.meta?.breadcrumb) {
		const parentPath = route.meta?.parentPath || [];
		const routes = getPathsTheRoutes(parentPath, jsonRoutesData);
		const bread: IBreadcrumb[] = [];

		for (let index = 0; index < routes.length; index++) {
			const element = routes[index];
			bread.push({
				title: element.meta?.title || "",
				path: element.path,
			});
		}

		if (route.meta?.breadcrumb === false) {
			return bread;
		}

		bread.push({
			title: route.meta?.title || "",
			path: route.path,
		});

		return bread;
	}

	return route.meta.breadcrumb;
};

/**
 * 判断tabNav，对应的route是否相等
 * @param route1 vue-route
 * @param route2 vue-route
 * @param type 判断规则
 * @returns
 * @author LiQingSong
 */
export const equalTabNavRoute = (
	route1: RouteLocationNormalizedLoaded,
	route2: RouteLocationNormalizedLoaded,
	type: TTabNavType = "path",
): boolean => {
	let is = false;
	switch (type) {
		case "querypath": // path + query
			is = equalObject(route1.query, route2.query) && route1.path === route2.path;
			break;
		default: // path
			is = route1.path === route2.path;
			break;
	}

	return is;
};
