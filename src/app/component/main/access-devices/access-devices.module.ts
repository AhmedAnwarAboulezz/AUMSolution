import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccessDevicesRoutingModule } from './access-devices-routing.module';
import { AccessGroupsComponent } from './access-groups/access-groups.component';
import { AccessGroupsWithDevicesComponent } from './access-groups-with-devices/access-groups-with-devices.component';
import { AccessGroupsWithEmployeesComponent } from './access-groups-with-employees/access-groups-with-employees.component';
import { AuthGuard } from 'src/app/guards/auth-guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { CoreModule } from 'src/app/core/core.module';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { EmployeeAccessGroupComponent } from './access-groups-with-employees/employee-access-group/employee-access-group.component';
import { UpdateAccessGroupRightComponent } from './access-groups/update-access-group-right/update-access-group-right.component';
import { AccessGroupComponent } from './access-groups/access-group/access-group.component';
import { DeviceAccessGroupComponent } from './access-groups-with-devices/device-access-group/device-access-group.component';

const COMPONENTS = [AccessGroupComponent,
  EmployeeAccessGroupComponent,
  DeviceAccessGroupComponent];
@NgModule({
  declarations: [AccessGroupsComponent, AccessGroupsWithDevicesComponent, AccessGroupsWithEmployeesComponent, UpdateAccessGroupRightComponent, EmployeeAccessGroupComponent, AccessGroupComponent, DeviceAccessGroupComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    AccessDevicesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    CoreModule, MatInputModule, MatFormFieldModule,
    NgxMaskModule.forRoot()
  ],

  entryComponents: [COMPONENTS],
  exports: [
    ReactiveFormsModule, MatInputModule, COMPONENTS
  ],
  providers: [AuthGuard],
})
export class AccessDevicesModule { }
