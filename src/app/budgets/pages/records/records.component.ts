import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { LoadInformationComponent } from '../load-information/load-information.component';
import { ExecutionService } from '../../services/execution.service';
import { RegisterComponent } from '../register/register.component';
import { Earning } from '../../interfaces/earning.model';
import { forkJoin } from 'rxjs';
import { EarningService } from '../../services/earning.service';
import { Execution } from '../../interfaces/execution.model';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent {
  dataSourceExecution = new MatTableDataSource<Execution>();
  dataSourceEarning = new MatTableDataSource<Earning>();
  displayedColumns: string[] = ['user', 'date'];

  constructor(
    public dialog: MatDialog,
    private executionService: ExecutionService,
    private earningService: EarningService
  ) {
    forkJoin([
      this.executionService.getRecordsExecution(),
      this.earningService.getRecordsEarning()
    ]).subscribe(data => {
      this.dataSourceExecution = new MatTableDataSource(data[0])
      this.dataSourceEarning = new MatTableDataSource(data[1])
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(LoadInformationComponent,
      {
        width: '1600px',
      });
    dialogRef.afterClosed().subscribe((result: Execution) => {
      if (result) {
        const index = this.dataSourceExecution.data.findIndex(el => el._id === result._id)
        if (index > -1) {
          this.dataSourceExecution.data[index] = result
        }
        else {
          this.dataSourceExecution.data.unshift(result)
        }
        this.dataSourceExecution = new MatTableDataSource(this.dataSourceExecution.data)
      }

    });
  }

  addEarning() {
    const dialogRef = this.dialog.open(RegisterComponent,
      { width: '600px' });
    dialogRef.afterClosed().subscribe((result: Earning) => {
      if (result) {
        const index = this.dataSourceEarning.data.findIndex(el => el._id === result._id)
        if (index > -1) {
          this.dataSourceEarning.data[index] = result
        }
        else {
          this.dataSourceEarning.data.unshift(result)
        }
        this.dataSourceEarning = new MatTableDataSource(this.dataSourceEarning.data)
      }

    });
  }





}
