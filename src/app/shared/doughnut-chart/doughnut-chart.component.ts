import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { LabelItem } from 'chart.js';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})
export class DoughnutChartComponent implements AfterViewInit, OnInit {
  constructor(public dataService: DataService){

  }
  ngOnInit(): void {
    // let datos: number[] = []
    // this.data.map(element => {
    //   this.pieChartData.labels?.push(element.categoria)
    //   datos.push(element.monto)

    // })
    // this.pieChartData.datasets.push({ data: datos })
  }
  @Input() data: any
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: []
  };
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    }
  };
  ngAfterViewInit(): void {
  }



}
