import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizationsService  {
    constructor(private http: HttpService){
    }

    getLicenseByOrgId(orgId:any): Observable<any> {
    return this.http.getTams(`OrganizationLicenses/Get/${orgId}`);
  }
  getOrganizatiolicenseScreen(orgId:any): Observable<any> {
    return this.http.getTams(`OrganizationLicenses/GetOrganizatiolicenseScreen/${orgId}`);
  }
  GetOrganizationSetting(orgId:any): Observable<any> {
    return this.http.get(`OrganizationSettings/GetOrganizationSetting/${orgId}`);
  }
  GetAllTimeZones(): Observable<any> {
    return this.http.getTams('Organizations/GetTimeZones');
  }
 
 

  getUploadedDataForLicence(data: any): Observable<any> {
    return this.http.postTams('Organizations/UploadFile', data);
  }
  getuploadedDataForServer(data: any): Observable<any> {
    return this.http.postTams('Users/UploadServerLicense', data);
  }

  getuploadedDataForPassword(data: any): Observable<any> {
    return this.http.postTams( 'Users/UpdateAdminPassword', data);
  }
  getuploadeddata2(data: any): Observable<any> {
    
    return this.http.postTams('Devices/UploadFile', data);
  }
  UpdateSettingOrganization(data: any): Observable<any> {
    return this.http.put('OrganizationSettings/UpdateSettingOrganization', data);
  }
  UpdateOrganization(data: any): Observable<any> {
    return this.http.putTams('Organizations/Update', data);
  }
  getGroups(): Observable<any> {
    return this.http.get('Groups/GetGroupsDropDown');
  }
}
