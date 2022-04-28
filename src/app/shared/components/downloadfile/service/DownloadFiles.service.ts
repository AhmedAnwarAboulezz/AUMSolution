import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DownloadFilesService {

  constructor(private http: HttpService){
  }

  downloadfile(filename, serviceName): Observable<any> {
    if (serviceName == "Permissions") {
      return this.http.get(`EmployeeAllowances/DownLoadFile/${filename}`, {
        responseType: 'arraybuffer'
      });
    }
    else if (serviceName == "Leaves") {
      return this.http.get(`EmployeeLeaves/DownLoadFile/${filename}`, {
        responseType: 'arraybuffer'
      });
    }

  }


}
