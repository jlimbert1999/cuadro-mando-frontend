import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ChartConfiguration, Chart } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(ChartDataLabels);
@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class LineComponent implements OnChanges {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  @Input() public lineChartData: ChartConfiguration['data'] = {
    datasets: [],
    labels: []
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    elements: {
      line: {
        tension: 0.1
      }
    },
    plugins: {
      datalabels: {
        font: {
          weight: 'bold'
        },
        formatter: function (value: number, context) {
          return `${value.toLocaleString()} Bs.`;
        },
        // padding: 6
      }
    },
    maintainAspectRatio: false,
  };

  constructor() {

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.chart?.update()
  }

}
