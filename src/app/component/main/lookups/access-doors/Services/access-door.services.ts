import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpService } from "src/app/services/http/http.service";
@Injectable({
    providedIn: 'root'
  })
export class AccessDoorService {
    constructor(private http: HttpService){
    }
  
    getAccessDoorRights(accessDoorId:any): Observable<any> {
      return this.http.get(`AccessDoorRights/GetAccessDoorRightsById/${accessDoorId}`);    
    }

    updateAccessRights(accessDoorRights: any): Observable<any> {  
      return this.http.post('AccessDoorRights/Update',accessDoorRights);
    }
  
  }