/**
 * @description: 自定义i18n ts定义
 * @author LiQingSong
 */

/**
 * @description: 语言名类型
 */
export type TI18nKey = "zh-CN" | "zh-TW" | "en-US";

/**
 * @description: 语言值类型
 */
export interface II18nVal {
	[key: string]: string;
}

/**
 * @description: 语言包格式
 */
export type TI18n = {
	[key in TI18nKey]?: II18nVal;
};

/**
 * @description: 语言内部变量格式替换字段
 */
export type TUseFormat = (string | number)[] | { [key in string]: number | string };
