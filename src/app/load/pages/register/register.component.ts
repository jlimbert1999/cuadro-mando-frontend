import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ReadExcel } from '../../helpers/readExcelFile';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  FormData: FormGroup = this.fb.group({
    actividades: [],
    inmuebles: [],
    tasas: [],
    vehiculos: [],
    fecha: []
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) { }

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
      const data = await ReadExcel(file)
      this.loadCollection(data)
    }
  }

  loadCollection(excelData: any[]) {
    const rubros = []
    for (let row = 5; row < excelData.length; row++) {
      if (excelData[row]['__EMPTY_1'] === 'SUB TOTAL') {
        rubros.push(excelData[row]['__EMPTY_4'])
      }
    }
    this.FormData.get('actividades')?.setValue(rubros[0])
    this.FormData.get('inmuebles')?.setValue(rubros[1])
    this.FormData.get('tasas')?.setValue(rubros[2])
    this.FormData.get('vehiculos')?.setValue(rubros[3])
  }
 
}
