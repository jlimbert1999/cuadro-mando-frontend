import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoadInformationComponent } from './pages/load-information/load-information.component';
import { RecordsComponent } from './pages/records/records.component';
import { CollectionComparisonComponent } from './pages/collection-comparison/collection-comparison.component';
import { ComparationsComponent } from './pages/comparations/comparations.component';
import { ProjectionComparisonComponent } from './projection-comparison/projection-comparison.component';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'records', component: RecordsComponent },
  { path: 'comparations', component: ComparationsComponent },
  { path: 'history', component: CollectionComparisonComponent },
  { path: 'projections', component: ProjectionComparisonComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class BudgetRoutingModule { }
