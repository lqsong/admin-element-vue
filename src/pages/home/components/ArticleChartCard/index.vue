<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import IconSvg from "@/components/IconSvg/index.vue";

import { IResponseData } from "@/@types/utils.request";
import { IArticleChartData } from "./data";
import { dailynewArticles } from "./service";

// 数据
const visitData = reactive<IArticleChartData>({
	total: 0,
	num: 0,
	week: 0,
	day: 0,
});

// 读取数据
const loading = ref<boolean>(true);
const getData = async () => {
	loading.value = true;
	const response: IResponseData<any> = await dailynewArticles();
	const { data } = response;
	visitData.total = data.total || 0;
	visitData.num = data.num || 0;
	visitData.week = data.week || 0;
	visitData.day = data.day || 0;
	loading.value = false;
};

onMounted(() => {
	getData();
});
</script>
<template>
	<el-card shadow="never" class="homeBoxCard" v-loading="loading">
		<template #header>
			<span>随笔</span>
			<el-tag class="float-right">日</el-tag>
		</template>

		<div class="num">{{ visitData.num.toLocaleString() }}</div>

		<div class="height40">
			<div class="articleText">
				<span>
					日同比
					{{ Math.abs(visitData.day) }}%
					<IconSvg name="arrow-up" class="colored4014" v-if="visitData.day > 0"></IconSvg>
					<IconSvg name="arrow-down" class="color19be6b" v-else></IconSvg>
				</span>

				<span class="margin-l10">
					周同比
					{{ Math.abs(visitData.week) }}%
					<IconSvg name="arrow-up" class="colored4014" v-if="visitData.week > 0"></IconSvg>
					<IconSvg name="arrow-down" class="color19be6b" v-else></IconSvg>
				</span>
			</div>
		</div>

		<el-divider />

		<el-row>
			<el-col :span="12">总数量</el-col>
			<el-col class="text-align-right" :span="12"> {{ visitData.total.toLocaleString() }} </el-col>
		</el-row>
	</el-card>
</template>
<style lang="scss" scoped>
.homeBoxCard {
	/* stylelint-disable-next-line selector-pseudo-element-no-unknown */
	::v-deep(.el-card__header) {
		padding-right: 12px;
		padding-left: 12px;
	}
	/* stylelint-disable-next-line selector-pseudo-element-no-unknown */
	::v-deep(.el-card__body) {
		padding: 12px;
		font-size: 14px;
		line-height: 1.5715;
	}
	/* stylelint-disable-next-line selector-pseudo-element-no-unknown */
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
