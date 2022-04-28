import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalizationService } from 'src/app/services/localization/localization.service';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/AlertService';
import { Shell } from '../shell';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})

export class NotfoundComponent implements OnInit {
  OrgID;
  showPage = false;
  get localize(): LocalizationService { return Shell.Injector.get(LocalizationService); }
  get Alert(): AlertService { return Shell.Injector.get(AlertService); }
  get Storage(): StorageService { return Shell.Injector.get(StorageService); }
  constructor(
    public route: Router,
    private authenticationService: AuthService,
    public localizationService: LocalizationService,
    
    private titleService: Title) {
    this.LoginUrl();
  }

  ngOnInit() {
    let screenName = this.localizationService.lang == 'ar' ? '404 صفحة' : '404Page';
    this.titleService.setTitle(screenName);
  }

  GoToUrl(OrgID: any) {
    if (OrgID == '' || OrgID == null) {
      this.Alert.showError(this.localize.translate.instant('Message.EnterCodeFirst'));

    }
    this.route.navigate(['login'], { queryParams: { code: OrgID } });
  }
  LoginUrl() {
    if (this.Storage.get('Organizations_data') !== null) {
      let Organizations_data = JSON.parse(this.Storage.get('Organizations_data'));
      let orgCode = Organizations_data.code;
      this.route.navigate(['login'], { queryParams: { code: orgCode } });

    }
    else{
      this.authenticationService.GetOrganizations()    
      .subscribe(result => {
        debugger;
        if (result.length == 1) {
          let OrgID = result[0].code;
          this.route.navigate(['login'], { queryParams: { code: OrgID } });
        }
        this.showPage = true;
        
      });
    }



  }

}
