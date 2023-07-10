import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChartData } from 'chart.js';
import { GroupedEarning } from '../../interfaces/earning.model';

@Component({
  selector: 'app-details-earning',
  templateUrl: './details-earning.component.html',
  styleUrls: ['./details-earning.component.css']
})
export class DetailsEarningComponent {
  charData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  }
  constructor(@Inject(MAT_DIALOG_DATA) public data: GroupedEarning) {
  }
  ngAfterViewInit(): void {
    const { _id, ...values } = this.data.earning
    let projection = new Map()
    this.data.projection.months.forEach(el => {
      projection.set('ACTIVIDADES', projection.get('ACTIVIDADES') !== undefined ? projection.get('ACTIVIDADES') + el.ACTIVIDADES : 0)
      projection.set('VEHICULOS', projection.get('VEHICULOS') !== undefined ? projection.get('VEHICULOS') + el.VEHICULOS : 0)
      projection.set('TASAS', projection.get('TASAS') !== undefined ? projection.get('TASAS') + el.TASAS : 0)
      projection.set('INMUEBLES', projection.get('INMUEBLES') !== undefined ? projection.get('INMUEBLES') + el.INMUEBLES : 0)
    })
    this.charData = {
      labels: Object.keys(values),
      datasets: [
        { data: Object.values(values), label: 'Recaudado' },
        { data: Object.values(Object.fromEntries(projection)), label: 'Proyectado' }
      ]
    }
  }







}
