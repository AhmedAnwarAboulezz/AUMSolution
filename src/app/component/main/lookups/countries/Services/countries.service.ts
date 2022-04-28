import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class CountriesService{
  constructor(private http: HttpService){
  }

  

  getLocations(): Observable<any> {
    return this.http.get('Locations/GetAll');
  }
}
