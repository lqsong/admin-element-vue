/**
 * @description: 自定义I18n store
 * @author LiQingSong
 */
import { defineStore } from "pinia";
import { isArray, isObject } from "@/utils/is";
import { getLocale, defaultLang } from "@/utils/i18n";

import { TI18n, TI18nKey, TUseFormat } from "@/@types/i18n";

// 导入 element-plus 语言包
import { zhCn, zhTw, en, Language } from "element-plus/es/locale/index";
const elementPlusMessages = {
	"zh-CN": zhCn,
	"zh-TW": zhTw,
	"en-US": en,
};

// 导入全局自定义语言
import globalLocales from "@/locales";

// state ts类型
export interface II18nState {
	// 语言名
	locale: TI18nKey;
	// 语言包
	messages: TI18n;
	// element-plus 语言内容
	elementPlusLocale: Language;
}

// 获取当前系统或存储的语言
const sysLocale = getLocale();

export const useI18nStore = defineStore("useI18nStore", {
	state: (): II18nState => {
		return {
			locale: globalLocales[sysLocale] ? sysLocale : defaultLang,
			messages: globalLocales,
			elementPlusLocale: elementPlusMessages[sysLocale],
		};
	},
	getters: {},
	actions: {
		/**
		 * @description 引入语言包
		 * @param locales 当前本地(文件夹下)语言包
		 * @returns (key: string, format?: TUseFormat) => string
		 */
		use(locales?: TI18n) {
			return (key: string, format?: TUseFormat) => {
				const i18nMessage = this.messages[this.locale] || {};
				const locale = locales ? locales[this.locale] || {} : {};
				let str = i18nMessage[key] || locale[key] || key;

				if (isObject(format) || isArray(format)) {
					const newFormat: any = format;
					for (const key in newFormat) {
						if (Object.prototype.hasOwnProperty.call(newFormat, key)) {
							const pattern = `\\{${key}\\}`;
							str = str.replace(new RegExp(pattern, "ig"), newFormat[key]);
						}
					}
				}

				return str;
			};
		},

		/**
		 * @description 设置 element-plus 多语言
		 * @param locale 语言名称
		 */
		setElementPlusLocale(locale?: TI18nKey) {
			const l = locale || this.locale;
			this.elementPlusLocale = elementPlusMessages[l];
		},
	},
});
