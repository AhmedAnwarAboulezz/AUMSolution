import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { Shell } from 'src/app/component/shell';
import { HttpService } from 'src/app/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private httpService: HttpService){
  }


  getAdminLevels(): Observable<any> {
    return this.httpService.get('AdminLevels/GetDropDown');
  }
  getFingerPrintSecurityLevels(): Observable<any> {
    return this.httpService.get('FingerPrintSecurityLevels/GetDropDown');
  }
  getDepartments(): Observable<any> {
    return this.httpService.get('Departments/GetDropDown');
  }
  getAccessGroups(): Observable<any> {
    return this.httpService.get('AccessGroups/GetDropDown');
  }
  getGroupsDropDown(): Observable<any> {
    return this.httpService.get('Groups/GetGroupsDropDown');
  }
  
  getLookups(): Observable<any> {
    const sources = [];   
    sources.push(this.getAdminLevels());
    sources.push(this.getFingerPrintSecurityLevels());
    sources.push(this.getDepartments());
    sources.push(this.getAccessGroups());

    return forkJoin(sources);
  }
}
