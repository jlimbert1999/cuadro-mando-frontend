import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadModule } from './load/load.module';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InformationComponent } from './information/information.component';
import { ManageComponent } from './load/pages/manage/manage.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'information', component: InformationComponent },
      { path: 'manage', component: ManageComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    LoadModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
