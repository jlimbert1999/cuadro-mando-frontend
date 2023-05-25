
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  dataRecaudacion: { labels: string[], datasets: [{ data: number[] }] } = {
    labels: [],
    datasets: [
      { data: [] }
    ]
  }
  dataEjecucion: { labels: string[], datasets: [{ data: number[] }] } = {
    labels: ['SMFA', 'SMPDT', 'SMIS', 'SMMTDP', 'SMDHI', 'SMS'],
    datasets: [
      { data: [11000000000, 7500000000, 7300000000, 4800000000, 11200000000, 17400000000] }
    ]
  }
  constructor() { }

}
