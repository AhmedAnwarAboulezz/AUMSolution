import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardCheckPage } from 'src/app/guards/auth-guard.service';
import { AccessGroupsWithDevicesComponent } from './access-groups-with-devices/access-groups-with-devices.component';
import { AccessGroupsWithEmployeesComponent } from './access-groups-with-employees/access-groups-with-employees.component';
import { AccessGroupsComponent } from './access-groups/access-groups.component';
import { UpdateAccessGroupRightComponent } from './access-groups/update-access-group-right/update-access-group-right.component';


const routes: Routes = [

  {
    path: '',
    redirectTo: 'accessGroups',
    pathMatch: 'full'
  },
  {
    path: 'accessGroups',
    component: AccessGroupsComponent,
    pathMatch: 'full',
    canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'accessGroupRight/:id',
    component: UpdateAccessGroupRightComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardCheckPage]
  },
  {
    path: 'accessGroupsDevices',
    component: AccessGroupsWithDevicesComponent,
    pathMatch: 'full',
    canActivate:[AuthGuardCheckPage]

  },
  {
    path: 'accessGroupsEmployees',
    component: AccessGroupsWithEmployeesComponent,
    pathMatch: 'full',
    canActivate:[AuthGuardCheckPage]
  }

  
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessDevicesRoutingModule { }
