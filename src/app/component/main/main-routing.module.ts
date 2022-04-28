import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuardCheckPage } from 'src/app/guards/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent,
        canActivate:[AuthGuardCheckPage]
      },
      {
        path: 'lookups',
        loadChildren: 'src/app/component/main/lookups/lookups.module#LookupsModule'
      },
      {
         path:'accessGroups',
         loadChildren: 'src/app/component/main/access-devices/access-devices.module#AccessDevicesModule'
      },
      {
        path: 'usermanagement',
        loadChildren: 'src/app/component/main/user-management/user-management.module#UserManagementModule'
      },
      {
        path: 'report',
        loadChildren: 'src/app/component/main/report/report.module#ReportModule'
      },
      {
        path: 'signup',
        component: SignupComponent
      },
      {
        path: 'attendance',
        loadChildren: 'src/app/component/main/attendance/attendance.module#AttendanceModule'
      },
      {
        path: 'organizations',
        loadChildren: 'src/app/component/main/organization/organization.module#OrganizationModule'
      },
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
