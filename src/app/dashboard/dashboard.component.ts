import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  date = new Date()
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'RECAUDACION', cols: 2, rows: 1 },
          { title: 'EJECUCION PRESUPUESTARIA', cols: 2, rows: 1 },
          { title: 'Card 3', cols: 2, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'RECAUDACION', cols: 1, rows: 2 },
        { title: 'EJECUCION PRESUPUESTARIA', cols: 1, rows: 2 },
        { title: 'bar', cols: 2, rows: 2 },
        { title: 'TABLA', cols: 1, rows: 2 }
      ];
    })
  );

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
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



  constructor(private breakpointObserver: BreakpointObserver, public dataService: DataService) { }
  ngOnInit(): void {


  }
}
