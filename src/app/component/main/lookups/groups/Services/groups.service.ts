import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
    constructor(private http: HttpService){
    }
    getGroupBygroupDescription(groupDescription:any): Observable<any> {
      return this.http.get(`Groups/GetByDescription/${groupDescription}`);
    }
}