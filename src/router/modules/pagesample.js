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
                icon: 'pagelist',
                roles: ['pagesample-list']
            },
            children: [
                {
                    path: 'one',
                    component: () => import('@/views/Pagesample/List/one'),
                    name: 'pagesample-list-one',
                    meta: { title: '标准列表', roles: ['pagesample-list-one'] }
                },
                {
                    path: 'two',
                    component: () => import('@/views/Pagesample/List/two'),
                    name: 'pagesample-list-two',
                    meta: { title: '查询列表', roles: ['pagesample-list-two'] }
                },
                {
                    path: 'three',
                    component: () => import('@/views/Pagesample/List/three'),
                    name: 'pagesample-list-three',
                    meta: { title: '高度自适应列表', roles: ['pagesample-list-three'] }
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
                icon: 'pageform',
                roles: ['pagesample-form']
            },
            children: [
                {
                    path: 'one',
                    component: () => import('@/views/Pagesample/Form/one'),
                    name: 'pagesample-form-one',
                    meta: { title: '基础表单', roles: ['pagesample-form-one'] }
                },
                {
                    path: 'two',
                    component: () => import('@/views/Pagesample/Form/two'),
                    name: 'pagesample-form-two',
                    meta: { title: '高级表单', roles: ['pagesample-form-two'] }
                }
                
            ]
        },
        {
            path: 'detail',
            component: AppMainLayout,
            redirect: '/pagesample/detail/one',
            name: 'pagesample-detail',
            meta: { 
                title: '详情页面',
                icon: 'pagedetails',
                roles: ['pagesample-detail']
            },
            children: [
                {
                    path: 'one',
                    component: () => import('@/views/Pagesample/Detail/one'),
                    name: 'pagesample-detail-one',
                    meta: { title: '基础详情', roles: ['pagesample-detail-one'] }
                },
                {
                    path: 'two',
                    component: () => import('@/views/Pagesample/Detail/two'),
                    name: 'pagesample-detail-two',
                    meta: { title: '模块详情', roles: ['pagesample-detail-two'] }
                },
                {
                    path: 'three',
                    component: () => import('@/views/Pagesample/Detail/three'),
                    name: 'pagesample-detail-three',
                    meta: { title: '表格详情', roles: ['pagesample-detail-three'] }
                }
                
            ]
        }
        
        
        
    ]
};

export default pagesampleRouter;
