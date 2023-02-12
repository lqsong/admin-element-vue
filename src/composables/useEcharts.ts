import { onMounted, onBeforeUnmount, Ref, ShallowRef, shallowRef } from "vue";
import { debounce } from "lodash";
import * as echarts from "echarts";

export type EChartsOption = echarts.EChartsOption;

/**
 * Echarts composables
 * @param labRef Ref                 HTMLDivElement ref
 * @param initOption EChartOption    echarts option init
 * @param cb Function|undefined      回调函数 读取数据
 * @param theme string|undefined     使用的主题
 * @returns
 * @author LiQingSong
 */
export default function useEcharts(
	labRef: Ref<HTMLDivElement | HTMLCanvasElement | undefined>,
	initOption: EChartsOption,
	cb?: (ec: echarts.ECharts) => any,
	theme = "",
): {
	echart: ShallowRef<echarts.ECharts | undefined>;
	cb: () => void;
} {
	const chart = shallowRef<echarts.ECharts>();

	const resizeHandler = debounce(() => {
		chart.value?.resize();
	}, 100);

	const callback = () => {
		if (typeof cb === "function" && chart.value) {
			cb(chart.value);
		}
	};

	onMounted(() => {
		if (labRef.value) {
			chart.value = echarts.init(labRef.value, theme);
			chart.value.setOption(initOption);
			callback();
		}

		window.addEventListener("resize", resizeHandler);
	});

	onBeforeUnmount(() => {
		chart.value?.dispose();
		window.removeEventListener("resize", resizeHandler);
	});

	return {
		echart: chart,
		cb: callback,
	};
}
