import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { ComparisonEarningData, Earning, GroupedEarning, Projection } from '../interfaces/earning.model';
import { map } from 'rxjs';
import { EarningDto, ProjectionDto } from '../dtos/earning.dto';

const baseUrl = environment.baseUrl
@Injectable({
  providedIn: 'root'
})
export class EarningService {
  constructor(private http: HttpClient) { }

  addEarning(earning: EarningDto) {
    return this.http.post<Earning>(`${baseUrl}/earnings`, earning)
  }
  uploadEarning(earnings: EarningDto[]) {
    return this.http.post<boolean>(`${baseUrl}/earnings/upload`, earnings)
  }
  getRecordsEarning() {
    return this.http.get<Earning[]>(`${baseUrl}/earnings`)
  }
  addProjection(projection: ProjectionDto) {
    return this.http.post<Projection>(`${baseUrl}/earnings/projection`, projection)
  }
  getCurrentEarning(date: Date) {
    return this.http.get<GroupedEarning>(`${baseUrl}/earnings/${date.getTime()}`).pipe(
      map(resp => {
        return resp
      }))
  }
  getComparisonData(date: Date) {
    return this.http.get<ComparisonEarningData[]>(`${baseUrl}/earnings/comparison/${date.getTime()}`).pipe(
      map(resp => {
        return resp
      }))
  }
  getComparisonProjection(date: Date) {
    return this.http.get<{ earning: ComparisonEarningData[], projection: Projection }>(`${baseUrl}/earnings/comparison/projection/${date.getTime()}`).pipe(
      map(resp => {
        return resp
      }))
  }

}
