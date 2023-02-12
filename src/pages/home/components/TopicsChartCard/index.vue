<script setup lang="ts">
import { reactive, ref } from "vue";

import useEcharts, { EChartsOption } from "@/composables/useEcharts";

import { IResponseData } from "@/@types/utils.request";
import { IWorksChartData } from "./data";
import { monthnewTopics } from "./service";

// 数据
const visitData = reactive<IWorksChartData>({
	total: 0,
	num: 0,
	chart: {
		day: [],
		num: [],
	},
});

const loading = ref<boolean>(true);

// echarts 图表
const chartOption: EChartsOption = {
	tooltip: {},
	grid: {
		left: "0",
		right: "0",
		top: "0",
		bottom: "0",
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
			name: "新增",
			type: "line",
			data: [
				/* 23,60,20,36,23,85,23,60,20,36,23,85,23,60,20,36,23,85,23,60,20,36,23,85,23,60,20,36,23,85 */
			],
			lineStyle: {
				width: 3,
				color: {
					type: "linear",
					colorStops: [
						{
							offset: 0,
							color: "#A9F387", // 0% 处的颜色
						},
						{
							offset: 1,
							color: "#48D8BF", // 100% 处的颜色
						},
					],
					globalCoord: false, // 缺省为 false
				} as any,
				shadowColor: "rgba(72,216,191, 0.3)",
				shadowBlur: 10,
				shadowOffsetY: 20,
			},
			itemStyle: {
				borderWidth: 6,
				borderColor: "#A9F387",
				color: "#48D8BF",
			},
			smooth: true,
		},
	],
};
const chartRef = ref<HTMLDivElement>();
useEcharts(chartRef, chartOption, async (chart) => {
	try {
		if (loading.value === true) {
			chart.showLoading();
		}
		const response: IResponseData<any> = await monthnewTopics();
		const { data } = response;

		visitData.total = data.total || 0;
		visitData.num = data.num || 0;
		visitData.chart = data.chart || {
			day: [],
			num: [],
		};

		const option: EChartsOption = {
			xAxis: {
				data: visitData.chart.day,
			},
			series: [
				{
					name: "新增",
					data: visitData.chart.num,
				},
			],
		};
		chart.setOption(option);
		chart.hideLoading();
		loading.value = false;
	} catch (error) {
		console.log(error);
	}
});
</script>
<template>
	<el-card shadow="never" class="homeBoxCard" v-loading="loading">
		<template #header>
			<span>专题</span>
			<el-tag type="warning" class="float-right">月</el-tag>
		</template>

		<div class="num">{{ visitData.num.toLocaleString() }}</div>

		<div class="height40" ref="chartRef" />

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
}
</style>
