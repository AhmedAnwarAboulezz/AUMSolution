import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { AuthGuard, AuthGuardLoginPage } from './guards/auth-guard.service';
import { ForgetPasswordComponent } from './component/forget-password/forget-password.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { NotfoundComponent } from './component/notfound/notfound.component';
import { OrganizationFilesComponent } from './component/organization-files/organization-files.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: '404',
    pathMatch: 'full'
  },
  {
    path: '404',
    component: NotfoundComponent,
    pathMatch: 'full',
    
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
    //canActivate: [AuthGuardLoginPage]
  },
  {
    path: 'main',
    loadChildren: 'src/app/component/main/main.module#MainModule',
    canActivate: [AuthGuard]
  }, 
  {
    path: 'forget-password',
    component: ForgetPasswordComponent,
    pathMatch: 'full'
    //canActivate: [AuthGuardLoginPage]
  },
  {
    path: 'reset',
    component: ResetPasswordComponent,
    pathMatch: 'full'
    //canActivate: [AuthGuardLoginPage]
  },
  {
    path: 'organization',
    loadChildren: 'src/app/component/organization-files/organization-file.module#OrganizationFileModule',
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
