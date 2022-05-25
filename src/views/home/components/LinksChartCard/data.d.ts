export interface ChartDataType {
  day: string[];
  num: number[];
}

export interface LinksChartDataType {
  total: number;
  num: number;
  chart: ChartDataType;
}
