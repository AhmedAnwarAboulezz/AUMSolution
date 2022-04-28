import { GroupsComponent } from './groups/groups.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { GroupRolesComponent } from './group-roles/group-roles.component';
import { AuthGuardCheckPage } from 'src/app/guards/auth-guard.service';
import { UsermangmentsComponent } from './usermangments/usermangments.component';
import { EmployeesComponent } from './employees/employees.component';
import { GroupEmployeesComponent } from './group-employees/group-employees.component';
import { EmployeeGroupsComponent } from './employee-groups/employee-groups.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeGroupExpiredDateDashboardComponent } from './employee-group-expired-date-dashboard/employee-group-expired-date-dashboard.component';
import { EmployeeGroupExpiredDateTodayDashboardComponent } from './employee-group-expired-date-today-dashboard/employee-group-expired-date-today-dashboard.component';
import { EmployeeGroupExpiredDateSoonDashboardComponent } from './employee-group-expired-date-soon-dashboard/employee-group-expired-date-soon-dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'groups',
    pathMatch: 'full'
  },
  {
    path: 'groups',
    component: GroupsComponent,
    pathMatch: 'full',
    canActivate:[AuthGuardCheckPage]
  },
  {
    path: 'usermangments',
    component: UsermangmentsComponent,
    pathMatch: 'full',
    canActivate:[AuthGuardCheckPage]
  }, 
  {
    path: 'changepassword',
    component: ChangepasswordComponent,
    canActivate:[AuthGuardCheckPage]
  },
  {
    path: 'group-roles',
    component: GroupRolesComponent,
    pathMatch: 'full',
    canActivate:[AuthGuardCheckPage]
  },
  {
    path: 'employees',
    component: EmployeesComponent,
    pathMatch: 'full',
    canActivate:[AuthGuardCheckPage]
  }
  ,
  {
    path: 'group-employees',
    component: GroupEmployeesComponent,
    pathMatch: 'full',
    canActivate:[AuthGuardCheckPage]
  },{
    path: 'employee-groups',
    component: EmployeeGroupsComponent,
    pathMatch: 'full',
    canActivate:[AuthGuardCheckPage]
  },
  {
    path: 'employee-detail',
    component: EmployeeDetailsComponent,
    pathMatch: 'full',
    canActivate:[AuthGuardCheckPage]
  },
  {
    path: 'employee-group-expired-date-dash-board',
    component: EmployeeGroupExpiredDateDashboardComponent,
    pathMatch: 'full',
    canActivate:[AuthGuardCheckPage]
  },
  {
    path: 'employee-group-expired-date-today-dash-board',
    component: EmployeeGroupExpiredDateTodayDashboardComponent,
    pathMatch: 'full',
    canActivate:[AuthGuardCheckPage]
  },
  {
    path: 'employee-group-expired-date-soon-dash-board',
    component: EmployeeGroupExpiredDateSoonDashboardComponent,
    pathMatch: 'full',
    canActivate:[AuthGuardCheckPage]
  }
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
