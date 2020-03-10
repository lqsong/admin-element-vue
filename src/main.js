/**
 * 入口
 * @author LiQingSong
 */
import Vue from 'vue';

// CSS 重置 初始化
import 'normalize.css/normalize.css';

// 引入 ElementUI
import ElementUI from 'element-ui';
import '@/assets/css/element-variables.scss';

// 全局样式
import '@/assets/css/global.scss';

import App from './App.vue';
import router from './router';
import store from './store';

// 自定义svg icon
import '@/components/SvgIcon';

// 权限控制
import '@/router/permission';

// 引入扩展内容
import '@/main.ext';

// 设置 ElementUI
Vue.use(ElementUI, { size: 'small' });
// 如果想要 设置语言，按照，如下方式声明
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n
// Vue.use(ElementUI, { locale })


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
