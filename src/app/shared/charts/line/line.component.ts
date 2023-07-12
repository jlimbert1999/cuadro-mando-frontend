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
    elements: {
      line: {
        tension: 0.1
      }
    },
    plugins: {
      datalabels: {
        borderRadius: 4,
        font: {
          weight: 'bold'
        },
        formatter: function (value: number, context) {
          return `${value.toLocaleString()} Bs.`;
        },
        padding: 6
      }
    },
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 32,
        right: 16,
        bottom: 16,
        left: 8
      }
    },
    scales: {
      y: {
        stacked: true
      }
    }
  };

  gestion1 = 'Gestión 2021';
  gestion2 = 'Gestión 2022';

  montosGestion1 = {
    total: 5000,
    submonto1: 2000,
    submonto2: 3000
  };

  montosGestion2 = {
    total: 7000,
    submonto1: 2500,
    submonto2: 4500
  };
  constructor() {

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.chart?.update()
  }

}
