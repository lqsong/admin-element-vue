import request from "@/utils/request";
import { IQueryParams, ITableListItem } from "./data";

export async function queryList(params?: IQueryParams): Promise<any> {
	return request({
		url: "/pages/list",
		method: "get",
		params,
	});
}

export async function createData(params: Omit<ITableListItem, "id">): Promise<any> {
	return request({
		url: "/pages/list",
		method: "POST",
		data: params,
	});
}

export async function updateData(id: number, params: Omit<ITableListItem, "id">): Promise<any> {
	return request({
		url: `/pages/list/${id}`,
		method: "PUT",
		data: params,
	});
}

export async function removeData(id: number): Promise<any> {
	return request({
		url: `/pages/list/${id}`,
		method: "delete",
	});
}

export async function detailData(id: number): Promise<any> {
	return request({ url: `/pages/list/${id}` });
}
