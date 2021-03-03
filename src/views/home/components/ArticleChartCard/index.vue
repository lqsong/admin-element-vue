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
                    <i class="el-icon-caret-top colored4014" v-if="visitData.day > 0" ></i>
                    <i v-else class="el-icon-caret-bottom color19be6b" ></i>
                </span>
                <span class="margin-l10">
                {{t('page.home.text-weekcompare')}}
                {{Math.abs(visitData.week)}}%
                    <i class="el-icon-caret-top colored4014" v-if="visitData.week > 0" ></i>
                    <i v-else class="el-icon-caret-bottom color19be6b" ></i>
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
import { computed, defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { ArticleChartDataType } from "../../data.d";
import { StateType as HomeStateType } from "../../store";

interface ArticleChartCardSetupData {
    t: Function;
    loading: boolean;
    visitData: ArticleChartDataType;
}

export default defineComponent({
    name: 'ArticleChartCard',
    setup(): ArticleChartCardSetupData {
        const store = useStore<{ Home: HomeStateType}>();
        const { t } = useI18n();

        // 数据
        const visitData = computed<ArticleChartDataType>(()=> store.state.Home.articleChartData);
        // 读取数据 func
        const loading = ref<boolean>(true);
        const getData = async () => {
            loading.value = true;
            await store.dispatch('Home/queryArticleChartData');
            loading.value = false;
        }

        onMounted(()=> {
           getData();
        })

        return {
            t,
            loading: loading as unknown as boolean,
            visitData: visitData as unknown as ArticleChartDataType
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