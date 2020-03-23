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
                }
            ]
        }
        
        
    ]
};

export default componentsRouter;
