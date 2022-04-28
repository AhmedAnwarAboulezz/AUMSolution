import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { LayoutModule } from '@angular/cdk/layout';

import { MaterialModule } from '../../material-module';
import { HomeComponent } from './home/home.component';

// multi language
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { CoreModule } from 'src/app/core/core.module';
// PasswordStrength
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';

import { DatePipe } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './page/layout/layout.component';
import { SidebarComponent } from './page/sidebar/sidebar.component';
import { NavbarComponent } from './page/navbar/navbar.component';
import { FooterComponent } from './page/footer/footer.component';

@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    SignupComponent,
    LayoutComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    LayoutModule,
    MaterialModule,
    CoreModule,
    MatPasswordStrengthModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    //LayoutComponent
  ],

  providers: [
    DatePipe
  ],
})
export class MainModule { }
