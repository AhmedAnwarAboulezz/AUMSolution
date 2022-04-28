import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardCheckPage } from 'src/app/guards/auth-guard.service';
import { DeviceConnectEmployeesReportComponent } from './device-connect-employees-report/device-connect-employees-report.component';
import { DeviceConnectGroupReportComponent } from './device-connect-group-report/device-connect-group-report.component';
import { DeviceReportComponent } from './device-report/device-report.component';
import { EmployeeAttendanceLogReportComponent } from './employee-attendance-log-report/employee-attendance-log-report.component';
import { EmployeeConnectDeviceReportComponent } from './employee-connect-device-report/employee-connect-device-report.component';
import { EmployeeLocationReportComponent } from './employee-location-report/employee-location-report.component';
import { EmployeeTransactionReportComponent } from './employee-transaction-report/employee-transaction-report.component';
import { UnKnownUserReportComponent } from './un-known-user-report/un-known-user-report.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'device-reportreport',
    pathMatch: 'full'
  },
  {
    path: 'device-report',
    component: DeviceReportComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]
  },
  {
    path: 'employee-transaction-report',
    component: EmployeeTransactionReportComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]
  },
  {
    path: 'device-connectemployees-report',
    component: DeviceConnectEmployeesReportComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]
    
  }
  ,
  {
    path: 'device-connect-group-report',
    component: DeviceConnectGroupReportComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]
    
  },
  {
    path: 'employee-connect-device-report',
    component: EmployeeConnectDeviceReportComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]
    
  }
  ,
  {
    path: 'employee-location-report',
    component: EmployeeLocationReportComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]
    
  }
  ,
  {
    path: 'un-knownUser-report',
    component: UnKnownUserReportComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]
    
  }
  ,
  {
    path: 'employee-attendance-log-report',
    component: EmployeeAttendanceLogReportComponent,
    pathMatch: 'full'
    ,canActivate:[AuthGuardCheckPage]
    
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
