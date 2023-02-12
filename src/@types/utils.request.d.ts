/**
 * @description: 自定义 request 网络请求工具 ts定义
 * @author LiQingSong
 */
import { AxiosRequestConfig } from "axios";
import { ContentTypeEnum } from "@/enums/utils.request.enum";

/**
 * @description: ajax 配置参数类型
 */
export interface IAxiosRequestConfig extends AxiosRequestConfig {
	contentType?: ContentTypeEnum;
}

/**
 * @description: 请求返回数据类型
 */
export interface IResponseData<T = any> {
	code: number;
	data?: T;
	msg?: string;
}

/**
 * @description: 状态码对应内容信息
 */
export interface ICodeMessage {
	[key: number]: string;
}
