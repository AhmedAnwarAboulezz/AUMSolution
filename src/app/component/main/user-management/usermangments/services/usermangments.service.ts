import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsermangmentsService {
  constructor(private http: HttpService){
  }
  getBranchs(): Observable<any> {
    return this.http.get('Branches/GetAll');
  }
  getRoles(): Observable<any> {
    return this.http.get('Roles/GetAll');
  }
  setUserIsLogedOut(): Observable<any> {
    return this.http.get('Users/SetUserIsLogedOut');
  }
  getEmployeeImage(): Observable<any> {
    return this.http.get('employees/GetImage', { responseType: 'text' });
  }
  
  getLookup(): Observable<any> {
    const sources = [];
    sources.push(this.getBranchs());
    sources.push(this.getRoles());
    return forkJoin(sources);
  }
}
