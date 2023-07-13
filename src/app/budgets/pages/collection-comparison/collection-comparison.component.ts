import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { EarningService } from '../../services/earning.service';

interface lineChartData {
  datasets: {
    label: string
    fill: boolean
    data: number[]
  }[];
  labels: string[]
}
@Component({
  selector: 'app-collection-comparison',
  templateUrl: './collection-comparison.component.html',
  styleUrls: ['./collection-comparison.component.css']
})
export class CollectionComparisonComponent {
  displayedColumns: string[] = ['number', 'year', 'total', 'options'];
  dataSource: any[] = [];
  chartData: lineChartData = {
    datasets: [],
    labels: ['', 'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE']
  }

  constructor(private earningService: EarningService) {

  }

  async addData() {
    if (this.dataSource.length === 5) return
    const { value: formValues } = await Swal.fire({
      title: 'SELECCIONE EL AÑO',
      html: `<input  id="year-input" type="number" min="2000" max="2099" value="${new Date().getFullYear()}" step="1"/>`,
      focusConfirm: false,
      confirmButtonText: 'ACEPTAR',
      preConfirm: () => {
        if (!document.getElementById('year-input')) return
        return (document.getElementById('year-input') as HTMLInputElement).value
      }
    })
    if (formValues) {
      const duplicate = this.chartData.datasets.some(el => el.label === formValues)
      if (duplicate) return
      this.earningService.getComparisonData(new Date(parseInt(formValues), 0, 1)).subscribe(data => {
        if (data.length === 0 || !data) {
          Swal.fire({
            icon: 'info',
            title: `No se encontraron registros para la gestion ${formValues}`
          })
          return
        }
        const values: any[] = []
        let total = 0
        for (let index = 1; index <= 12; index++) {
          const chartElement = data.find(el => el._id == index)
          let total = chartElement ? (chartElement.ACTIVIDADES + chartElement.TASAS + chartElement.INMUEBLES + chartElement.VEHICULOS) : null
          values.push(total)
        }
        this.chartData.datasets.push({
          label: formValues,
          fill: false,
          data: [0, ...values]
        })
        this.chartData = { ...this.chartData }
        const sum = data.map(el => el.ACTIVIDADES + el.INMUEBLES + el.TASAS + el.VEHICULOS).reduce((partialSum, a) => partialSum + a, 0);
        this.dataSource = [{ year: formValues, total: sum }, ...this.dataSource];
      })
    }
  }

  remove(element: any) {
    this.dataSource = this.dataSource.filter(el => el.year != element.year)
    this.chartData.datasets = this.chartData.datasets.filter(el => el.label != element.year)
    this.chartData = { ...this.chartData }
  }


}
