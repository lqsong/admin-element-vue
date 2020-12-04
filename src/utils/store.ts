/**
 * Store utils
 * @author LiQingSong
 */
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
        const viewsRequireContext: __WebpackModuleApi.RequireContext = require.context('../views', true, /[/\\]store\.ts$/); 
        viewsRequireContext.keys().forEach(fileName => {
            // 获取内容
            const modulesConent = viewsRequireContext(fileName);
            if(modulesConent.default) {
              const { name, ...module } = modulesConent.default; 
              // 获取 PascalCase 命名
              const modulesName = name || fileName.replace(/^\.\/(.*)\.\w+$/, "$1");
            
              modules[modulesName] = { ...module }; 
            }

        });  
        
        // 导入 @/store 下文件 
        const requireContext: __WebpackModuleApi.RequireContext = require.context('../store', false, /\.ts$/);    
        requireContext.keys().forEach(fileName => {
          // 获取内容
          const modulesConent = requireContext(fileName);
          if(modulesConent.default) {
              const { name, ...module } = modulesConent.default; 
              // 获取 PascalCase 命名
              const modulesName = name || fileName.replace(/^\.\/(.*)\.\w+$/, "$1");
            
              modules[modulesName] = { ...module }; 
          }
          
        });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }

    return modules;
}
 