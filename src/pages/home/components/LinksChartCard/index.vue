<script setup lang="ts">
import { reactive, ref } from "vue";

import useEcharts, { EChartsOption } from "@/composables/useEcharts";

import { IResponseData } from "@/@types/utils.request";
import { IWorksChartData } from "./data";
import { annualnewLinks } from "./service";

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
			/* '2019-04', '2019-05', '2019-06','2019-07', '2019-08', '2019-09', '2019-10', '2019-11', '2019-12', '2020-01', '2020-02', '2020-03' */
		],
	},
	yAxis: {
		show: false,
	},
	series: [
		{
			name: "新增",
			type: "bar",
			data: [
				/* 5888, 3838, 15880, 12888, 18888, 16888,5888, 3838, 15880, 12888, 18888, 16888 */
			],
			itemStyle: {
				color: "#48D8BF",
			},
		},
	],
};
const chartRef = ref<HTMLDivElement>();
useEcharts(chartRef, chartOption, async (chart) => {
	try {
		if (loading.value === true) {
			chart.showLoading();
		}
		const response: IResponseData<any> = await annualnewLinks();
		const { data } = response;

		visitData.total = data.total || 0;
		visitData.num = data.num || 0;
		visitData.chart = data.chart || {
			day: [],
			num: [],
		};

		const option: EChartsOption = {
			xAxis: {
				// data: ["03-01", "03-01", "03-01", "03-01", "03-01", "03-01", "03-01"]
				data: visitData.chart.day,
			},
			series: [
				{
					name: "新增",
					// data: [3, 1, 1, 2, 2, 2, 2]
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
			<span>左邻右舍</span>
			<el-tag type="danger" class="float-right">年</el-tag>
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
