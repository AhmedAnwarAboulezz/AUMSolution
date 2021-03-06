import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdvancedSearchService {

  constructor(private http: HttpService){
  }

getTeams(): Observable<any> {
  return this.http.get('Teams/GetDropdownList');
}

getLocations(): Observable<any> {
  return this.http.get('Locations/GetDropdownList');
}
getJobs(): Observable<any> {
  return this.http.get('Jobs/GetDropdownList');
}

getGenders(): Observable<any> {
  return this.http.get('Genders/GetDropdownList');
}

getAdvancedSearch(): Observable<any> {
  const sources = [];
  sources.push(this.getTeams());
  sources.push(this.getLocations());
  sources.push(this.getJobs());
  sources.push(this.getGenders());  
  return forkJoin(sources);
}

}
