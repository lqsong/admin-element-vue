import request from "@/utils/request";

export async function annualnewLinks(): Promise<any> {
	return request({
		url: "/home/links/annualnew",
		method: "get",
	});
}
