<template>    
      <el-card shadow="never" class="cus-card homeBoxCard" v-loading="loading">
          <template #header>
            <span>{{t('page.home.articlechartcard.card-title')}}</span>
            <el-tag class="float-right">{{t('page.home.text-day')}}</el-tag>
          </template>
          <div class="num">{{visitData.num.toLocaleString()}}</div>
          <div class="height40">
            <div class="articleText">
                <span>
                {{t('page.home.text-daycompare')}}
                {{Math.abs(visitData.day)}}%
                    <icon-svg type="arrow-up" class="colored4014" v-if="visitData.day > 0"></icon-svg>
                    <icon-svg type="arrow-down" class="color19be6b" v-else></icon-svg>
                </span>
                <span class="margin-l10">
                {{t('page.home.text-weekcompare')}}
                {{Math.abs(visitData.week)}}%
                    <icon-svg type="arrow-up" class="colored4014" v-if="visitData.week > 0"></icon-svg>
                    <icon-svg type="arrow-down" class="color19be6b" v-else></icon-svg>
                </span>
            </div>
          </div>
          <el-divider />
          <el-row>
            <el-col :span="12">{{t('page.home.text-total')}}</el-col>
            <el-col class="text-align-right" :span="12">
                {{visitData.total.toLocaleString()}}
            </el-col>
          </el-row>
      </el-card>   
</template>
<script lang="ts">
import { reactive,  defineComponent, onMounted, Ref, ref } from "vue";
import { useI18n } from "vue-i18n";
import IconSvg from "@/components/IconSvg";
import { ArticleChartDataType } from "./data.d";
import { ResponseData } from '@/utils/request';
import { dailynewArticles } from "./service";

interface ArticleChartCardSetupData {
    t: (key: string | number) => string;
    loading: Ref<boolean>;
    visitData:  ArticleChartDataType;
}

export default defineComponent({
    name: 'ArticleChartCard',
    components: {
        IconSvg
    },
    setup(): ArticleChartCardSetupData {
        const { t } = useI18n();

        // 数据
        const visitData = reactive<ArticleChartDataType>({
          total: 0,
          num: 0,
          week: 0,
          day: 0
        });
      
        // 读取数据 func
        const loading = ref<boolean>(true);
        const getData = async () => {
            loading.value = true;           
            const response: ResponseData = await dailynewArticles();
            const { data } = response;
            visitData.total = data.total || 0;
            visitData.num = data.num || 0;
            visitData.week = data.week || 0;
            visitData.day = data.day || 0;
            loading.value = false;
        }

        onMounted(()=> {
           getData();
        })

        return {
            t,
            loading,
            visitData
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
  .articleText {
    padding-top: 20px;
  }
  .color19be6b {
    color: #19be6b;
  }
  .colored4014 {
    color: #ed4014;
  }
}
</style>