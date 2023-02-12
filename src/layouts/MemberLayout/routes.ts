import { RouteRecordRaw } from "vue-router";
import { homePath } from "@/config/settings";

const MemberLayoutRoutes: RouteRecordRaw[] = [
	{
		meta: {
			title: "member-layout.menu.home",
			icon: "menu-home",
		},
		path: homePath,
		component: () => import("@/pages/home/index.vue"),
	},
	{
		meta: {
			title: "member-layout.menu.link",
			icon: "menu-link",
		},
		path: "/link",
		children: [
			{
				meta: {
					title: "member-layout.menu.link.github",
				},
				path: "https://github.com/lqsong/admin-element-vue",
				redirect: "",
			},
			{
				meta: {
					title: "member-layout.menu.link.gitee",
				},
				path: "https://gitee.com/lqsong/admin-element-vue",
				redirect: "",
			},
			{
				meta: {
					title: "member-layout.menu.link.docs",
				},
				path: "http://admin-element-vue.liqingsong.cc/",
				redirect: "",
			},
		],
	},
	{
		meta: {
			title: "member-layout.menu.form",
			icon: "menu-edit",
		},
		path: "/form",
		children: [
			{
				name: "FormBase",
				meta: {
					title: "member-layout.menu.form.basic",
					isKeepAlive: true,
				},
				path: "basic",
				component: () => import("@/pages/form/base/index.vue"),
			},
			{
				name: "FormStep",
				meta: {
					title: "member-layout.menu.form.step",
					isKeepAlive: true,
				},
				path: "step",
				component: () => import("@/pages/form/step/index.vue"),
			},
		],
	},
	{
		meta: {
			title: "member-layout.menu.list",
			icon: "menu-list",
		},
		path: "/list",
		children: [
			{
				meta: {
					title: "member-layout.menu.list.basic",
				},
				path: "basic",
				component: () => import("@/pages/list/basic/index.vue"),
			},
			{
				meta: {
					title: "member-layout.menu.list.filter",
				},
				path: "filter",
				component: () => import("@/pages/list/filter/index.vue"),
			},
			{
				meta: {
					title: "member-layout.menu.list.highlyAdaptive",
				},
				path: "highlyAdaptive",
				component: () => import("@/pages/list/highlyAdaptive/index.vue"),
			},
			{
				meta: {
					title: "member-layout.menu.list.highlyAdaptive2",
				},
				path: "highlyAdaptive2",
				component: () => import("@/pages/list/highlyAdaptive2/index.vue"),
			},
		],
	},
	{
		meta: {
			title: "member-layout.menu.detail",
			icon: "menu-detail",
		},
		path: "/detail",
		children: [
			{
				meta: {
					title: "member-layout.menu.detail.basic",
				},
				path: "basic",
				component: () => import("@/pages/detail/basic/index.vue"),
			},
			{
				meta: {
					title: "member-layout.menu.detail.module",
				},
				path: "module",
				component: () => import("@/pages/detail/module/index.vue"),
			},
			{
				meta: {
					title: "member-layout.menu.detail.table",
				},
				path: "table",
				component: () => import("@/pages/detail/table/index.vue"),
			},
		],
	},
	{
		meta: {
			title: "member-layout.menu.result",
			icon: "menu-result",
		},
		path: "/result",
		children: [
			{
				meta: {
					title: "member-layout.menu.result.success",
				},
				path: "success",
				component: () => import("@/pages/result/success/index.vue"),
			},
			{
				meta: {
					title: "member-layout.menu.result.fail",
				},
				path: "fail",
				component: () => import("@/pages/result/fail/index.vue"),
			},
		],
	},
	{
		meta: {
			title: "member-layout.menu.exception",
			icon: "menu-anomaly",
		},
		path: "/exception",
		children: [
			{
				meta: {
					title: "member-layout.menu.exception.403",
				},
				path: "403",
				component: () => import("@/pages/exception/403/index.vue"),
			},
			{
				meta: {
					title: "member-layout.menu.exception.404",
				},
				path: "404",
				component: () => import("@/pages/exception/404/index.vue"),
			},
			{
				meta: {
					title: "member-layout.menu.exception.500",
				},
				path: "500",
				component: () => import("@/pages/exception/500/index.vue"),
			},
		],
	},
	{
		meta: {
			title: "member-layout.menu.permission",
			icon: "menu-permission",
		},
		path: "/permission",
		children: [
			{
				meta: {
					title: "member-layout.menu.permission.all",
				},
				path: "all",
				component: () => import("@/pages/permission/all/index.vue"),
			},
			{
				meta: {
					title: "member-layout.menu.permission.user",
					roles: ["user"],
				},
				path: "user",
				component: () => import("@/pages/permission/user/index.vue"),
			},
			{
				meta: {
					title: "member-layout.menu.permission.test",
					roles: ["test"],
				},
				path: "test",
				component: () => import("@/pages/permission/test/index.vue"),
			},
		],
	},
	{
		meta: {
			title: "member-layout.menu.routeMetaExtend",
			icon: "router",
		},
		path: "/routeMetaExtend",
		children: [
			{
				meta: {
					title: "member-layout.menu.routeMetaExtend.breadcrumb",
					breadcrumb: [
						{
							title: "member-layout.menu.routeMetaExtend.breadcrumb",
							path: "",
						},
						{
							title: "首页",
							path: "/home",
						},
						{
							title: "liqingsong.cc",
							path: "http://liqingsong.cc",
						},
					],
					tabNavCloseBefore: (close: () => void): void => {
						if (window.confirm("确认关闭吗")) {
							close();
						}
					},
				},
				path: "breadcrumb",
				component: () => import("@/pages/routeMetaExtend/breadcrumb/index.vue"),
			},
		],
	},
];

export default MemberLayoutRoutes;
