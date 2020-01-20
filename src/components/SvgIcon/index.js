/**
 * 自定义 svg icon
 * @author LiQingSong
 * 使用说明：
 *   1、下载或制作svg文件，存放到/src/assets/icons/svg目录下
 *   2、运行 npm run svgo 可压缩精简svg
 *   3、Vue文件中使用Demo：<svg-icon icon-class="svg文件名" /> 
 */
import Vue from 'vue';
import SvgIcon from './SvgIcon.vue';

Vue.component('svg-icon', SvgIcon);

const req = require.context('../../assets/icons/svg', false, /\.svg$/);
const requireAll = requireContext => requireContext.keys().map(requireContext);
requireAll(req);