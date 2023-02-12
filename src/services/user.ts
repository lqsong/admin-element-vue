import request from "@/utils/request";

export async function queryUserInfo(): Promise<any> {
	return request({
		url: "/user/info",
		method: "get",
	});
}
