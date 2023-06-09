import { AfterViewInit, Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EarningService } from '../../services/earning.service';
import { ExecutionService } from '../../services/execution.service';
import { GroupedExecution } from '../../interfaces/execution.model';
import { DetailsEarningComponent } from '../details-earning/details-earning.component';
import { GroupedEarning } from '../../interfaces/earning.model';
import { DetailsExecutionComponent } from '../details-execution/details-execution.component';
import { ConfigDateComponent } from '../../bottomSheets/config-date/config-date.component';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {
  execution?: GroupedExecution
  earning?: GroupedEarning
  chartDataExecution = {
    data: 0,
    label: 'Recaudacion'
  }
  chartDataEarning = {
    data: 0,
    label: 'Ejecucion'
  }
  totalExecution = {
    current: 0,
    projection: 0
  }
  totalEarning = {
    current: 0,
    projection: 0
  }

  FormDates = new FormGroup({
    executionDate: new FormControl<Date | null>(new Date()),
    earningDate: new FormControl<Date | null>(new Date()),
  });


  constructor(
    private earingService: EarningService,
    private executionService: ExecutionService,
    public dialog: MatDialog,
    private _bottomSheet: MatBottomSheet
  ) {

  }
  ngAfterViewInit(): void {
    forkJoin(
      [
        this.earingService.getCurrentEarning(this.FormDates.get('earningDate')?.value!),
        this.executionService.getByDate(this.FormDates.get('executionDate')?.value!)
      ]
    ).subscribe(data => {
      this.earning = data[0]
      this.execution = data[1];
      console.log(data[0]);
      this.createDataChartEarning(this.earning)
      this.createDataChartExecution(this.execution)
    })
  }

  createDataChartExecution(groupData: GroupedExecution) {
    const executed = groupData.execution.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.presupuesto_ejecutado;
    }, 0);
    const projection = groupData.execution.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.presupuesto_vigente;
    }, 0);
    this.totalExecution = {
      current: executed,
      projection: projection
    }
    this.chartDataExecution = {
      data: parseFloat((executed * 100 / projection).toFixed(2)),
      label: 'Ejecucion'
    }
  }

  createDataChartEarning(groupData: GroupedEarning) {
    const { _id, ...values } = groupData.earning
    const collection = Object.values(values).reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
    const projectionByMonth = groupData.projection.months.map(el => el.ACTIVIDADES + el.INMUEBLES + el.TASAS + el.VEHICULOS)
    const projection = Object.values(projectionByMonth).reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0)
    this.totalEarning = {
      current: collection,
      projection
    }
    this.chartDataEarning = {
      data: parseFloat((collection * 100 / projection).toFixed(2)),
      label: 'Recaudacion'
    }
  }

  viewDetailsExecution() {
    this.dialog.open(DetailsExecutionComponent, {
      width: '1600px',
      data: this.execution
    })
  }
  viewDetailsEarning() {
    this.dialog.open(DetailsEarningComponent, {
      width: '1600px',
      data: this.earning
    })

  }

  getEarning() {
    this.earingService.getCurrentEarning(this.FormDates.get('earningDate')?.value!).subscribe(data => {
      this.earning = data
      this.createDataChartEarning(this.earning)
    })
  }
  getExecution() {
    this.executionService.getByDate(this.FormDates.get('executionDate')?.value!).subscribe(data => {
      this.execution = data
      this.createDataChartExecution(this.execution)
    })
  }

  resetExecution() {
    this.FormDates.get('executionDate')?.setValue(new Date)
    this.getExecution()
  }
  resetEarning() {
    this.FormDates.get('earningDate')?.setValue(new Date)
    this.getEarning()
  }

  openBottomSheet(): void {
    const bottomSheetRef = this._bottomSheet.open(ConfigDateComponent);
    bottomSheetRef.afterDismissed().subscribe((data: any) => {
      if (!data['dateEarning']) data['dateEarning'] = new Date()
      if (!data['dateExecution']) data['dateExecution'] = new Date()
      this.earingService.getCurrentEarning(data['dateEarning']).subscribe(data => {
        this.earning = data
        this.createDataChartEarning(this.earning)
      })
      this.executionService.getByDate(data['dateExecution']).subscribe(data => {
        this.execution = data
        this.createDataChartExecution(this.execution)
      })
    });
  }
}
