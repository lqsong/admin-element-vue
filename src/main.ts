import { createApp } from 'vue';

// 样式初始化
import 'normalize.css';

// 全局样式
import '@/assets/css/global.scss';

// 引入 ElementUI
import ElementPlus from 'element-plus';

// 导入 svg
import { importAllSvg } from "@/components/IconSvg/index";
importAllSvg();

import App from '@/App.vue';
import router from '@/config/routes';
import store from '@/config/store';
import i18n, { elementPlusMessages } from '@/config/i18n';

const app = createApp(App)
app.use(store);
app.use(router)
app.use(ElementPlus, { size: 'small', locale: elementPlusMessages[i18n.global.locale.value] });
app.use(i18n);
app.mount('#app');