import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

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
    elements: {
      line: {
        tension: 0.4
      }
    },

    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    },

  };
  public barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  @Input() public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: []
  };

  constructor() { }
  ngOnChanges(): void {
    this.chart?.update()
  }
}
