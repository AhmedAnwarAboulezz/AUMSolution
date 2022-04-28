import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { BaseComponent } from '../../BaseComponent';
import { Shell } from '../../shell';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent extends BaseComponent implements OnInit {

  form: FormGroup;
  get DataService(): DataService { return Shell.Injector.get(DataService); }

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthService,

  ) {
    super();
  }

  ngOnInit() {
    this.initForm();
    this.OrganizationsData();
  }

  OrganizationsData() {
    this.DataService.OrganizationsData$.subscribe(res => {

    });
  }

  initForm() {
    this.form = this.fb.group({
      employeeNo: ['', Validators.required],
      civilId: ['', Validators.required],
      email: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  signUp() {
    this.authenticationService.signUp(this.form.value).subscribe(res => {
      this.alertService.showSuccess(`User Saved successfully`);

    });
  }
}