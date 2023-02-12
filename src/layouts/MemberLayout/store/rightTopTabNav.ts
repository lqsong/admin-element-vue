/**
 * @description: MemberLayout rightTopTabNav  store
 * @author LiQingSong
 */
import { nextTick } from "vue";
import { defineStore } from "pinia";
import { IPathKeyRouter } from "@/@types/vue-router";
import { RouteLocationNormalizedLoaded, Router, RouteRecordRaw } from "vue-router";
import { homePath } from "@/config/settings";
import { equalTabNavRoute } from "@/utils/router";

// state ts类型
export interface IGlobalState {
	// formatRoutes 处理后的路由
	pathKeyRouter: IPathKeyRouter;
	// tabNav列表
	tabNavList: RouteLocationNormalizedLoaded[];
	// KeepAlive include
	keepAliveInclude: string[];
	// 是否刷新路由
	isRouterRefresh: boolean;
}

export const useMlRightTopTabNavStore = defineStore("useMlRightTopTabNavStore", {
	state: (): IGlobalState => {
		return {
			pathKeyRouter: {},
			tabNavList: [],
			keepAliveInclude: [],
			isRouterRefresh: false,
		};
	},
	getters: {
		// 获取路由中设置了需要KeepAlive缓存的路由name集合，根据route.meta.isKeepAlive为true，且route.name不能为空
		keepAliveRouteNames: ({ pathKeyRouter }) => {
			const names: string[] = [];
			for (const key in pathKeyRouter) {
				if (Object.prototype.hasOwnProperty.call(pathKeyRouter, key)) {
					const item = pathKeyRouter[key];
					if (item.name && item.meta && item.meta.isKeepAlive) {
						names.push(item.name.toString());
					}
				}
			}
			return names;
		},
	},
	actions: {
		/**
		 * @description 设置 KeepAlive include
		 * @param route 当前vue-router的路由
		 */
		setKeepAliveInclude(route: RouteLocationNormalizedLoaded) {
			const routeName = route.name?.toString() || "";
			if (!this.keepAliveInclude.includes(routeName) && this.keepAliveRouteNames.includes(routeName)) {
				this.keepAliveInclude.push(routeName);
			}
		},
		/**
		 * @description 移除对应的 KeepAlive include
		 * @param route 当前vue-router的路由
		 */
		removeKeepAliveInclude(route: RouteLocationNormalizedLoaded) {
			const routeName = route.name?.toString() || "";
			const index = this.keepAliveInclude.indexOf(routeName);
			if (index >= 0) {
				this.keepAliveInclude.splice(index, 1);
			}
		},
		/**
		 * @description 设置 TabNavList
		 * @param route 当前vue-router的路由
		 * @param LayoutRouteItem 当前layout路由对应的路由item,传此参数的原因是，确保route与LayoutRouteItem的path一致，因为监听route，离开时也会执行监听
		 * @returns 导航item对应下标
		 */
		setTabNavList(route: RouteLocationNormalizedLoaded, LayoutRouteItem: RouteRecordRaw) {
			if (!LayoutRouteItem || LayoutRouteItem.path !== route.path) {
				return;
			}

			// 设置 KeepAlive include
			this.setKeepAliveInclude(route);

			// 先判断第一个是不是首页
			const firstItem = this.tabNavList[0];
			if (!firstItem || firstItem.path !== homePath) {
				// 不存在或不是首页
				const meta = this.pathKeyRouter[homePath].meta || {};
				this.tabNavList.unshift({
					fullPath: homePath,
					path: homePath,
					meta,
					query: {},
					params: {},
					matched: [],
					hash: "",
					name: undefined,
					redirectedFrom: undefined,
				});
			}

			// tabNavList数组里是否已经存在当前route规则，不存在下标为-1
			let index = this.tabNavList.findIndex((item) => equalTabNavRoute(item, route, route.meta?.tabNavType));
			if (index < 0) {
				// 不存在，就往后新增
				index = this.tabNavList.length;
				this.tabNavList.push({
					...route, // 必须解构，因为不结构指向的是同一个存储地址
				});
			} else {
				// 存在就更新最新路由
				this.tabNavList[index] = {
					...route, // 必须解构，因为不结构指向的是同一个存储地址
				};
			}
			return index;
		},

		/**
		 * @description 关闭对应的item tab
		 * @param item 当前vue-router的路由 item
		 * @param index 当前item下标
		 * @param router 路由vue-router
		 */
		closeTabNav(item: RouteLocationNormalizedLoaded, index: number, router: Router) {
			// 移除对应的 KeepAlive include
			this.removeKeepAliveInclude(item);

			// 判断关闭的是否是当前打开的tabItem
			let isCurrentOpenItem: boolean | RouteLocationNormalizedLoaded = false;
			if (equalTabNavRoute(item, router.currentRoute.value, item.meta?.tabNavType)) {
				// 打开的是当前tabItem
				isCurrentOpenItem = this.tabNavList[index - 1];
			}

			this.tabNavList.splice(index, 1);

			if (isCurrentOpenItem !== false) {
				router.push(isCurrentOpenItem);
			}
		},
		/**
		 * @description 关闭所有tabNav
		 * @param router 路由vue-router
		 */
		closeAllTabNav(router: Router) {
			this.tabNavList = this.tabNavList.filter((item) => {
				// 首页不关闭，有关闭前置钩子的不关闭需要手动点击每个item关闭
				const is =
					(item.meta.tabNavCloseBefore && typeof item.meta.tabNavCloseBefore === "function") || item.path === homePath;
				if (!is) {
					// 移除对应的 KeepAlive include
					this.removeKeepAliveInclude(item);
				}
				return is;
			});

			router.push(homePath);
		},
		/**
		 * @description 关闭其他tabNav
		 * @param router 路由vue-router
		 */
		closeOtherTabNav(router: Router) {
			this.tabNavList = this.tabNavList.filter((item) => {
				// 首页不关闭，有关闭前置钩子的不关闭需要手动点击每个item关闭，当前选中的不关闭
				const is =
					(item.meta.tabNavCloseBefore && typeof item.meta.tabNavCloseBefore === "function") ||
					item.path === homePath ||
					equalTabNavRoute(item, router.currentRoute.value, item.meta.tabNavType);
				if (!is) {
					// 移除对应的 KeepAlive include
					this.removeKeepAliveInclude(item);
				}
				return is;
			});
		},
		/**
		 * @description 关闭左侧和右侧tabNav
		 * @param direction 左侧或右侧
		 * @param router  路由vue-router
		 */
		closeToLRTabNav(direction: "left" | "right", router: Router) {
			const index = this.tabNavList.findIndex((item) => {
				return equalTabNavRoute(item, router.currentRoute.value, item.meta.tabNavType);
			});
			this.tabNavList = this.tabNavList.filter((item, i) => {
				// 首页不关闭，有关闭前置钩子的不关闭需要手动点击每个item关闭，当前选中的左边或右边关闭
				const is =
					(item.meta.tabNavCloseBefore && typeof item.meta.tabNavCloseBefore === "function") ||
					item.path === homePath ||
					(direction === "left" ? i >= index : i <= index);
				if (!is) {
					// 移除对应的 KeepAlive include
					this.removeKeepAliveInclude(item);
				}
				return is;
			});
		},
		/**
		 * @description 刷新当前tabNav
		 * @param router  路由vue-router
		 */
		refreshCurrentTabNav(router: Router) {
			// 移除对应的 KeepAlive include
			this.removeKeepAliveInclude(router.currentRoute.value);
			this.isRouterRefresh = true;
			nextTick(() => {
				this.isRouterRefresh = false;
				// 设置 KeepAlive include
				this.setKeepAliveInclude(router.currentRoute.value);
			});
		},
	},
});
