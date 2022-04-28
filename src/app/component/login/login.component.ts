import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { BaseComponent } from '../BaseComponent';
import { LocalizationService } from 'src/app/services/localization/localization.service';
import { HttpClient } from '@angular/common/http';
import { HttpService } from 'src/app/services/http/http.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { TreeNode } from 'angular-tree-component';
import { AlertService } from 'src/app/services/AlertService';
import { Shell } from '../shell';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {
  form: FormGroup;
  invalidLogin: boolean;
  Organizations_Data: any = false;
  logoFl: any = './assets/images/biglogo.png';
  logoSl: any = './assets/images/biglogo.png';
  hide = true;
  showChangeOrganization = true;
  get Alert(): AlertService { return Shell.Injector.get(AlertService); }
  get Storage(): StorageService { return Shell.Injector.get(StorageService); }
  get DataService(): DataService { return Shell.Injector.get(DataService); }

  
  constructor(
    private authenticationService: AuthService,
    fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public localizationService: LocalizationService,
    public http: HttpClient,
    public httpService: HttpService,
    private sanitizer: DomSanitizer,
    private titleService: Title
  ) {
    super();
     let code = this.activatedRoute.snapshot.queryParamMap.get('code');
    if ((code == null || code == '')) {
      this.router.navigate(['/404']);
    }
    this.form = fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false, Validators.required]
    });
  }

  ngOnInit() {

    let screenName = this.localizationService.lang == 'ar' ? 'الدخول' : 'Login';
    this.titleService.setTitle(screenName);
    this.OrganizationsData();
    this.getOrganizationByCode();
    this.ShowChangeOrganizationButton();
  }
  getOrganizationByCode() {
    let code = this.activatedRoute.snapshot.queryParamMap.get('code');

    let languageStorage = this.Storage.get('language');
    let tokenStorage = this.Storage.get('token');
    if (!tokenStorage) {
      this.service.getTams(`Organizations/GetCode/${code}`).subscribe(res => {
        this.DataService.Organizations(res);
        this.Storage.set('Organizations_data', JSON.stringify(res));
        if (!languageStorage) {
          this.Storage.set('language', res.primaryLanguage.toLowerCase());
        }
      }, error => {
        this.router.navigate(['/404']);
        this.Storage.removeStorgeByKey('Organizations_data');
      }
      );
    }
  }
  ShowChangeOrganizationButton() {   
      this.authenticationService.OrganizationCount()
      .subscribe(result => {
        if (result == false) {
          this.showChangeOrganization = false;
        }        
      });
    }

  OrganizationsData() {

    this.DataService.OrganizationsData$.subscribe(async (res) => {
      if (res) {
        this.Organizations_Data = res;
        this.logoFl = this.sanitizer.bypassSecurityTrustResourceUrl(res['logoURLFl']);
        this.logoSl = this.sanitizer.bypassSecurityTrustResourceUrl(res['logoURLSl']);
      } else {
        let Organizations_data = this.Storage.get('Organizations_data');
        Organizations_data = JSON.parse(Organizations_data);
        if (Organizations_data) {
          this.Organizations_Data = Organizations_data;
          this.logoFl = this.sanitizer.bypassSecurityTrustResourceUrl(Organizations_data['logoURLFl']);
          this.logoSl = this.sanitizer.bypassSecurityTrustResourceUrl(Organizations_data['logoURLSl']);
        }
      }
    });
  }

  authorize() {
    debugger;
     if (this.Storage.get('Organizations_data') === null) {
       this.getOrganizationByCode();
     }
     let val = this.form.value;
    let Organizations_data = JSON.parse(this.Storage.get('Organizations_data'));
     val.organizationId = Organizations_data ? Organizations_data.id : null;

    this.authenticationService.login(val)
      .subscribe(result => {
        
        if (result) {          
          
          let url = this.activatedRoute.snapshot.queryParamMap.get('returnUrl');
          url ? this.router.navigate([url]) : this.router.navigate(['/main']);
          this.invalidLogin = false;
          this.Storage.set('RememberMe', JSON.stringify(this.form.value.rememberMe));
        } else {
          this.invalidLogin = true;
          this.Alert.showError(this.localize.translate.instant('Login.InvalidUserNameorPassword'));
          this.Storage.set('RememberMe', JSON.stringify(false));

        }
      });
  }

  changeLanguage(culture: string) {
    this.localizationService.changeLang(culture);
    let screenName = culture == 'ar' ? 'الدخول' : 'Login';
    this.titleService.setTitle(screenName);
  }
  changeorganization()
  {
    this.Storage.removeStorgeByKey('Organizations_data');
    this.router.navigate(['/404']);
  }



}
