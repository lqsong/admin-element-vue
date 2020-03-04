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
                    meta: { title: '样例1', roles: ['chartstatistic-echarts-one'] }
                },
                {
                    path: 'two',
                    component: () => import('@/views/Chartstatistic/Echarts/one'),
                    name: 'chartstatistic-echarts-two',
                    meta: { title: '样例2', roles: ['chartstatistic-echarts-two'] }
                }
            ]
        },
        {
            path: 'highcharts',
            component: AppMainLayout,
            redirect: '/chartstatistic/highcharts/one',
            name: 'chartstatistic-highcharts',
            meta: { 
                title: 'Highcharts',
                icon: 'chart',
                roles: ['chartstatistic-highcharts']
            },
            children: [
                {
                    path: 'one',
                    component: () => import('@/views/Chartstatistic/Highcharts/one'),
                    name: 'chartstatistic-highcharts-one',
                    meta: { title: '样例1', roles: ['chartstatistic-highcharts-one'] }
                }
            ]
        }
        
        
    ]
};

export default chartstatisticRouter;
