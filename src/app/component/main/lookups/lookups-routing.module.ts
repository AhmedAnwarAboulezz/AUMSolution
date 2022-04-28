
import { AuthGuardCheckPage } from '../../../guards/auth-guard.service';
import { CountriesComponent } from './countries/countries.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocationsComponent } from './locations/locations.component';
import { DepartmentsComponent } from './departments/departments.component';
import { DevicesComponent } from './devices/devices.component';
import { RolesComponent } from './roles/roles.component';
import { TriggersComponent } from './triggers/triggers.component';
import { GroupsComponent } from './groups/groups.component';
import { HolidaiesComponent } from './holidaies/holidaies.component';
import { AccessDoorsComponent } from './access-doors/access-doors.component';
import { AccessDoorRightComponent } from './access-doors/access-door-right/access-door-right.component';
import { BranchesComponent } from './branches/branches.component';
import { TriggerTimeComponent } from './triggers/trigger-time/trigger-time.component';
import { JobsComponent } from './jobs/jobs.component';
import { AdmistrativeLevelsComponent } from './admistrative-levels/admistrative-levels.component';
import { DeviceMonitorComponent } from './device-monitor/device-monitor.component';
import { EmployeeMessagesComponent } from './employee-messages/employee-messages.component';
import { DevicesUnRegisterComponent } from './devices-un-register/devices-un-register.component';
import { DevicesRegisterComponent } from './devices-register/devices-register.component';
import { DevicesRegisterUnregisterComponent } from './devices-register-unregister/devices-register-unregister.component';
import { EmployeeInDevicesDashboardComponent } from './employee-in-devices-dashboard/employee-in-devices-dashboard.component';


const routes: Routes = [

  {
    path: '',
    redirectTo: 'countries',
    pathMatch: 'full'
  },
  {
    path: 'countries',
    component: CountriesComponent,
    pathMatch: 'full',
    canActivate:[AuthGuardCheckPage]
  },
  {
    path: 'locations',
    component: LocationsComponent,
    pathMatch: 'full',
    canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'departments',
    component: DepartmentsComponent,
    pathMatch: 'full',
    canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'devices',
    component: DevicesComponent,
    pathMatch: 'full',
    canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'triggers',
    component: TriggersComponent,
    pathMatch: 'full',
    canActivate:[AuthGuardCheckPage]
  },
  {
    path: 'groups',
    component: GroupsComponent,
    pathMatch: 'full',
    canActivate:[AuthGuardCheckPage]
  }
  ,{
    path: 'roles',
    component: RolesComponent,
    pathMatch: 'full',
    canActivate:[AuthGuardCheckPage]
  }
  ,{
    path: 'holidaies',
    component: HolidaiesComponent,
    pathMatch: 'full',
    canActivate:[AuthGuardCheckPage]
  },
  {
    path: 'accessDoors',
    component: AccessDoorsComponent,
    pathMatch: 'full',
    canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'accessDoorRight/:id',
    component: AccessDoorRightComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardCheckPage]
  },
  {
    path: 'branches',
    component: BranchesComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardCheckPage]
  },
  {
    path: 'triggerTimes/:id',
    component: TriggerTimeComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardCheckPage]
  },
  {
    path: 'jobs',
    component: JobsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardCheckPage]
  },
  {
    path: 'admistrativeLevel',
    component: AdmistrativeLevelsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardCheckPage]
  },
  {
    path: 'device-monitor',
    component: DeviceMonitorComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardCheckPage]
  },
  {
    path: 'employee-messages',
    component: EmployeeMessagesComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardCheckPage]
  },
  {
    path: 'devices-unRegister',
    component: DevicesUnRegisterComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardCheckPage]
  },
  {
    path: 'devices-Register',
    component: DevicesRegisterComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardCheckPage]
  },
  {
    path: 'devices-Register-with-unRegister',
    component: DevicesRegisterUnregisterComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardCheckPage]
  },
  {
    path: 'employee-in-devices-dashboard',
    component: EmployeeInDevicesDashboardComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardCheckPage]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LookupsRoutingModule { }
