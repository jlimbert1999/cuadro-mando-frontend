import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';
import { NgChartsModule } from 'ng2-charts';
import { BarChartComponent } from './bar-chart/bar-chart.component';




@NgModule({
  declarations: [
    DoughnutChartComponent,
    BarChartComponent
  ],
  imports: [
    CommonModule,
    NgChartsModule
    
  ],
  exports: [
    DoughnutChartComponent,
    BarChartComponent
  ]
})
export class SharedModule { }
