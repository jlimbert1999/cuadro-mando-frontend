import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoadInformationComponent } from './pages/load-information/load-information.component';
import { RecordsComponent } from './pages/records/records.component';
import { CollectionComparisonComponent } from './pages/collection-comparison/collection-comparison.component';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'records', component: RecordsComponent },
  { path: 'collection/comparison', component: CollectionComparisonComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class BudgetRoutingModule { }
