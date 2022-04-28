import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeesFingerprintService {

  constructor(private httpService: HttpService){
  }



  getFingerPrintSecurityLevels(): Observable<any> {
    return this.httpService.get('FingerPrintSecurityLevels/GetDropDown');
  }
  
  getGroups(): Observable<any> {
    return this.httpService.get('Groups/GetGroupsDropDown');
  }

  getEmployees(filter,queryRequest): Observable<any> {
    return this.httpService.postQueryParamsReq('Employees/GetAllPaged',filter,queryRequest);
  }

  updateFingerPrint(model): Observable<any> {
    return this.httpService.postQueryParamsReq('Employees/UpdateFingerPrint',model);
  }
  getLookups(): Observable<any> {
    const sources = [];   
    sources.push(this.getFingerPrintSecurityLevels());
    sources.push(this.getGroups());
    return forkJoin(sources);
  }
}
