import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './pages/register/register.component';
import { MaterialModule } from '../material/material.module';
import { ManageComponent } from './pages/manage/manage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterProjectionComponent } from './pages/register-projection/register-projection.component';

@NgModule({
  declarations: [
    RegisterComponent,
    ManageComponent,
    RegisterProjectionComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class LoadModule { }
