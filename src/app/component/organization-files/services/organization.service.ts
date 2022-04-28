import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class OrganizationService {
  headersConfig = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };
  constructor(private http: HttpService){
  }

  
  getUploadedDataForLicence(data: any): Observable<any> {
    return this.http.postTams('Organizations/UploadFile', data,this.headersConfig);
  }

  getuploadedDataForServer(data: any): Observable<any> {
    return this.http.post('UserMangments/UploadServerLicense', data,this.headersConfig);
  }

  getuploadedDataForPassword(data: any): Observable<any> {
    return this.http.post('UserMangments/UpdateAdminPassword', data,this.headersConfig);
  }
  getuploadeddata2(data: any): Observable<any> {
    
    return this.http.postTams('Devices/UploadFile', data,this.headersConfig);
  }
 
  
}
