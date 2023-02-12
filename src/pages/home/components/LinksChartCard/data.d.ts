export interface IChartData {
	day: string[];
	num: number[];
}

export interface IWorksChartData {
	total: number;
	num: number;
	chart: IChartData;
}
