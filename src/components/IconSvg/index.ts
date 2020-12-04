import iconsvg from "./index.vue";

/**
 * 自动导入 @/assets/iconsvg 下svg文件
 * @author LiQingSong
 */
export function importAllSvg (): void {
    try {  
        const requireContext: __WebpackModuleApi.RequireContext = require.context('../../assets/iconsvg', false, /\.svg$/);
        requireContext.keys().forEach(requireContext);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
    }
}

export default iconsvg;