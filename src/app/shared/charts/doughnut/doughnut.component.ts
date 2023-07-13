import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartData, ChartType } from 'chart.js';
import Annotation from 'chartjs-plugin-annotation';
import { BaseChartDirective } from 'ng2-charts';
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(ChartDataLabels);
@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styleUrls: ['./doughnut.component.css']
})
export class DoughnutComponent implements OnChanges {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input() public doughnutChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: []
  };
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      datalabels: {
        font: {
          size: 20
        },
        backgroundColor: 'white',
        formatter: (value, ctx) => {
         
          let sum = 0;
          let dataArr = ctx.chart.data.datasets[0].data;
          dataArr.map((data: any) => {
            sum += data;
          }); 
          let percentage = (value * 100 / sum).toFixed(0) + "%";
          return percentage;
        },
        color: 'black',
      }
    }
  };




  constructor() {
    Chart.register(Annotation)
  }
  ngOnChanges(): void {
    this.chart?.update()
  }

}
