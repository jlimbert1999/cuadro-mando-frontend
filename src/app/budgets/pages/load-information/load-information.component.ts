import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { read, utils } from 'xlsx';
import { MatDialogRef } from '@angular/material/dialog';
import { ExcelDataExecution } from '../../interfaces/execution.model';
import { ExecutionService } from '../../services/execution.service';
import { ExecutionDto } from '../../dtos/execution.dto';
import { ExcelDataEarning } from '../../interfaces/earning.model';
import { EarningDto, ProjectionDto } from '../../dtos/earning.dto';
import { EarningService } from '../../services/earning.service';

@Component({
  selector: 'app-load-information',
  templateUrl: './load-information.component.html',
  styleUrls: ['./load-information.component.css']
})
export class LoadInformationComponent {

  dateUpload = new Date()
  typesExcelData = [
    { value: 'projection-collection', viewValue: 'Proyeccion recaudacion' },
    { value: 'current-collection', viewValue: 'Recaudacion' },
    { value: 'execution', viewValue: 'Ejecucion' },
  ]
  typeDataForCharge?: 'projection-collection' | 'execution' | 'current-collection'

  dataSource: any[] = []
  displayedColumns: string[] = [];

  constructor(
    private executionService: ExecutionService,
    private earningService: EarningService,
    public dialogRef: MatDialogRef<LoadInformationComponent>
  ) {
  }

  async loadExcelFile() {
    const { value: file } = await Swal.fire({
      title: 'Seleccione un archivo :ods, csv, xlsx',
      imageUrl: '../../../../assets/img/guides/format-excel-file.png',
      imageWidth: 500,
      imageHeight: 200,
      input: 'file',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      inputAttributes: {
        'accept': '.ods, csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
        'aria-label': 'Cargar archivo excel'
      }
    })
    if (file) {
      const reader = new FileReader()
      reader.readAsBinaryString(file)
      reader.onload = (e) => {
        const wb = read(reader.result, { type: 'binary', cellDates: true });
        const data = utils.sheet_to_json<any>(wb.Sheets[wb.SheetNames[0]]);
        this.dataSource = [...data]
        this.displayedColumns = Object.keys(data[0])
      }
    }
  }


  save() {
    switch (this.typeDataForCharge) {
      case 'execution':
        this.uploadExecution()
        break;
      case 'projection-collection':
        this.uploadProjectionEarning()
        break;
      case 'current-collection':
        this.uploadCurrentEarning()
        break;
      default:
        break;
    }
  }
  uploadExecution() {
    const excelData: ExcelDataExecution[] = this.dataSource
    let execution: ExecutionDto = {
      data: [],
      date: this.dateUpload
    }
    excelData.map((element: ExcelDataExecution) => {
      execution.data.push({
        secretaria: element['Secretaria'],
        tipoDeGasto: element['tipo de gasto'],
        programa: element['Programa'],
        DA: element['DA'],
        UE: element['UE'],
        catPrg: element['Cat. Prg.'],
        descripcionCatPrg: element['Descripción Cat. Prg.'],
        presupuestoInicial: element['Presupuesto Inicial'],
        modAprobadas: element['Mod. Aprobadas'],
        presupVig: element['Presup. Vig.'],
        preventivo: element['Preventivo'],
        compromiso: element['Compromiso'],
        ejecutado: element['Ejecutado'],
        pagado: element['Pagado'],
        saldoDeveng: element['Saldo Deveng.'],
      })
      return execution
    })
    this.executionService.add(execution).subscribe(execution => {
      this.dialogRef.close(execution)
    })
  }
  uploadCurrentEarning() {
    const excelData: ExcelDataEarning[] = this.dataSource
    const earnings: EarningDto[] = excelData.map(el => {
      return {
        ACTIVIDADES: el.ACTIVIDADES,
        INMUEBLES: el.INMUEBLES,
        TASAS: el.TASAS,
        VEHICULOS: el.VEHICULOS,
        date: el.FECHA
      }
    })
    this.earningService.uploadEarning(earnings).subscribe(bool => {
      this.dialogRef.close()
    })
  }

  uploadProjectionEarning() {
    const excelData: ExcelDataEarning[] = this.dataSource
    let projection: ProjectionDto = {
      months: [],
      year: this.dateUpload.getFullYear()
    }
    excelData.map((element) => {
      projection.months.push(element)
    })
    this.earningService.addProjection(projection).subscribe(projection => {
      this.dialogRef.close()
    })
  }

  disableSave(): boolean {
    if (this.dataSource.length > 0 && this.typeDataForCharge) return false
    return true
  }


}
