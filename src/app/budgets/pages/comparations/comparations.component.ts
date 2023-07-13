import { Component } from '@angular/core';
import { EarningService } from '../../services/earning.service';
import { forkJoin } from 'rxjs';
import { GroupedEarning } from '../../interfaces/earning.model';

@Component({
  selector: 'app-comparations',
  templateUrl: './comparations.component.html',
  styleUrls: ['./comparations.component.css']
})
export class ComparationsComponent {
  date1 = new Date()
  date2 = new Date()
  data: any[] = []
  chartData1 = {
    data: 0,
    label: `${this.date1.getFullYear()}`
  }
  chartData2 = {
    data: 0,
    label: `${this.date2.getFullYear()}`
  }

  total1: {
    current: number,
    projection: number
  } = {
      current: 0,
      projection: 0
    }
  total2: {
    current: number,
    projection: number
  } = {
      current: 0,
      projection: 0
    }
  constructor(private earingService: EarningService) {

  }


  getData() {
    forkJoin([
      this.earingService.getCurrentEarning(this.date1),
      this.earingService.getCurrentEarning(this.date2)
    ]).subscribe(data => {
      this.chartData1 = {
        data: this.createData(data[0]),
        label: `${this.date1.getFullYear()}`
      }
      this.chartData2 = {
        data: this.createData(data[1]),
        label: `${this.date2.getFullYear()}`
      }
      this.chartData1 = { ...this.chartData1 }
      this.chartData2 = { ...this.chartData2 }
      this.data[0] = data[0].earning
      this.data[1] = data[1].earning
    })

  }

  createData(data: GroupedEarning) {
    const { _id, ...values } = data.earning
    const collection = Object.values(values).reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);

    const projectionByMonth = data.projection.months.map(el => el.ACTIVIDADES + el.INMUEBLES + el.TASAS + el.VEHICULOS)
    const projection = Object.values(projectionByMonth).reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0)
    this.total1 = {
      projection: 0,
      current: collection
    }
    this.total2 = {
      projection: 0,
      current: collection
    }
    return parseFloat((collection * 100 / projection).toFixed(2))
  }

  compare(data1: number, data2: number) {
    console.log(data1);
    return (data1 - data2).toFixed(2)
  }

}
