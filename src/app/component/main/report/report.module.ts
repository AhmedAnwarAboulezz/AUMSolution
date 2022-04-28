import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceReportComponent } from './device-report/device-report.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material-module';
import { CoreModule } from 'src/app/core/core.module';
import { LaddaModule } from 'angular2-ladda';
import { ReportsRoutingModule } from './reports-routing.module';
import { EmployeeTransactionReportComponent } from './employee-transaction-report/employee-transaction-report.component';
import { DeviceConnectEmployeesReportComponent } from './device-connect-employees-report/device-connect-employees-report.component';
import { DeviceConnectGroupReportComponent } from './device-connect-group-report/device-connect-group-report.component';
import { EmployeeConnectDeviceReportComponent } from './employee-connect-device-report/employee-connect-device-report.component';
import { EmployeeLocationReportComponent } from './employee-location-report/employee-location-report.component';
import { UnKnownUserReportComponent } from './un-known-user-report/un-known-user-report.component';
import { EmployeeAttendanceLogReportComponent } from './employee-attendance-log-report/employee-attendance-log-report.component';



@NgModule({

  declarations: [DeviceReportComponent, EmployeeTransactionReportComponent,DeviceConnectEmployeesReportComponent, DeviceConnectGroupReportComponent, EmployeeConnectDeviceReportComponent, EmployeeLocationReportComponent, UnKnownUserReportComponent, EmployeeAttendanceLogReportComponent],

  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule,
    FormsModule,
    SharedModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    CoreModule,
    LaddaModule,
    LaddaModule.forRoot({
      style: 'contract',
      spinnerSize: 30,
      spinnerColor: 'red',
      spinnerLines: 15
    }),
  ],

})
export class ReportModule { }
