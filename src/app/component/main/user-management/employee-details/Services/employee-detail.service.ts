import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDetailService {

  constructor(private httpService: HttpService){
  }

  getJobs(): Observable<any> {
    return this.httpService.get('Jobs/GetDropDown');
  }
  getAdministrativeLevels(): Observable<any> {
    return this.httpService.get('AdministrativeLevels/GetDropDown');
  }
  getGenders(): Observable<any> {
    return this.httpService.get('EmployeeDetails/GetDropDownGender');
  }
  getNationality(): Observable<any> {
    return this.httpService.get('EmployeeDetails/GetDropDownNationality');
  }
  getReligions(): Observable<any> {
    return this.httpService.get('EmployeeDetails/GetDropDownReligion');
  }
  getContractTypes(): Observable<any> {
    return this.httpService.get('EmployeeDetails/GetDropDownContractTypes');
  }
  getLookups(): Observable<any> {
    const sources = [];   
    sources.push(this.getJobs());
    sources.push(this.getAdministrativeLevels());
    sources.push(this.getGenders());
    sources.push(this.getNationality());
    sources.push(this.getReligions());
    sources.push(this.getContractTypes());
    return forkJoin(sources);
  }
  getEmployeeImage(employeeId:any): Observable<any> {
    return this.httpService.get(`EmployeeDetails/GetImageWithEmployeeId/${employeeId}`);    
  }
}
