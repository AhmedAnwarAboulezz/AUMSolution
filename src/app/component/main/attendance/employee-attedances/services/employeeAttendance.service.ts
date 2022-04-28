import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Observable, forkJoin } from 'rxjs';
import { AttendanceSearch, AttendanceSearchImage } from 'src/app/models/attendanceSearch';
import { ConfigService } from 'ngx-envconfig';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeAttendanceService {
  constructor(private http: HttpService, private configService: ConfigService){
  }
  public aumImageHost = this.configService.get('AumImageHost');


  getuploadeddata(data: any): Observable<any> {
    return this.http.post('EmployeeLogSheets/UploadFile', data);
  }
  SaveEmployeeLogList(employeeLogs: any): Observable<any> {
    return this.http.post('EmployeeLogSheets/AddList', employeeLogs);
  }
  getLogtypes(): Observable<any> {
    return this.http.get('EmployeeAttendanceLogs/GetAllLogType');
  }
  getRemark(): Observable<any> {
    return this.http.get('EmployeeAttendanceLogs/GetAllRemark');
  }
  getEmployeeById(id:any): Observable<any> {
    return this.http.get(`Employees/Get/${id}`);    
  }
  getBranchs(): Observable<any> {
    return this.http.get('Branches/GetAll');
  }

  getDevices(): Observable<any> {
    return this.http.get('Devices/GetAll');
  }
  getAccessMethods(): Observable<any> {
    return this.http.get('EmployeeAttendanceLogs/GetAccessMethodsDropDown');
  }
  GetEmployeeLogsByDate(search: AttendanceSearch): Observable<any> {
    return this.http.post('EmployeeAttedanceLogs/GetEmployeeLogsByDate', search);
  }
  getLookup(): Observable<any> {
    const sources = [];
    sources.push(this.getLogtypes());
    sources.push(this.getRemark());
    sources.push(this.getBranchs());
    sources.push(this.getDevices());
    sources.push(this.getAccessMethods());
    return forkJoin(sources);
  }


  getEmployeeAttendance(id): Observable<any> {
    return this.http.get(`EmployeeAttedanceLogs/GetById/${id}`);
  }
  getActionImage(search: string): Observable<any> {
 

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Basic ' + btoa('adminapex:adminapex@123')
  })
};
    return this.http.postSpecific(this.aumImageHost +'EventLogs/GetActionImage?imgName='+search,httpOptions);
  }
  getEmployeeImage(employeeId: any): Observable<any> {
    return this.http.get(`Employees/GetImageWithEmployeeId/${employeeId}`, {responseType: 'text'});
  }
  getStatus(): Observable<any> {
    return this.http.get('Reports/GetAllStatus');
  }
}
