import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class ManualLogsService {
    constructor(private http: HttpService){
    }

  getLogtypes(): Observable<any> {
    return this.http.get('EmployeeManualLogs/GetDropdownLogTypes');
  }

  getAllLogtypes(): Observable<any> {
    return this.http.get('EmployeeAttendanceLogs/GetAllLogType');
  }
}
