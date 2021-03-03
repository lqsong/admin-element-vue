<template>
      <el-card shadow="never" class="cus-card homeBoxCard" v-loading="loading">
          <template #header>
            <span>{{t('page.home.linkschartcard.card-title')}}</span>
            <el-tag type="warning" class="float-right">{{t('page.home.text-years')}}</el-tag>
          </template> 
          <div class="num">{{num.toLocaleString()}}</div>
          <div class="height40" ref="linksChartRef" />
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

const linksChartOption: EChartOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
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
      /* '2019-04', '2019-05', '2019-06','2019-07', '2019-08', '2019-09', '2019-10', '2019-11', '2019-12', '2020-01', '2020-02', '2020-03' */
    ],
  },
  yAxis: {
    show: false,
  },
  series: [
    {
      name: '新增',
      type: 'bar',
      data: [
        /* 5888, 3838, 15880, 12888, 18888, 16888,5888, 3838, 15880, 12888, 18888, 16888 */
      ],
    },
  ],
};

interface LinksChartCardSetupData {
    t: Function;
    loading: boolean;
    linksChartRef: Ref;
    total: number;
    num: number;
}

export default defineComponent({
    name: 'LinksChartCard',
    setup(): LinksChartCardSetupData {
        const store = useStore<{ Home: HomeStateType}>();
        const { t } = useI18n();

        // 总数
        const total = computed<number>(() => store.state.Home.linksChartData.total);
        // num
        const num = computed<number>(() => store.state.Home.linksChartData.num);
        // chart Data
        const chartData = computed<ChartDataType>(()=> store.state.Home.linksChartData.chart);

        // echarts 图表
        const linksChartRef = ref<HTMLDivElement>();
        const echarts = useEcharts(linksChartRef, linksChartOption);      
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
            await store.dispatch('Home/queryLinksChartData');
            loading.value = false;
        };

        onMounted(()=> {
           getData();
        });


        return {
            t,
            loading: loading as unknown as boolean,
            linksChartRef,
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