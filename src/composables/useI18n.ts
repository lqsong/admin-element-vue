import { useI18nStore } from "@/store/i18n";
import { TI18n } from "@/@types/i18n";

/**
 * @description  引入语言包
 * @param locales  当前本地(文件夹下)语言包
 * @returns (key: string, format?: TUseFormat) => string
 * @author LiQingSong
 */
export const useI18n = (locales?: TI18n) => {
	const i18n = useI18nStore();
	return i18n.use(locales);
};
