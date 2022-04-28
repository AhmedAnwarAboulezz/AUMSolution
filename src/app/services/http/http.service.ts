import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'ngx-envconfig';
import { Observable } from 'rxjs';
import { HttpServiceBaseService } from 'src/app/component/base/services/HttpServiceBase';
import { DataService } from '../data.service';
@Injectable({
  providedIn: 'root'
})

/**
 * Manipulate the HTTP requests for the whole app
 * handle the main POST, GET, UPDATE, DELETE methods
 */
export abstract class HttpService extends HttpServiceBaseService {

  //nativeBaseUrl: string;
  public serverUrl = this.configService.get('host');
  public logoutHub = this.configService.get('LogoutHub');
  public tamsServerUrl = this.configService.get('tamshost');
  public reportHost = this.configService.get('reportHost');

  constructor(public http: HttpClient, private configService: ConfigService, private dataService: DataService) {
    super();
  }

  // /**
  //  * Get request using angular httpClient module
  //  */
  // getLookup(url: string, data?: any) {
  //   return this.http.get(this.serverUrl + url, data);
  // }




  // /**
  //  * Get request using angular httpClient module
  //  */
  // getReq(url: string, data?: any) {
  //   return this.http.get(this.serverUrl + this.baseUrl + url, data);
  // }
  // /**
  //  * Get request using angular httpClient module
  //  */
  // getPaged(url: string, data: any): Observable<any> {
  //   return this.http.post(this.serverUrl + url, data);
  // }

  // /**
  //  * Get request using angular httpClient module
  //  */
  // getQueryReq(url: string, params?: any) {
  //   return this.http.get(this.serverUrl + url, { params });
  // }
  // /**
  //  * Get request using angular httpClient module
  //  * you can bass a parameter (data) in the url separated by '/'
  //  */
  // getHeaderReq(url: string, data: string) {
  //   return this.http.get(this.serverUrl + url + '/' + data);
  // }





  // getReq(url: any): Observable<any> {
  //   let baseUrl = (this.baseUrl == undefined || this.baseUrl == null) ? this.nativeBaseUrl : this.baseUrl;
  //   return this.dataService.get(this.serverUrl + baseUrl + url);
  // }
  /**
   * Post request using angular httpClient module
   */
  //   postReq(url: string, data: any) {
  //     let baseUrl = (this.baseUrl == undefined || this.baseUrl == null) ? this.nativeBaseUrl : this.baseUrl;
  //   return this.dataService.post(this.serverUrl + baseUrl + url, data);
  // }

  /**
 * Post request using angular httpClient module
 */
  get(url: any, options?: any): Observable<any> {
    return this.dataService.get(this.serverUrl + url, options);
  }

  post(url: string, data: any, options?: any) {
    return this.dataService.post(this.serverUrl + url, data, options);
  }
  postSpecific(url: string, data: any, options?: any) {
    return this.dataService.post(url, data, options);
  }
  postReport(url: string, data: any, options?: any) {
    return this.dataService.postActionResult(this.reportHost + url, data, options);
  }
  getTams(url: any, options?: any): Observable<any> {
    return this.dataService.getActionResult(this.tamsServerUrl + url, options);
  }

  postTams(url: string, data: any, options?: any) {
    return this.dataService.postActionResult(this.tamsServerUrl + url, data, options);
  }

  /**
   * PUT request using angular httpClient module
   * you can bass a parameter (data) in the url separated by '/'
   */
  put(url: string, data?: any) {
    return this.dataService.put(this.serverUrl + url, data);
  }
  putTams(url: string, data?: any) {
    return this.dataService.put(this.tamsServerUrl + url, data);
  }

  deleteReq(url: string, data?: any) {
    return this.dataService.delete(this.serverUrl + url + '/' + data);
  }


  /**
 *  Post Request For Custom Component services
 */
  customPostReq(url: string, data: any) {
    return this.http.post(this.serverUrl + url, data);
  }

  postQueryParamsReq(url: string, data: any, params?: any) {
    return this.dataService.postQueryParamsReq(this.serverUrl + url, data, params);
  }



}
