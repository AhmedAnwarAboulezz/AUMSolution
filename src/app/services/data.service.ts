import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Subject, BehaviorSubject } from 'rxjs';
import { AlertService } from './AlertService';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient,
    private alertService: AlertService
  ) { }

  // Observable event sources
  private EventFire = new Subject();
  private appData = new BehaviorSubject(null);
  private printEvent = new BehaviorSubject(null);
  private OrganizationsData = new BehaviorSubject(null);
  private currentLang = new BehaviorSubject(null);

  EventFire$ = this.EventFire.asObservable();
  appData$ = this.appData.asObservable();
  printEvent$ = this.printEvent.asObservable();
  OrganizationsData$ = this.OrganizationsData.asObservable();
  currentLang$ = this.currentLang.asObservable();

  PrintEvent(Data: any) {
    this.printEvent.next(Data);
  }

  Organizations(Data: any) {
    this.OrganizationsData.next(Data);
  }

  CurrentLang(lang: any) {
    this.currentLang.next(lang);
  }









  // getList(url: string): Observable<any[]> {
  //   return this.http.get<any[]>(url)
  //     .pipe(
  //       // you can add the 'any' name here beside the getAll for more detailed error
  //       catchError(this.handleError())
  //     ).map(res => res.data);
  // }


  // postList(url: string, items: any[]): Observable<any> {
  //   return this.http.post<any>(url, items, httpOptions)
  //     .pipe(
  //       catchError(this.handleError())
  //     ).map(res => res.data);
  // }

  getActionResult(url: string, options?:any): Observable<any> {
    return this.http.get<any>(url, options)
      .pipe(
        catchError(this.handleError())
      ).map(res => res);
  }
  postActionResult(url: string, item: any, options?:any): Observable<any>  {
    let newOptions = (options !== null && options !== undefined) ? options : httpOptions;
    return this.http.post<any>(url, item, newOptions)
      .pipe(
        catchError(this.handleError())
      ).map(res => res);
  }

  get(url: string, options?:any): Observable<any> {
    
    return this.http.get<any>(url, options)
      .pipe(
        catchError(this.handleError())
      ).map(res => res.data);
  }
  post(url: string, item: any, options?:any): Observable<any>  {
    let newOptions = (options !== null && options !== undefined) ? options : httpOptions;
    return this.http.post<any>(url, item, newOptions)
      .pipe(
        catchError(this.handleError())
      ).map(res => res.data);
  }
  postQueryParamsReq(url: string, data: any, params?: any) {
    return this.http.post<any>(url, data, { params })
    .pipe(
      catchError(this.handleError())
    ).map(res => res.data);
  }
  put(url: string, item: any): Observable<any> {
    return this.http.put<any>(url, item, httpOptions)
      .pipe(
        catchError(this.handleError())
      ).map(res => res.data);
  }
  delete(url: string): Observable<any> {
    return this.http.delete<any>(url)
      .pipe(
        catchError(this.handleError())
      ).map(res => res.data);
  }





  postFormData(url: string, item: any): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({ reportProgress: 'true', observe: 'events' })
    };
    return this.http.post<any>(url, item, httpOption)
      .pipe(
        catchError(this.handleError())
      );
  }












  handleError() {
    return (error: any): Observable<any> => {  
      let message = this.getErrorMessage(error);
      if (message) {
        this.alertService.showError(message);      
      }
      return throwError(message);
    };
  }

  getErrorMessage(error): string {
      let message = '';
      let errors: Array<any> = error.error.data.errors;
      if (errors instanceof Object) {
        Object.keys(errors).forEach((key) => {
          
          let result = errors[key];
          if (typeof result === 'string'){
            message += result + '\n';
          }
          else{
            Object.keys(errors[key]).forEach((key2) =>{
              message += errors[key][key2] + '\n';
            });
          }
        });
      } 
      else if (typeof error.error === 'string') {
        message = error.error;
      } 
      else {
        message = 'Bad Request';
      }    
    return message;
  }
}
