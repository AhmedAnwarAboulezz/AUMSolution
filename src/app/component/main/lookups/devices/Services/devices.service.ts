import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {
    constructor(private http: HttpService){

    }


  getLocation(): Observable<any> {
    
    return this.http.get('Devices/GetDropdownLocationsList');    
  }
  GetAllDeviceType(): Observable<any> {
    return this.http.get('Devices/GetDropdownDeviceTypesList');    
  }
}