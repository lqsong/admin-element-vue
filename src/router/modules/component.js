/**
 * 组件-路由配置
 * @author LiQingSong
 */
import LayoutIndex from '@/layout/Index';
import AppMainLayout from '@/layout/components/AppMain';

const componentsRouter = {
    path: '/component',
    component: LayoutIndex,
    redirect: '/component/editor/one',
    name: 'component',
    meta: {
        title: '组件',
        icon: 'components',
        roles: ['component']
    },
    children: [
        {
            path: 'editor',
            component: AppMainLayout,
            redirect: '/component/editor/one',
            name: 'component-editor',
            meta: { 
                title: '编辑器',
                icon: 'editor',
                roles: ['component-editor']
            },
            children: [
                {
                    path: 'one',
                    component: () => import('@/views/Component/Editor/one'),
                    name: 'component-editor-one',
                    meta: { title: 'tui-editor', roles: ['component-editor-one'] }
                },
                {
                    path: 'two',
                    component: () => import('@/views/Component/Editor/two'),
                    name: 'component-editor-two',
                    meta: { title: 'CKEditor', roles: ['component-editor-two'] }
                }
            ]
        },
        {
            path: 'other',
            component: AppMainLayout,
            redirect: '/component/other/one',
            name: 'component-other',
            meta: { 
                title: '其他',
                icon: 'other',
                roles: ['component-other']
            },
            children: [
                {
                    path: 'one',
                    component: () => import('@/views/Component/Other/one'),
                    name: 'component-other-one',
                    meta: { title: 'SVG图标', roles: ['component-other-one'] }
                }
            ]
        }
        
        
    ]
};

export default componentsRouter;
