<template>
   
      <el-card shadow="never" class="cus-card homeBoxCard" v-loading="loading">
          <template #header>
            <span>{{t('page.home.workschartcard.card-title')}}</span>
            <el-tag type="success" class="float-right">{{t('page.home.text-week')}}</el-tag>
          </template>            
          <div class="num">{{num.toLocaleString()}}</div>
          <div class="height40" ref="worksChartRef" />
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
import { computed, defineComponent, reactive, Ref, ref, ComputedRef } from "vue";
import { useI18n } from "vue-i18n";
import useEcharts, { EChartsOption } from '@/composables/useEcharts';
import { WorksChartDataType } from "./data.d";
import { ResponseData } from '@/utils/request';
import { weeknewWorks } from "./service";

const worksChartOption: EChartsOption = {
  tooltip: {
  },
  grid: {
    left: '0',
    right: '0',
    top: '0',
    bottom: '0',
  },
  xAxis: {
    show: false,
    boundaryGap: false,
    data: [
      //'03-01','03-02','03-03','03-04','03-05','03-06','03-07'
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
        //23,60,20,36,23,85,23
      ],
      areaStyle: {
        color: {
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
      },
      lineStyle: {
        width: 0,
      },
      itemStyle: {
        borderWidth: 2,
        color: '#48D8BF'
      },
    },
  ],
};

interface WorksChartCardSetupData {
    t: (key: string | number) => string;
    loading: Ref<boolean>;
    worksChartRef: Ref;
    total: ComputedRef<number>;
    num: ComputedRef<number>;
}

export default defineComponent({
    name: 'WorksChartCard',
    setup(): WorksChartCardSetupData {
        const { t } = useI18n();

        // 数据
        const visitData = reactive<WorksChartDataType>({
          total: 0,
          num: 0,
          chart: {
            day: [],
            num: [],
          }
        });

        // 总数
        const total = computed<number>(() => visitData.total);
        // num
        const num = computed<number>(() => visitData.num);
      
        const loading = ref<boolean>(true);
        // echarts 图表
        const worksChartRef = ref<HTMLDivElement>();
        useEcharts(worksChartRef, worksChartOption, async (chart)=> {
            loading.value = true;

            const response: ResponseData = await weeknewWorks();
            const { data } = response;
            visitData.total = data.total || 0;
            visitData.num = data.num || 0;
            visitData.chart = data.chart || {
              day: [],
              num: [],
            }

            const option: EChartsOption = {
              xAxis: {
                data: visitData.chart.day,
              },
              series: [
                {
                  name: '新增',
                  data: visitData.chart.num,
                },
              ],
            };
            chart.setOption(option);
            
            loading.value = false;
        });
       
       
        return {
            t,
            loading,
            worksChartRef,
            total,
            num,
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