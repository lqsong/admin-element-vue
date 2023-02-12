import { RouteRecordRaw } from "vue-router";

const UserLayoutRoutes: RouteRecordRaw[] = [
	{
		path: "/user",
		redirect: "/user/login",
		children: [
			{
				meta: {
					title: "登录",
				},
				path: "login",
				component: () => import("@/pages/user/login/index.vue"),
			},
		],
	},
];

export default UserLayoutRoutes;
