import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent {

  displayedColumns: { title: string, key: string }[] = [];
  columnsToDisplay: string[] = []
  data: any[] = [];

  constructor(private dataService: DataService) {

  }
  async loadExcelFile() {
    const { value: file } = await Swal.fire({
      title: 'Cargar informacion desde EXCEL',
      input: 'file',
      confirmButtonText: 'ACEPTAR',
      inputAttributes: {
        'accept': 'xlsx/*',
        'aria-label': 'Seleccione el Excel archivo a cargar'
      }
    })
    if (file) {
      this.ReadExcel(file)
    }
  }
  ReadExcel(File: File) {
    let fileReader = new FileReader()
    fileReader.readAsBinaryString(File)
    fileReader.onload = (e) => {
      let workbook = XLSX.read(fileReader.result, { type: 'binary' })
      let schemasNames = workbook.SheetNames
      let ExcelData: any[] = XLSX.utils.sheet_to_json(workbook.Sheets[schemasNames[0]])
      Object.keys(ExcelData[4]).forEach(element => {
        this.displayedColumns.push({ title: ExcelData[4][element], key: element })
        this.columnsToDisplay.push(element)
      })
      for (let row = 5; row < ExcelData.length; row++) {
        this.data.push(ExcelData[row])
        if (ExcelData[row]['__EMPTY_1'] == 'SUB TOTAL') {
          for (let y = row - 1; y > 0; y--) {
            if (ExcelData[y]['__EMPTY_1']) {
              this.dataService.dataRecaudacion.labels.push(ExcelData[y]['__EMPTY_1'])
              break
            }
          }
          this.dataService.dataRecaudacion.datasets[0].data.push(ExcelData[row]['__EMPTY_8'])
        }
      }
      console.log(this.data);
    }
  }

}


