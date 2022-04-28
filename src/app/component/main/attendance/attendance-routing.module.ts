import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeAttedancesComponent } from './employee-attedances/employee-attedances.component';
import { AttendanceGridComponent } from './employee-attedances/attendance-grid/attendance-grid.component';
import { EmployeeAttedanceComponent } from './employee-attedances/employee-attedance/employee-attedance.component';
import { AuthGuardCheckPage } from 'src/app/guards/auth-guard.service';
import { EmployeesFingerprintComponent } from './employees-fingerprint/employees-fingerprint.component';
import { EmployeeManualLogsComponent } from './employee-manual-logs/employee-manual-logs.component';




const routes: Routes = [
  {
    path: '',
    redirectTo: 'employee-attendances',
    pathMatch: 'full'
  },
  {
    path: 'employees-fingerprint',
    component: EmployeesFingerprintComponent,
    pathMatch: 'full',
    canActivate:[AuthGuardCheckPage]
  },
  {
    path: 'employee-manual-logs',
    component: EmployeeManualLogsComponent,
    pathMatch: 'full',
    canActivate:[AuthGuardCheckPage]
  },
  {
    path: 'employee-attendances',
    component: EmployeeAttedancesComponent,
    pathMatch: 'full',
    canActivate:[AuthGuardCheckPage]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AttendanceRoutingModule { }
