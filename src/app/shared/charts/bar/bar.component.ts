import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, Chart } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(ChartDataLabels);
@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnChanges {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    indexAxis: 'y',
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        font: {
          weight: 'bold'
        },
        anchor: 'end',
        align: 'end',
        formatter: function (value: number, context) {
          return `${value.toLocaleString()} Bs.`;
        },

      },

    }
  };
  public barChartLabels: string[] = [];
  @Input() public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };

  constructor() { }
  ngOnChanges(): void {
    this.chart?.update()
  }
}
