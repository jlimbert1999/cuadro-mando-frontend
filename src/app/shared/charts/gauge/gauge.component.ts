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
export class GaugeComponent implements OnChanges, AfterViewInit {
  @ViewChild("chart") chart: ChartComponent | undefined;
  @Input() chartData: { data: number, label: string } = { data: 1, label: '' }
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [],
      chart: {
        height: 600,
        type: "radialBar",
        toolbar: {
          show: true
        }
      },
      // plotOptions: {
      //   radialBar: {
      //     hollow: {
      //       size: "60%"
      //     }
      //   }
      // },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: "20px"
            },
            value: {
              fontSize: "25px"
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
      dataLabels: {
        style: {
          fontSize: '20px',
        },
        background: {
          enabled: true,
          borderWidth: 2
        }
      },
      labels: []
    };
  }
  ngAfterViewInit(): void {


  }
  ngOnChanges(changes: SimpleChanges): void {
    this.chartOptions.series = [parseFloat(this.chartData.data.toFixed(2))]
    this.chartOptions.labels = [this.chartData.label]
  }
}
