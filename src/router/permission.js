/** 
 * 权限验证
 * @author LiQingSong
 */
import router from './index';
import store from '@/store';
import { Message } from 'element-ui';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import { siteTitle, siteLoginRouter, serverLoginUrl } from '@/settings';
import { isExternal } from '@/utlis/validate';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

// 不验证重定向的白名单
const whiteList = [
    siteLoginRouter
];

router.beforeEach(async(to, from, next) => {
    // start progress bar
    NProgress.start();

    // 设置网页 title
    document.title = (to.meta && to.meta.title) + ' - ' + siteTitle;

    if (whiteList.indexOf(to.path) !== -1) {
        // 在白名单中，直接进入
        next();
    } else {
        const hasRoles = store.getters.roles && store.getters.roles.length > 0;
        if (hasRoles) {
            next();
        } else {
            try {

                // 获取用户角色权限
                // 注意:角色必须是一个对象数组! 例如: ['admin'] or ,['test','edit']
                const { roles } = await store.dispatch('user/getInfo');
                // console.log(roles);

                // 根据角色生成可访问路由映射
                const accessRoutes = await store.dispatch('permission/generateRoutes', roles);

                // 动态添加可访问路由
                router.addRoutes(accessRoutes);
                
                // 设置replace: true，这样导航就不会留下历史记录
                next({ ...to, replace: true });

            } catch (error) {
                // 删除Token
                await store.dispatch('user/resetToken');

                Message.error(error || 'Has Error');
                
                // 跳转到登录
                if (isExternal(serverLoginUrl)) {
                    window.location.href = serverLoginUrl;
                } else {
                    next(siteLoginRouter + "?redirect=" + to.fullPath);
                }
                NProgress.done();
            }
        }
    }
});

router.afterEach(() => {
    // finish progress bar
    NProgress.done();
});

