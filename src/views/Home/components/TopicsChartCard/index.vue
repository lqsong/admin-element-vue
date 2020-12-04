<template>
  
      <el-card shadow="never" class="cus-card homeBoxCard" v-loading="loading">          
          <template #header>
            <span>{{t('page.home.topicschartcard.card-title')}}</span>
            <el-tag type="warning" class="float-right">{{t('page.home.text-month')}}</el-tag>
          </template> 
          <div class="num">{{num.toLocaleString()}}</div>
          <div class="height40" ref="topicsChartRef" />
          <el-divider />
          <el-row>
            <el-col :span="12">{{t('page.home.text-total')}}</el-col>
            <el-col class="text-align-right" :span="12">
              {{total.toLocaleString()}}
            </el-col>
          </el-row>
      </el-card>

</template>
<script lang="ts">
import { computed, defineComponent, onMounted, Ref, ref, watch } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { EChartOption } from 'echarts';
import useEcharts from '@/composables/useEcharts';
import { StateType as HomeStateType } from "../../store";
import { ChartDataType } from "../../data";

const topicsChartOption: EChartOption = {
  tooltip: {
    trigger: 'axis',
  },
  grid: {
    left: '0',
    right: '0',
    top: '0',
    bottom: '0',
  },
  xAxis: {
    show: false,
    data: [
      /* '03-01','03-02','03-03','03-04','03-05','03-06','03-07','03-08','03-09','03-10','03-11','03-12','03-13','03-15','03-15','03-16','03-17','03-18','03-19','03-20','03-21','03-22','03-23','03-24','03-25','03-26','03-27','03-28','03-29','03-30' */
    ],
  },
  yAxis: {
    show: false,
  },
  series: [
    {
      name: '新增',
      type: 'line',
      data: [
        /* 23,60,20,36,23,85,23,60,20,36,23,85,23,60,20,36,23,85,23,60,20,36,23,85,23,60,20,36,23,85 */
      ],
      lineStyle: {
        width: 3,
        color: {
          type: 'linear',
          colorStops: [
            {
              offset: 0,
              color: '#A9F387', // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#48D8BF', // 100% 处的颜色
            },
          ],
          globalCoord: false, // 缺省为 false
        } as any,
        shadowColor: 'rgba(72,216,191, 0.3)',
        shadowBlur: 10,
        shadowOffsetY: 20,
      },
      itemStyle: {
        borderWidth: 6,
        borderColor: '#A9F387',
      },
      smooth: true,
    },
  ],
};

interface TopicsChartCardSetupData {
    t: Function;
    loading: boolean;
    topicsChartRef: Ref;
    total: number;
    num: number;
}

export default defineComponent({
    name: 'TopicsChartCard',
    setup(): TopicsChartCardSetupData {
        const store = useStore<{ Home: HomeStateType}>();
        const { t } = useI18n();

        // 总数
        const total = computed<number>(() => store.state.Home.topicsChartData.total);
        // num
        const num = computed<number>(() => store.state.Home.topicsChartData.num);
        // chart Data
        const chartData = computed<ChartDataType>(()=> store.state.Home.topicsChartData.chart);

        // echarts 图表
        const topicsChartRef = ref<HTMLDivElement>();
        const echarts = useEcharts(topicsChartRef, topicsChartOption);      
        watch([echarts, chartData],()=> {
          if(echarts.value) {
              const option: EChartOption = {
                xAxis: {
                  // data: ["03-01", "03-01", "03-01", "03-01", "03-01", "03-01", "03-01"]
                  data: chartData.value.day,
                },
                series: [
                  {
                    name: '新增',
                    // data: [3, 1, 1, 2, 2, 2, 2]
                    data: chartData.value.num,
                  },
                ],
              };              
              echarts.value.setOption(option);
          }
        }); 

        // 读取数据 func
        const loading = ref<boolean>(true);
        const getData = async () => {
            loading.value = true;
            await store.dispatch('Home/queryTopicsChartData');
            loading.value = false;
        };

        onMounted(()=> {
           getData();
        });

        return {
            t,
            loading: loading as unknown as boolean,
            topicsChartRef,
            total: total as unknown as number,
            num: num as unknown as number,
        }
    }
})
</script>
<style lang="scss" scoped>
.homeBoxCard {
  margin-bottom: 24px;
  ::v-deep(.el-card__header) {
    padding-left: 12px;
    padding-right: 12px;
  }
  ::v-deep(.el-card__body) {
    padding: 12px;
    font-size: 14px;
    line-height: 1.5715;
  }
  ::v-deep(.el-divider) {
    margin: 8px 0;
  }
  .num {
    font-size: 30px;
    color: #515a6e;
  }
  .height40 {
    height: 40px;
  }
}
</style>