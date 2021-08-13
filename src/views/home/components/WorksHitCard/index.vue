<template>
    <el-card shadow="never" class="cus-card homeBoxCard">
        <template #header>
            <span>{{t('page.home.workshitcard.card-title')}}</span>
        </template>
    
        <el-table
          size="small"
          row-key="id"
          header-row-class-name="custom-table-header"
          stripe
          v-loading="loading"
          :data="list"        
        >
          <el-table-column
            type="index"
            :label="t('page.home.workshitcard.card.table-column-number')"
            :index="indexMethod"
            width="80">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="title"
            :label="t('page.home.workshitcard.card.table-column-title')"
            >
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="hit"
            width="100"
            :label="t('page.home.workshitcard.card.table-column-hit')"
            >
          </el-table-column>
        
        </el-table>

        <div class="text-align-right padding-t10">
            <el-pagination
              small
              layout="prev, pager, next"
              v-model:current-page="pagination.current"
              :page-size="pagination.pageSize"
              :total="pagination.total"
              @current-change="(p) => {
                getList(p || 1);
              }">
            </el-pagination>
        </div>


    </el-card>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref, ComputedRef, Ref } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { StateType as HomeStateType } from "../../store";
import { PaginationConfig } from "../../data";
import { TableListItem } from "./data";

interface WorksHitCardSetupData {
    t: (key: string | number) => string;
    indexMethod: (index: number) => number;
    list: ComputedRef<TableListItem[]>;
    pagination: ComputedRef<PaginationConfig>;
    loading: Ref<boolean>;
    getList: (current: number) => Promise<void>;
}

export default defineComponent({
    name: 'WorksHitCard',
    setup(): WorksHitCardSetupData {
        const store = useStore<{ Home: HomeStateType}>();
        const { t } = useI18n();

        // 分页
        const pagination = computed<PaginationConfig>(() => store.state.Home.worksHitData.pagination);

        // 数据
        const list = computed<TableListItem[]>(()=> store.state.Home.worksHitData.list);

        // 表格索引
        const indexMethod = (index: number) => {
          return (pagination.value.current - 1) * pagination.value.pageSize + index + 1;
        }
        
        // 读取数据 func
        const loading = ref<boolean>(true);
        const getList = async (current: number): Promise<void> => {
            loading.value = true;
            await store.dispatch('Home/queryWorksHitData', {
                per: pagination.value.pageSize,
                page: current,
            });
            loading.value = false;
        }

        onMounted(()=> {
           getList(1);
        })


        return {
            t,
            indexMethod,
            list,
            pagination,
            loading,
            getList
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
}
</style>