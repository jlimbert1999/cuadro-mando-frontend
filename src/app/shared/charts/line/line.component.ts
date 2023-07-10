import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class LineComponent implements OnChanges {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  @Input() public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Series A',
        fill: false,
      },
      {
        data: [28, 48, 40, 19, 86, 27, 90],
        label: 'Series B',
        fill: false,
      },
      {
        data: [180, 480],
        label: 'Series C',
        fill: false,
      }
    ],
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July']
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.1
      }
    },
    plugins: {
    }
  };
  constructor() {

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.chart?.update()
  }

}
