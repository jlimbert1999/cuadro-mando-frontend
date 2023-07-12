import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';

import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexLegend,
  ApexFill
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  fill: ApexFill
  colors: any[]
};


@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.css']
})
export class GaugeComponent implements OnChanges {
  @ViewChild("chart") chart: ChartComponent | undefined;
  @Input() chartData: { data: number, label: string } = { data: 1, label: '' }
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [],
      labels: [],
      chart: {
        // height: 600,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: "15px"
            },
            value: {
              fontSize: "20px"
            }
          }
        }
      },
      fill: {
        colors: [function ({ value, seriesIndex, dataPointIndex }: any) {
          if (value < 30) {
            return '#D90429'
          }
          else if (value >= 30 && value < 60)
            return '#F77F00'
          else if (value >= 60 && value < 90)
            return '#38B000'
          else return '#4361EE'
        }]
      },
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.chartOptions.series = [parseFloat(this.chartData.data.toFixed(2))]
    this.chartOptions.labels = [this.chartData.label]
  }
}
