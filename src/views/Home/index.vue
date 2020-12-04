<template>
  <div class="indexlayout-main-conent">
    <el-row :gutter="24">
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
        <ArticleChartCard />
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
        <WorksChartCard />
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
        <TopicsChartCard />
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
        <LinksChartCard />
      </el-col>
    </el-row>

    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <HotSearchCard />
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <HotTagsCard />
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <ArticleHitCard />
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <WorksHitCard />
      </el-col>
    </el-row>
    
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue";

import PageLoading from './components/PageLoading/index.vue';
const ArticleChartCard = defineAsyncComponent({
  loader: () => import('./components/ArticleChartCard/index.vue'),
  loadingComponent: PageLoading
});
const WorksChartCard = defineAsyncComponent({
  loader:  () => import('./components/WorksChartCard/index.vue'),
  loadingComponent: PageLoading
});
const TopicsChartCard = defineAsyncComponent({
  loader:  () => import('./components/TopicsChartCard/index.vue'),
  loadingComponent: PageLoading
});
const LinksChartCard = defineAsyncComponent({
  loader:  () => import('./components/LinksChartCard/index.vue'),
  loadingComponent: PageLoading
});
const HotSearchCard = defineAsyncComponent({
  loader:  () => import('./components/HotSearchCard/index.vue'),
  loadingComponent: PageLoading
});
const HotTagsCard = defineAsyncComponent({
  loader:  () => import('./components/HotTagsCard/index.vue'),
  loadingComponent: PageLoading
});
const ArticleHitCard = defineAsyncComponent({
  loader:  () => import('./components/ArticleHitCard/index.vue'),
  loadingComponent: PageLoading
});
const WorksHitCard = defineAsyncComponent({
  loader:  () => import('./components/WorksHitCard/index.vue'),
  loadingComponent: PageLoading
});

export default defineComponent({
  name: 'Home',
  components: {
    ArticleChartCard,
    WorksChartCard,
    TopicsChartCard,
    LinksChartCard,
    HotSearchCard,
    HotTagsCard,
    ArticleHitCard,
    WorksHitCard
  }

});
</script>
