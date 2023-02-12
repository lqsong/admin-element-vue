import request from "@/utils/request";

export async function monthnewTopics(): Promise<any> {
	return request({
		url: "/home/topics/monthnew",
		method: "get",
	});
}
