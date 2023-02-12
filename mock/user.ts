import { MockMethod } from "vite-plugin-mock";
const ajaxHeadersTokenKey = "x-token";
export default [
	{
		url: "/api/user/login",
		method: "post",
		response: ({ headers, body }) => {
			const { password, username } = body;
			const send = { code: 0, data: {}, msg: "" };
			if (username === "admin" && password === "123456") {
				send["data"] = {
					token: "admin",
				};
			} else if (username === "user" && password === "123456") {
				send["data"] = {
					token: "user",
				};
			} else if (username === "test" && password === "123456") {
				send["data"] = {
					token: "test",
				};
			} else {
				send["code"] = 201;
				send["msg"] = "Wrong username or password";
			}
			return send;
		},
	},
	{
		url: "/api/user/info",
		method: "get",
		response: ({ headers, body }) => {
			if (headers[ajaxHeadersTokenKey] === "admin") {
				return {
					code: 0,
					data: {
						id: 1,
						name: "Admins-mock",
						avatar: "",
						roles: ["admin"],
					},
				};
			} else if (headers[ajaxHeadersTokenKey] === "user") {
				return {
					code: 0,
					data: {
						id: 2,
						name: "Users",
						avatar: "",
						roles: ["user"],
					},
				};
			} else if (headers[ajaxHeadersTokenKey] === "test") {
				return {
					code: 0,
					data: {
						id: 3,
						name: "Tests",
						avatar: "",
						roles: ["test"],
					},
				};
			} else {
				return {
					code: 10002,
					data: {},
					msg: "未登录",
				};
			}
		},
	},
] as MockMethod[];
