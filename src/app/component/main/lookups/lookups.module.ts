import { CoreModule } from './../../../core/core.module';
import { AuthGuard } from '../../../guards/auth-guard.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesComponent } from './countries/countries.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LookupsRoutingModule } from './lookups-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CountryComponent } from './countries/country/country.component';
import { MatInputModule, MatFormFieldModule } from '@angular/material';
import { NgxMaskModule } from 'ngx-mask';
import { LocationsComponent } from './locations/locations.component';
import { LocationComponent } from './locations/location/location.component';
import { DepartmentComponent } from './departments/department/department.component';
import { DepartmentsComponent } from './departments/departments.component';
import { DevicesComponent } from './devices/devices.component';
import { DeviceComponent } from './devices/device/device.component';
import { RolesComponent } from './roles/roles.component';
import { RoleComponent } from './roles/role/role.component';
import { TriggersComponent } from './triggers/triggers.component';
import { AddTriggerComponent } from './triggers/add-trigger/add-trigger.component';
import { TriggerTimeComponent } from './triggers/trigger-time/trigger-time.component';
import { GroupsComponent } from './groups/groups.component';
import { HolidaiesComponent } from './holidaies/holidaies.component';
import { HolidayComponent } from './holidaies/holiday/holiday.component';
import { GroupComponent } from './groups/group/group.component';
import { DeviceGroupComponent } from './groups/device-group/device-group.component';
import { AccessDoorsComponent } from './access-doors/access-doors.component';
import { AccessDoorComponent } from './access-doors/access-door/access-door.component';
import { AccessDoorRightComponent } from './access-doors/access-door-right/access-door-right.component';
import { BranchesComponent } from './branches/branches.component';
import { BranchComponent } from './branches/branch/branch.component';
import { TriggerDevicesComponent } from './triggers/trigger-devices/trigger-devices.component';
import { AccessDoorDevicesComponent } from './access-doors/access-door-devices/access-door-devices.component';
import { JobsComponent } from './jobs/jobs.component';
import { JobComponent } from './jobs/job/job.component';
import { AdmistrativeLevelsComponent } from './admistrative-levels/admistrative-levels.component';
import { AdmistrativeLevelComponent } from './admistrative-levels/admistrative-level/admistrative-level.component';
import { ShowTreeComponent } from './admistrative-levels/show-tree/show-tree.component';
import { DeviceMonitorComponent } from './device-monitor/device-monitor.component';
import { EmployeeMessagesComponent } from './employee-messages/employee-messages.component';
import { EmployeeMessageComponent } from './employee-messages/employee-message/employee-message.component';
import { EmployeeMessageDetaialsComponent } from './employee-messages/employee-message-detaials/employee-message-detaials.component';
import { DevicesUnRegisterComponent } from './devices-un-register/devices-un-register.component';
import { DevicesRegisterComponent } from './devices-register/devices-register.component';
import { DevicesRegisterUnregisterComponent } from './devices-register-unregister/devices-register-unregister.component';
import { EmployeeInDevicesDashboardComponent } from './employee-in-devices-dashboard/employee-in-devices-dashboard.component';

@NgModule({
  entryComponents: [
    CountryComponent,
    LocationComponent,
    DepartmentComponent,
    DeviceComponent,
    RoleComponent,
    DeviceComponent, 
    AddTriggerComponent, TriggerDevicesComponent,
    TriggerTimeComponent,
    HolidayComponent,
    GroupComponent,
    DeviceGroupComponent,
    AccessDoorComponent, 
    AccessDoorRightComponent,BranchComponent,
    AccessDoorDevicesComponent,JobComponent,AdmistrativeLevelComponent,ShowTreeComponent,EmployeeMessageComponent,EmployeeMessageDetaialsComponent
  ],
  declarations: [
    CountryComponent,
    CountriesComponent,
    LocationsComponent,
    LocationComponent,
    DepartmentsComponent, 
    DepartmentComponent, 
    DevicesComponent, 
    DeviceComponent, 
    RolesComponent, 
    RoleComponent, 
    TriggersComponent, 
    AddTriggerComponent, TriggerDevicesComponent,
    TriggerTimeComponent, 
    HolidaiesComponent, 
    HolidayComponent, 
    GroupsComponent, 
    GroupComponent, 
    DeviceGroupComponent,
    AccessDoorsComponent, 
    AccessDoorComponent, 
    AccessDoorRightComponent, BranchesComponent, BranchComponent, TriggerDevicesComponent, AccessDoorDevicesComponent, JobsComponent, JobComponent, AdmistrativeLevelsComponent, AdmistrativeLevelComponent, ShowTreeComponent, DeviceMonitorComponent, EmployeeMessagesComponent, EmployeeMessageComponent, EmployeeMessageDetaialsComponent, DevicesUnRegisterComponent, DevicesRegisterComponent, DevicesRegisterUnregisterComponent, EmployeeInDevicesDashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    LookupsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    CoreModule, MatInputModule, MatFormFieldModule,
    NgxMaskModule.forRoot()
  ],
  exports: [
    CountriesComponent,
    LocationsComponent,
    DepartmentsComponent,TriggersComponent,BranchesComponent,JobsComponent,
    GroupsComponent,
    AccessDoorsComponent,
    ReactiveFormsModule, MatInputModule
  ],
  providers: [AuthGuard],
})
export class LookupsModule { }
