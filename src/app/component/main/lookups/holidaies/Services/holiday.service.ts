import { Injectable } from "@angular/core";
import { HttpService } from "src/app/services/http/http.service";

@Injectable({
    providedIn: 'root'
  })
  export class HolidayService {
      constructor(private http: HttpService){
      }
}