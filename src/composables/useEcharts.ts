import { onMounted, onBeforeUnmount, Ref, ref, nextTick } from 'vue';
import debounce from 'lodash.debounce';
import * as echarts from 'echarts';

export type EChartsOption = echarts.EChartsOption;

export default function useEcharts(
    labRef: Ref<HTMLDivElement | HTMLCanvasElement | undefined>, 
    initOption: EChartsOption, 
    theme = ''
    ): Ref<echarts.ECharts | undefined> {


    const chart = ref<echarts.ECharts>();
    
    const resizeHandler = debounce(() => {
        chart.value?.resize();
    }, 100);
    
    onMounted(async ()=> {
        await nextTick();

        if(labRef.value) {
            chart.value = echarts.init(labRef.value, theme);
            chart.value.setOption(initOption);
        }
        
        window.addEventListener('resize', resizeHandler);
    })

    onBeforeUnmount(()=> {
        chart.value?.dispose();            
        window.removeEventListener('resize', resizeHandler);
    });

    return chart;
}