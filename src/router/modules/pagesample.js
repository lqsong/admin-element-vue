/**
 * 页面示例-路由配置
 * @author LiQingSong
 */
import LayoutIndex from '@/layout/Index';
import AppMainLayout from '@/layout/components/AppMain';

const pagesampleRouter = {
    path: '/pagesample',
    component: LayoutIndex,
    redirect: '/pagesample/list/one',
    name: 'pagesample',
    meta: {
        title: '页面示例',
        icon: 'page',
        roles: ['pagesample']
    },
    children: [
        {
            path: 'list',
            component: AppMainLayout,
            redirect: '/pagesample/list/one',
            name: 'pagesample-list',
            meta: { 
                title: '列表页面',
                icon: 'page',
                roles: ['pagesample-list']
            },
            children: [
                {
                    path: 'one',
                    component: () => import('@/views/Pagesample/List/one'),
                    name: 'pagesample-list-one',
                    meta: { title: '样例1', roles: ['pagesample-list-one'] }
                },
                {
                    path: 'two',
                    component: () => import('@/views/Pagesample/List/one'),
                    name: 'pagesample-list-two',
                    meta: { title: '样例2', roles: ['pagesample-list-two'] }
                }
                
            ]
        },
        {
            path: 'form',
            component: AppMainLayout,
            redirect: '/pagesample/form/one',
            name: 'pagesample-form',
            meta: { 
                title: '表单页面',
                icon: 'page',
                roles: ['pagesample-form']
            },
            children: [
                {
                    path: 'one',
                    component: () => import('@/views/Pagesample/Form/one'),
                    name: 'pagesample-form-one',
                    meta: { title: '样例1', roles: ['pagesample-form-one'] }
                }
                
            ]
        }
        
        
        
    ]
};

export default pagesampleRouter;
