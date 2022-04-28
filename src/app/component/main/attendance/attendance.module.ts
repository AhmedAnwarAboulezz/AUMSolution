import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceRoutingModule } from './attendance-routing.module';
import { EmployeeAttedancesComponent } from './employee-attedances/employee-attedances.component';
import { AttendanceGridComponent } from './employee-attedances/attendance-grid/attendance-grid.component';
import { EmployeeAttedanceComponent } from './employee-attedances/employee-attedance/employee-attedance.component';
import { AuthGuard } from 'src/app/guards/auth-guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { NgxMaskModule } from 'ngx-mask';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { EmployeesFingerprintComponent } from './employees-fingerprint/employees-fingerprint.component';
import { EmployeeManualLogsComponent } from './employee-manual-logs/employee-manual-logs.component';
import { EmployeeManualLogComponent } from './employee-manual-logs/employee-manual-log/employee-manual-log.component';

const COMPONENTS = [EmployeeAttedancesComponent, AttendanceGridComponent, EmployeeAttedanceComponent, EmployeesFingerprintComponent
                    , EmployeeManualLogsComponent, EmployeeManualLogComponent];
@NgModule({
  declarations: [COMPONENTS],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    AttendanceRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    CoreModule, MatInputModule, MatFormFieldModule,
    NgxMaskModule.forRoot()
  ],
  entryComponents: [COMPONENTS],
  exports: [ReactiveFormsModule, MatInputModule],
  providers: [AuthGuard],
})
export class AttendanceModule { }



