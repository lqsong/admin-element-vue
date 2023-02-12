import { MockMethod } from "vite-plugin-mock";

export default [
	{
		url: "/api/test",
		method: "get",
		response: ({ headers, body }) => {
			return {
				code: 0,
				data: "测试mock接口功能",
			};
		},
	},
	{
		url: "/api/uploads",
		method: "POST",
		response: () => {
			return {
				code: 0,
				data: {
					id: 1,
					url: "http://uploads.liqingsong.cc/20200531/583057e8-8bab-4eee-b5a0-bec915089c0c.jpg",
					name: "xcx.jpg",
				},
			};
		},
	},
	{
		url: "/api/500",
		method: "get",
		// statusCode: 401,
		response: ({ headers, body }) => {
			return {
				timestamp: 1513932555104,
				status: 500,
				error: "error",
				message: "error",
				path: "/500",
			};
		},
	},
] as MockMethod[];
