import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChartData } from 'chart.js';
import { GroupedExecution } from '../../interfaces/execution.model';

@Component({
  selector: 'app-details-execution',
  templateUrl: './details-execution.component.html',
  styleUrls: ['./details-execution.component.css']
})
export class DetailsExecutionComponent {


  charData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  }
  constructor(@Inject(MAT_DIALOG_DATA) public data: GroupedExecution[]) {


  }
  ngAfterViewInit(): void {
    let labels: string[] = []
    let ejecutado: number[] = []
    let vigente: number[] = []

    this.data.forEach(element => {
      labels.push(element._id)
      ejecutado.push(element.presupuesto_ejecutado)
      vigente.push(element.presupuesto_vigente)

    })
    this.charData = {
      labels: labels,
      datasets: [
        { data: ejecutado, label: 'Ejecutado' },
        { data: vigente, label: 'Vigente' }
      ]

    }
    console.log(this.data);
    console.log(Object.keys(this.data));

  }

}
