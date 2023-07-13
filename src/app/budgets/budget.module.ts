import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoadInformationComponent } from './pages/load-information/load-information.component';
import { BudgetRoutingModule } from './budget-routing.module';
import { RecordsComponent } from './pages/records/records.component';
import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { DetailsEarningComponent } from './pages/details-earning/details-earning.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './pages/register/register.component';
import { DetailsExecutionComponent } from './pages/details-execution/details-execution.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CollectionComparisonComponent } from './pages/collection-comparison/collection-comparison.component';
import { ConfigDateComponent } from './bottomSheets/config-date/config-date.component';
import { ComparationsComponent } from './pages/comparations/comparations.component';
import { ProjectionComparisonComponent } from './projection-comparison/projection-comparison.component';


@NgModule({
  declarations: [
    DashboardComponent,
    LoadInformationComponent,
    RecordsComponent,
    DetailsEarningComponent,
    RegisterComponent,
    DetailsExecutionComponent,
    CollectionComparisonComponent,
    ConfigDateComponent,
    ComparationsComponent,
    ProjectionComparisonComponent
  ],
  imports: [
    CommonModule,
    BudgetRoutingModule,
    MaterialModule,
    NgChartsModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule
  ]
})
export class BudgetModule { }
