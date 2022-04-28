import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import { JwtHelper } from 'angular2-jwt';
import { BaseComponent } from '../BaseComponent';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Shell } from '../shell';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent extends BaseComponent implements OnInit {

  minPw = 8;
  match = false;
  form: FormGroup;
  token: string;
  currentUser: any;
  get Storage(): StorageService { return Shell.Injector.get(StorageService); }
  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthService,

    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {
    super();
  }
  showLoader: boolean;
  showDetails: boolean;
  color = '';
  ngOnInit() {
    this.initForm();
    this.token = this.activatedRoute.snapshot.queryParamMap.get('token');
    this.Storage.set('tokenforresetpassword', this.token);
    let jwt = new JwtHelper();
    this.currentUser = jwt.decodeToken(this.token);
    if (!this.authenticationService.isLoggedIn('tokenforresetpassword')) {
      this.route.navigate(['/login']);
    }
    this.Storage.removeStorgeByKey('tokenforresetpassword');
  }

  initForm() {
    this.form = this.fb.group({
      newPassword: ['', Validators.required],
      NewPasswordConfirm: ['', [Validators.required,  Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')  ]]
    });
  }

  resetpassword() {
    this.showLoader = true;
    this.Storage.set('token', this.token);
    this.service.post('Users/ResetPassword', this.form.value)
      .subscribe(res => {
        this.showLoader = false;
        this.Storage.removeStorgeByKey('token');

        this.alertService.showSuccess(`Password reset successfully. you will return to login automatic`);
        var that = this;
        setTimeout(function () {
          that.route.navigate(['/login']);
        }, 1000);
      }, err => {
        this.showLoader = false;
        this.Storage.removeStorgeByKey('token');
        this.alertService.showError('Incorrect password, please enter valid password');
      });
  }

  onPasswordInput(pass1: string, pass2: string) {
    if (pass1 == pass2)
      this.match = true;
    else
      this.match = false;
    if (this.match == false)
      this.form.setErrors([{ 'match': true }]);
    else
      this.form.setErrors(null);
  }
  onStrengthChanged(strength: number) {

  }
}
