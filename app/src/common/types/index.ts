type TDataChart = {
  datetime: string;
  max: number;
};

export type TDataChartLine = {
  name?: string;
  xAxisData: Array<string>;
  yAxisData: Array<number>;
};

export type TResponseChart = {
  data: Array<TDataChart>;
  name: string;
};

export interface TChart extends TResponseChart {
  id: string;
  lines: Array<TDataChartLine>;
  status: '' | 'loading' | 'error' | 'success';
  title: string;
  yAxisTitle: string;
}