/**
 * Store utils
 * @author LiQingSong
 */
import * as path from "path";
import { ViteDevServer, Plugin } from 'vite';
import { Module, ModuleTree } from 'vuex';

/**
 * 自定义项目 Store Module 类型
 * 为自动导入的 store 做类型限制
 * [@/store文件夹下定义的 store]与[@/views文件夹下定义的`文件store.ts`] 必须继承此类型
 * @author LiQingSong
 */
export interface StoreModuleType<S> extends Module<S, S> {
  namespaced: true;
  name: string;
}

/**
 * 自动导入 Store
 * @author LiQingSong
 */
export function importAllStore<S> (): ModuleTree<S> {
    const modules: ModuleTree<S> = {};
    try {
        // 导入 @/views 下文件，包含子目录，文件名为：store.ts
        const viewsRequireModules = import.meta.globEager('../views/**/store.ts');
        for (const path in viewsRequireModules) {
            const modulesConent = viewsRequireModules[path];
            if(modulesConent.default) {
              const { name, ...module } = modulesConent.default; 
              // 获取 PascalCase 命名
              const modulesName = name || path.replace(/^\.\/(.*)\.\w+$/, "$1");

              modules[modulesName] = { ...module }; 
            }
        }
        
        // 导入 @/store 下文件 
        const requireModules = import.meta.globEager('../store/*.ts');
        for (const path in requireModules) {
            const modulesConent = requireModules[path];
            if(modulesConent.default) {
              const { name, ...module } = modulesConent.default; 
              // 获取 PascalCase 命名
              const modulesName = name || path.replace(/^\.\/(.*)\.\w+$/, "$1");

              modules[modulesName] = { ...module }; 
            }
        }

    } catch (error) {
      console.log(error);
    }

    return modules;
}

/**
 * 验证 Store 位置
 * @author LiQingSong
 */
export function validateStorePath(filePath: string): boolean {

  let storeDirBool: boolean = false;
  let viewsDirBool: boolean = false;

  const storePath = path.resolve(__dirname, '../store');
  const viewsPath = path.resolve(__dirname, '../views');

  storeDirBool = filePath.replace(storePath, '') !== filePath;

  const filePathViews = filePath.replace(viewsPath, '');
  if(filePathViews !== filePath) {
    viewsDirBool = filePathViews.replace('store.ts', '') !== filePathViews;
  }
 
  // console.log('....validateStorePath....', storeDirBool, viewsDirBool);
  
  return storeDirBool || viewsDirBool;
}

/**
 * Stroe Vite Plugin
 * @author LiQingSong
 */
export function vitePluginStore(): Plugin {

  return {
    name: 'vite-plugin-store',
    configureServer(server: ViteDevServer) { 
      
        server.watcher.on("all",(eventName, filePath)=> {
          
          if ((eventName === 'add' || eventName === 'unlink')) {

            if(validateStorePath(filePath)) {
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
 