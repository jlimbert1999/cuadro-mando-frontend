import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { DoughnutComponent } from './charts/doughnut/doughnut.component';
import { BarComponent } from './charts/bar/bar.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { GaugeComponent } from './charts/gauge/gauge.component';
import { LineComponent } from './charts/line/line.component';
import { PieComponent } from './charts/pie/pie.component';




@NgModule({
  declarations: [
    DoughnutComponent,
    BarComponent,
    GaugeComponent,
    LineComponent,
    PieComponent,
  ],
  imports: [
    CommonModule,
    NgChartsModule,
    NgApexchartsModule
  ],
  exports: [
    DoughnutComponent,
    BarComponent,
    GaugeComponent,
    LineComponent
  ]
})
export class SharedModule { }
