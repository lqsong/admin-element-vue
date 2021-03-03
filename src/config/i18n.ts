/**
 * 国际化 入口
 * @author LiQingSong
 */

import { createI18n } from "vue-i18n";
import { getLocale, setLocale, importAllLocales } from "@/utils/i18n";

/**
 * elementUI 多语言 配置
 */
import enUS from 'element-plus/lib/locale/lang/en';
import zhCN from 'element-plus/lib/locale/lang/zh-cn';
import zhTW from 'element-plus/lib/locale/lang/zh-tw';
export const elementPlusMessages: { [key: string]: any} = {
    'zh-CN': zhCN,
    'zh-TW': zhTW,
    'en-US': enUS,
}


/**
 * 框架 多语言 配置
 */
export const messages = importAllLocales();

const i18n = createI18n({
    legacy: false,
    locale: getLocale(),
    messages,
});


/**
 * 设置语言
 * @param locale 
 */
export function setI18nLanguage(locale: string, realReload = false) {  
    setLocale(locale,realReload, function() {
        // i18n.global.locale = locale // legacy: true
        i18n.global.locale.value = locale;        
    })
}

export default i18n;
