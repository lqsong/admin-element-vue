export interface ChartDataType {
  day: string[];
  num: number[];
}

export interface TopicsChartDataType {
  total: number;
  num: number;
  chart: ChartDataType;
}
