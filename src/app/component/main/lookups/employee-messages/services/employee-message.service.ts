import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpService } from "src/app/services/http/http.service";

@Injectable({
    providedIn: 'root'
  })
  export class EmployeeMessageService {
      constructor(private http: HttpService){
      }

     
      GetAllGroupDropdownList(): Observable<any> {
        return this.http.get('EmployeeMessages/GetAllGroupDropdownList');    
      } 
        
      getGroupDropdownList(employeeId:any): Observable<any> {
        return this.http.get(`EmployeeMessages/GetGroupDropdownList/${employeeId}`);    
      }

      getById(id:any): Observable<any> {
        return this.http.get(`EmployeeMessages/GetDataById/${id}`);    
      }
      deleteDetails(id:any): Observable<any> {
        return this.http.deleteReq("EmployeeMessages/DeleteDetails",id);    
      }
      getGroups(): Observable<any> {
        return this.http.get('Groups/GetGroupsDropDown');
      }
      getMainData(data): Observable<any>{
        return this.http.post('EmployeeMessages/GetByMainData', data);
      }
    }