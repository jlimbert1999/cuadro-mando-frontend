import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { RegisterProjectionComponent } from '../register-projection/register-projection.component';
import Swal from 'sweetalert2';
import { ReadExcel } from '../../helpers/readExcelFile';


@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent {

  constructor(public dialog: MatDialog) { }
  add() {
    this.dialog.open(RegisterComponent, { width: '800px' });
  }

  async addProjection() {
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
      this.dialog.open(RegisterProjectionComponent, { width: '800px', data });
    }

  }
}
