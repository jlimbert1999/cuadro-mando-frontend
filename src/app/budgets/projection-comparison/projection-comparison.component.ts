import { Component } from '@angular/core';
import { EarningService } from '../services/earning.service';
import Swal from 'sweetalert2';
interface lineChartData {
  datasets: {
    label: string
    fill: boolean
    data: number[]
  }[];
  labels: string[]
}

@Component({
  selector: 'app-projection-comparison',
  templateUrl: './projection-comparison.component.html',
  styleUrls: ['./projection-comparison.component.css']
})
export class ProjectionComparisonComponent {
  date = new Date()
  dataSource: any[] = []
  charData: lineChartData = {
    datasets: [],
    labels: ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE']
  }
  constructor(private earingService: EarningService) {
  }

  getCompartion() {
    this.earingService.getComparisonProjection(new Date(this.date.getFullYear(), 0, 1)).subscribe(data => {
      this.charData.datasets = []
      this.dataSource = []
      if (!data) {
        Swal.fire({
          icon: 'info',
          title: 'Sin resultados',
          text: `No se encontraron registros para la gestion ${this.date.getFullYear()}`
        })
        return
      }
      const projection = data.projection.months.map(el => el.ACTIVIDADES + el.INMUEBLES + el.TASAS + el.VEHICULOS)
      this.charData.datasets.push({
        label: 'PROYECCION',
        fill: false,
        data: projection
      })
      const earning = data.earning.map(el => el.ACTIVIDADES + el.INMUEBLES + el.TASAS + el.VEHICULOS)
      this.charData.datasets.push({
        label: 'RECAUDACION',
        fill: false,
        data: earning
      })
      this.charData = { ...this.charData }

      data.projection.months.forEach((el, index) => {
        let earningMonth = data.earning.find(item => item._id == index + 1)
        const totalProjection = el.ACTIVIDADES + el.INMUEBLES + el.TASAS + el.VEHICULOS
        const totalEarning = earningMonth ? (earningMonth.ACTIVIDADES + earningMonth.INMUEBLES + earningMonth.TASAS + earningMonth.VEHICULOS) : 0
        const indicator = (totalProjection - totalEarning) > 0 ? false : true
        this.dataSource.push({
          date: new Date(2000, index, 2),
          projection: totalProjection,
          earning: totalEarning,
          dif: (totalProjection - totalEarning),
          indicator: indicator
        })
      })
    })
  }
}
