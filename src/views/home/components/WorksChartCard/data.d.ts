export interface ChartDataType {
  day: string[];
  num: number[];
}


export interface WorksChartDataType {
  total: number;
  num: number;
  chart: ChartDataType;
}
