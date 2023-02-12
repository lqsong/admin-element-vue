<script setup lang="ts">
import { reactive, ref } from "vue";

import useEcharts, { EChartsOption } from "@/composables/useEcharts";

import { IResponseData } from "@/@types/utils.request";
import { IWorksChartData } from "./data";
import { weeknewWorks } from "./service";

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
			name: "新增",
			type: "line",
			data: [
				//23,60,20,36,23,85,23
			],
			areaStyle: {
				color: {
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
			},
			lineStyle: {
				width: 0,
			},
			itemStyle: {
				borderWidth: 2,
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
		const response: IResponseData<any> = await weeknewWorks();
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
			<span>作品</span>
			<el-tag type="success" class="float-right">周</el-tag>
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
