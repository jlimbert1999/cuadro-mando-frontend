import { Component, Inject } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS, } from '@angular/material/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as _moment from 'moment';
import { defaultFormat, Moment } from 'moment';


const moment = defaultFormat || _moment;

export const YEAR_MODE_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-register-projection',
  templateUrl: './register-projection.component.html',
  styleUrls: ['./register-projection.component.css'],
 
})
export class RegisterProjectionComponent {
  displayedColumns: string[] = []
  dataSource = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  ];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any[]) {
    this.displayedColumns = Object.keys(data[0])
    this.dataSource = data
    console.log(data);
  }

}
