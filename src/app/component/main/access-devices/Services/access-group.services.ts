import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpService } from "src/app/services/http/http.service";
@Injectable({
    providedIn: 'root'
  })
export class AccessGroupService {
    constructor(private http: HttpService){
    }

    getAccessGroupRights(accessGroupId:any): Observable<any> {
      return this.http.get(`AccessGroupRights/GetAccessGroupRightsById/${accessGroupId}`);    
    }

    updateAccessRights(accessGroupRights: any): Observable<any> {  
      return this.http.post('AccessGroupRights/Update',accessGroupRights);
    }
  
  }