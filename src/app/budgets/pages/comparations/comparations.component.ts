import { Component } from '@angular/core';
import { EarningService } from '../../services/earning.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-comparations',
  templateUrl: './comparations.component.html',
  styleUrls: ['./comparations.component.css']
})
export class ComparationsComponent {
  date1 = new Date()
  date2 = new Date()
  data: any[] = []
  constructor(private earingService: EarningService) {

  }


  getData() {
    console.log(this.date1);
    console.log(this.date2);
    forkJoin([
      this.earingService.getCurrentEarning(this.date1),
      this.earingService.getCurrentEarning(this.date2)
    ]).subscribe(data => {
      console.log(data[0]);
      console.log(data[1]);
      this.data[0] = data[0].earning
      this.data[1] = data[1].earning
    })

  }


}
