import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Execution, GroupedExecution } from '../interfaces/execution.model';
import { map } from 'rxjs';
import { ExecutionDto } from '../dtos/execution.dto';

const baseUrl = environment.baseUrl
@Injectable({
  providedIn: 'root'
})
export class ExecutionService {

  constructor(private http: HttpClient) { }

  add(execution: ExecutionDto) {
    return this.http.post<Execution>(`${baseUrl}/execution`, execution)
  }
  getRecordsExecution() {
    return this.http.get<Execution[]>(`${baseUrl}/execution`)
  }
  getByDate(date: Date) {
    return this.http.get<GroupedExecution>(`${baseUrl}/execution/${date.getTime()}`).pipe(
      map(resp => {
        return resp
      }))
  }
}
