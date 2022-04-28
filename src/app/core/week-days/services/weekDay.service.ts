import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeekDayService {
  constructor(private http: HttpService){
  }

  getWeekEnds(): Observable<any> {
    return this.http.get('WeekDays/GetAll');
  }

}
