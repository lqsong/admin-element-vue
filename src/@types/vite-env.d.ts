/// <reference types="vite/client" />

/**
 * @description: vue 文件定义
 */
declare module "*.vue" {
	import type { DefineComponent } from "vue";
	const component: DefineComponent<{}, {}, any>;
	export default component;
}

/**
 * @description: vite import.meta.env 变量
 */
interface ImportMetaEnv {
	readonly VITE_APP_API_URL: string; // api接口域名
	// 更多环境变量...
}

/**
 * @description: vite import.meta.env 变量
 */
interface ImportMeta {
	readonly env: ImportMetaEnv;
}
