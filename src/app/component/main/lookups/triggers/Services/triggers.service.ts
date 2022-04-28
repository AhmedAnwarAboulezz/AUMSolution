import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class TriggersService {
    constructor(private http: HttpService){
    }

  getTriggerTypes(): Observable<any> {
    return this.http.get('Triggers/GetDropDownTriggerTypes');
  }
  getDevices(): Observable<any> {
    return this.http.get('Devices/GetDropdownDevice');
  }
  getTriggerRights(accessGroupId:any): Observable<any> {
    return this.http.get(`TriggerRights/GetTriggerRightsId/${accessGroupId}`);    
  }

  updateTriggerRights(accessGroupRights: any): Observable<any> {  
    return this.http.post('TriggerRights/Update',accessGroupRights);
  }
  getLookups(): Observable<any> {
    const sources = [];   
    sources.push(this.getTriggerTypes());
    return forkJoin(sources);
  }
}
