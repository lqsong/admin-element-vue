/**
 * 国际化 utils
 * @author LiQingSong
 */
import * as path from "path";
import { ViteDevServer, Plugin } from "vite";
import { LocaleMessages } from '@intlify/core-base';
import { VueMessageType } from "vue-i18n";

// window.localStorage 存储key
export const localeKey = 'locale';

// 默认语言
export const defaultLang = 'zh-CN';

/**
 * 验证语言命名规则 zh-CN
 * @returns boolen
 * @author LiQingSong
 */
export const localeNameExp = (lang: string): boolean => {
    const localeExp = new RegExp(`^([a-z]{2})-?([A-Z]{2})?$`);
    return localeExp.test(lang);
}

/**
 * 设置 html lang 属性值
 * @param lang 语言的 key
 * @author LiQingSong
 */
export const setHtmlLang = (lang: string) => {
    /**
     * axios.defaults.headers.common['Accept-Language'] = locale
     */
    const htmlSelector = document.querySelector('html');   
    htmlSelector && htmlSelector.setAttribute('lang', lang)
}

/**
 * 获取当前选择的语言
 * 获取的浏览器语言默认项目中有可能不支持，所以在config/i18n.ts中要加以判断
 * @returns string
 * @author LiQingSong
 */
export const getLocale = (): string => {   
    const lang = typeof window.localStorage !== 'undefined' ? window.localStorage.getItem(localeKey) : '';    
    const isNavigatorLanguageValid = typeof navigator !== 'undefined' && typeof navigator.language === 'string';
    const browserLang = isNavigatorLanguageValid ? navigator.language.split('-').join('-') : '';
    return lang || browserLang || defaultLang;
};

/**
 * 切换语言
 * @param lang 语言的 key
 * @param realReload 是否刷新页面，默认刷新
 * @author LiQingSong
 */
export const setLocale = (lang: string, realReload = true, callback: Function) => {
  
  if (lang !== undefined && !localeNameExp(lang)) {
    // for reset when lang === undefined
    throw new Error('setLocale lang format error');
  }
  if (getLocale() !== lang) {
    if (typeof window.localStorage !== 'undefined') {
      window.localStorage.setItem(localeKey, lang || '');
    }

    if (realReload) {
        window.location.reload();
    } else {
        setHtmlLang(lang);

        if(typeof callback === 'function') {
            callback();
        }
    }
    
  }
};

/**
 * 自动导入 框架自定义语言
 * @author LiQingSong
 */
export function importAllLocales(): LocaleMessages<VueMessageType> {
    const modules: LocaleMessages<VueMessageType> = {};
    try {
        // 导入 @/views 下文件，包含子目录，文件名为：[/\\]locales[/\\]([a-z]{2})-?([A-Z]{2})?\.ts
        const viewsRequireModules = import.meta.globEager('../views/**/locales/[[:lower:]][[:lower:]]-[[:upper:]][[:upper:]].ts');
        for (const path in viewsRequireModules) {
          const modulesConent = viewsRequireModules[path];
          if(modulesConent.default) {
            // 获取 PascalCase 命名
            const modulesName = path.replace(/(.*\/)*([^.]+).*/ig,"$2");

            if(modules[modulesName]) {
                modules[modulesName] = {
                    ...modules[modulesName],
                    ...modulesConent.default
                }
            } else {
                modules[modulesName] = modulesConent.default; 
            }           
          }
        }        
        
        // 导入 @/layouts 下文件，包含子目录，文件名为：[/\\]locales[/\\]([a-z]{2})-?([A-Z]{2})?\.ts
        const layoutsRequireModules = import.meta.globEager('../layouts/**/locales/[[:lower:]][[:lower:]]-[[:upper:]][[:upper:]].ts');
        for (const path in layoutsRequireModules) {
          const modulesConent = layoutsRequireModules[path];
          if(modulesConent.default) {
            // 获取 PascalCase 命名
            const modulesName = path.replace(/(.*\/)*([^.]+).*/ig,"$2");

            if(modules[modulesName]) {
                modules[modulesName] = {
                    ...modules[modulesName],
                    ...modulesConent.default
                }
            } else {
                modules[modulesName] = modulesConent.default; 
            }           
          }
        }        

        // 导入 @/components 下文件，包含子目录，文件名为：[/\\]locales[/\\]([a-z]{2})-?([A-Z]{2})?\.ts
        const componentsRequireModules = import.meta.globEager('../components/**/locales/[[:lower:]][[:lower:]]-[[:upper:]][[:upper:]].ts');
        for (const path in componentsRequireModules) {
          const modulesConent = componentsRequireModules[path];
          if(modulesConent.default) {
            // 获取 PascalCase 命名
            const modulesName = path.replace(/(.*\/)*([^.]+).*/ig,"$2");

            if(modules[modulesName]) {
                modules[modulesName] = {
                    ...modules[modulesName],
                    ...modulesConent.default
                }
            } else {
                modules[modulesName] = modulesConent.default; 
            }           
          }
        }        

        // 导入 @/locales 下文件，不包含子目录，文件名为：([a-z]{2})-?([A-Z]{2})?\.ts
        const localesRequireModules = import.meta.globEager('../locales/[[:lower:]][[:lower:]]-[[:upper:]][[:upper:]].ts');
        for (const path in localesRequireModules) {
          const modulesConent = localesRequireModules[path];
          if(modulesConent.default) {
            // 获取 PascalCase 命名
            const modulesName = path.replace(/(.*\/)*([^.]+).*/ig,"$2");

            if(modules[modulesName]) {
                modules[modulesName] = {
                    ...modules[modulesName],
                    ...modulesConent.default
                }
            } else {
                modules[modulesName] = modulesConent.default; 
            }           
          }
        }         
        
        
    } catch (error) {
      console.log(error);
    }

    return modules;
}

/**
 * 验证 Locales 位置
 * @author LiQingSong
 */
export function validateLocalesPath(filePath: string): boolean {

  if(!filePath.match(/[/\\]locales[/\\]([a-z]{2})-?([A-Z]{2})?\.ts$/)) {
    return false;
  }

  let viewsDirBool: boolean = false;
  let layoutsDirBool: boolean = false;
  let componentsDirBool: boolean = false;
  let localesDirBool: boolean = false;
  

  const viewsPath = path.resolve(__dirname, '../views');
  const layoutsPath = path.resolve(__dirname, '../layouts');
  const componentsPath = path.resolve(__dirname, '../components');
  const localesPath = path.resolve(__dirname, '../locales');
  
  viewsDirBool = filePath.replace(viewsPath, '') !== filePath;
  layoutsDirBool = filePath.replace(layoutsPath, '') !== filePath;
  componentsDirBool = filePath.replace(componentsPath, '') !== filePath;
  localesDirBool = filePath.replace(localesPath, '') !== filePath;
  
  return viewsDirBool || layoutsDirBool || componentsDirBool || localesDirBool;
}

/**
 * Locales Vite Plugin
 * @author LiQingSong
 */
export function vitePluginLocales(): Plugin {

  return {
    name: 'vite-plugin-locales',
    configureServer(server: ViteDevServer) { 
      
        server.watcher.on("all",(eventName, filePath)=> {
          
          if ((eventName === 'add' || eventName === 'unlink')) {

            if(validateLocalesPath(filePath)) {
              server.moduleGraph.invalidateAll();

              server.ws.send({
                type: 'full-reload',
                path: '*'
              });

              server.config.logger.info(`  >>> ${eventName} ${filePath}`);            
              server.config.logger.info(`  >>> moduleGraph invalidateAll, page reload all.`); 
            } 

          }
        })
    }
  }

}

