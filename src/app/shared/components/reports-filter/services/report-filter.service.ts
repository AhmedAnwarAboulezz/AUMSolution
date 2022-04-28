import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { HttpService } from 'src/app/services/http/http.service';
import { TokenService } from 'src/app/services/TokenService';

@Injectable({
  providedIn: 'root'
})
export class ReportFilterService {

  constructor(private http: HttpService, public tokenService: TokenService) {
  }

  getLookup(): Observable<any> {
    const sources = [];
    sources.push(this.getAllDeviceType());
    sources.push(this.getUserBranches());
    sources.push(this.getGroups());
    sources.push(this.getDevices());
    sources.push(this.getLogTypes());
    
    return forkJoin(sources);
  }

  getAllDeviceType(): Observable<any> {
    return this.http.get('Devices/GetDropdownDeviceTypesList');
  }

  getUserBranches(){
    return this.http.get('Branches/GetBranchesDropDown');
  }
  getGroups(): Observable<any> {
    return this.http.get('Groups/GetGroupsDropDown');
  }
  getDevices(): Observable<any> {
    return this.http.get('Devices/GetAll');
  }
  getLogTypes(): Observable<any> {
    return this.http.get('EmployeeAttendanceLogs/GetAllLogType');
  }
  downLoadFile(data: any, type: string, fileExtension: string, reportName: string) {
    debugger
    let blob = new Blob([data], { type });
    if (fileExtension !== 'pdf') {
      //download file with name
      const a = document.createElement('a')
      const objectUrl = URL.createObjectURL(blob)
      a.href = objectUrl;
      a.download = reportName + '.' + fileExtension;
      a.click();
      URL.revokeObjectURL(objectUrl);
    }
    else {
      //open new tab
      let blob = new Blob([data], { type });
      let url = window.URL.createObjectURL(blob);
      let pwa = window.open(url);
      if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
        alert('Please disable your Pop-up blocker and try again.');
      }
    }
  }
  generateReport(action, reportFilter): Observable<any> {
    debugger
    return this.http.postReport(`${action}`, reportFilter,
      { responseType: 'arraybuffer' }
    );
  }

  
}
