/**
 * @description: 自定义 request 网络请求枚举配置
 * @author LiQingSong
 */

/**
 * @description: 自定义状态码配置
 */
export enum ResultCodeEnum {
	SUCCESS = 0, // 成功
	LOGININVALID = 10002, // 登入信息失效
}

/**
 * @description: 常用的contentTyp类型
 */
export enum ContentTypeEnum {
	// json
	JSON = "application/json;charset=UTF-8",
	// text
	TEXT = "text/plain;charset=UTF-8",
	// form-data 一般配合qs
	FORM_URLENCODED = "application/x-www-form-urlencoded;charset=UTF-8",
	// form-data 上传
	FORM_DATA = "multipart/form-data;charset=UTF-8",
}
