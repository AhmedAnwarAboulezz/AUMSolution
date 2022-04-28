
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { HomeService } from '../component/main/home/services/home.service';
import { LocalizationService } from '../services/localization/localization.service';
import { Shell } from '../component/shell';
import { AlertService } from '../services/AlertService';
import { StorageService } from '../services/storage/storage.service';

@Injectable()
export class AuthGuard implements CanActivate {
  path: import ('@angular/router').ActivatedRouteSnapshot[];
  route: import ('@angular/router').ActivatedRouteSnapshot;
  get Storage(): StorageService { return Shell.Injector.get(StorageService); }
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(activatedRoute: ActivatedRouteSnapshot , state: RouterStateSnapshot) {
    

    //return true;
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.Storage.removeStorgeByKey('token');
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }

}

@Injectable()
export class AuthGuardLoginPage implements CanActivate {
  path: import ('@angular/router').ActivatedRouteSnapshot[];
  route: import ('@angular/router').ActivatedRouteSnapshot;
  get Storage(): StorageService { return Shell.Injector.get(StorageService); }
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(route, state: RouterStateSnapshot) {
    

   let rememberMe = JSON.parse(this.Storage.get('RememberMe'));
   if(rememberMe != null && rememberMe)
   {
     
      if (this.authService.isLoggedIn()) 
      {
        this.router.navigate(['/main/home']);
        return false;
      }
   }
   return true;
  }
}


@Injectable()
export class AuthGuardCheckPage implements CanActivate {
  path: import ('@angular/router').ActivatedRouteSnapshot[];
  route: import ('@angular/router').ActivatedRouteSnapshot;
  get localize(): LocalizationService { return Shell.Injector.get(LocalizationService); }
  get Alert(): AlertService { return Shell.Injector.get(AlertService); }

  constructor(
    private router: Router,
    private authService: AuthService,
    private homeService:HomeService
  ) { }



  async canActivate(activatedRoute: ActivatedRouteSnapshot , state: RouterStateSnapshot) {
    return true;
    // const isloggedFromOtherDevice: any = await this.homeService.IsLoginFromOtherDeviceRequest().toPromise();
    // if(isloggedFromOtherDevice){
    //     this.Storage.removeStorgeByKey('token');
    //     this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    //     this.Alert.showError(this.localize.translate.instant('Message.LogedFromOtherDevice'));  
    //     return false;
    // }
    // else{
    //   return true;
    // }
  }
}