/**
 * 图表统计-路由配置
 * @author LiQingSong
 */
import LayoutIndex from '@/layout/Index';
import AppMainLayout from '@/layout/components/AppMain';

const chartstatisticRouter = {
    path: '/chartstatistic',
    component: LayoutIndex,
    redirect: '/chartstatistic/echarts/one',
    name: 'chartstatistic',
    meta: {
        title: '图表统计',
        icon: 'chart',
        roles: ['chartstatistic']
    },
    children: [
        {
            path: 'echarts',
            component: AppMainLayout,
            redirect: '/chartstatistic/echarts/one',
            name: 'chartstatistic-echarts',
            meta: { 
                title: 'ECharts',
                icon: 'chart',
                roles: ['chartstatistic-echarts']
            },
            children: [
                {
                    path: 'one',
                    component: () => import('@/views/Chartstatistic/Echarts/one'),
                    name: 'chartstatistic-echarts-one',
                    meta: { title: '基础引用', roles: ['chartstatistic-echarts-one'] }
                },
                {
                    path: 'two',
                    component: () => import('@/views/Chartstatistic/Echarts/two'),
                    name: 'chartstatistic-echarts-two',
                    meta: { title: '更换主题', roles: ['chartstatistic-echarts-two'] }
                }
            ]
        }
        
        
    ]
};

export default chartstatisticRouter;
