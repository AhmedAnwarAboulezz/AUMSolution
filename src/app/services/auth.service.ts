import { Screen } from './../models/Screen';
import { Injectable } from '@angular/core';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { DataService } from 'src/app/services/data.service';
import { APIs } from './APIs';
import 'rxjs/add/operator/map';
import { Menu } from '../models/Menu';
import { Permissions } from '../models/Permissions';
import { AlertService } from './AlertService';
import { Shell } from '../component/shell';
import { TokenService } from './TokenService';
import { StorageService } from './storage/storage.service';
import { HttpService } from './http/http.service';
import * as screenData from './screendata.json';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly JWT_TOKEN = 'token';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  currentUser: any;
  screens;
  products: any = (screenData as any).default;

  get Alert(): AlertService { return Shell.Injector.get(AlertService); }
  get Storage(): StorageService { return Shell.Injector.get(StorageService); }

  constructor(
    private service: HttpService,
    public tokenService: TokenService) {

    let token = this.Storage.get('token');
    if (token) {
      let jwt = new JwtHelper();
      this.currentUser = jwt.decodeToken(token);
    }
  }

  login(credentials) {
    return this.service.post('Accounts/Login', credentials)
      .map(result => {       
        if (result && result.token) {
          this.tokenService.storeTokens(result);
          // this.Storage.set('groups', JSON.stringify(result.groups));
          
          let jwt = new JwtHelper();
          this.currentUser = jwt.decodeToken(this.tokenService.getJwtToken());
          
          if (result.infoMessage !== "" && result.infoMessage != null) {
            this.Alert.showInformation(result.infoMessage);
          }
          return true;
        }
        return false;
      });
  }

  signUp(data) {
    return this.service.post('Users/Add', data);
  }

  changepassword(data) {
    return this.service.post('Users/ChangePassword', data);
  }

  forgetPassword(data) {
    return this.service.post('UserMangments/ForgetPassword', data);
  }

  logout() {
    this.currentUser = null;
    this.tokenService.removeTokens();
  }

  getPermissions(componentName: string): Permissions {
    const screensAuthorities: Menu[] = JSON.parse(this.Storage.get('ScreensAuthorities')) as Menu[];

    for (let item of screensAuthorities) {
      const roles = item.childerns.find(e => e.componentName.toLowerCase() == componentName.toLowerCase());
      if (roles) {
        if ((componentName === 'ImportExcel') && roles.permissions.add) {
          roles.permissions.add = false;
        }
        return roles.permissions;
      }
    }
    return { view: false, add: false, update: false, delete: false, print: false };
  }

  loadScreenAuthorities() {   
    this.service.get('UserMangments/GetScreensAuthorities')
      .subscribe((result: Menu[]) => {      
        this.screens = result;
        this.Storage.set('ScreensAuthorities', JSON.stringify(result));
      });
  }

  GetOrganizations() {
   return this.service.getTams('Organizations/GetAll');
  }
  OrganizationCount() {
    return this.service.getTams('Organizations/OrganizationCount');
  }
  isLoggedIn(token: string = 'tokenAum') {
    return tokenNotExpired(token);
    //return (token == 'token' ? !!this.tokenService.getJwtToken() : tokenNotExpired(token));
  }

  GetUserBranches(){
    return this.service.get('Branches/GetUserBranchesDropDown');
  }



}
