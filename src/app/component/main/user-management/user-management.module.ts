import { CoreModule } from './../../../core/core.module';
import { AuthGuard } from '../../../guards/auth-guard.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material-module';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { GroupsComponent } from './groups/groups.component';
import { GroupComponent } from './groups/group/group.component';
import { UsermangmentsComponent } from './usermangments/usermangments.component';
import { UsermangmentComponent } from './usermangments/usermangment/usermangment.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { GroupRolesComponent } from './group-roles/group-roles.component';
import { RolesTableComponent } from './group-roles/roles-table/roles-table.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeComponent } from './employees/employee/employee.component';
import { GroupEmployeesComponent } from './group-employees/group-employees.component';
import { GroupEmployeesDetailsComponent } from './group-employees/group-employees-details/group-employees-details.component';
import { EmployeeGroupDetailsComponent } from './employee-groups/employee-group-details/employee-group-details.component';
import { EmployeeGroupsComponent } from './employee-groups/employee-groups.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeDetailComponent } from './employee-details/employee-detail/employee-detail.component';
import { EmployeeGroupExpiredDateDashboardComponent } from './employee-group-expired-date-dashboard/employee-group-expired-date-dashboard.component';
import { EmployeeGroupExpiredDateTodayDashboardComponent } from './employee-group-expired-date-today-dashboard/employee-group-expired-date-today-dashboard.component';
import { EmployeeGroupExpiredDateSoonDashboardComponent } from './employee-group-expired-date-soon-dashboard/employee-group-expired-date-soon-dashboard.component';
import { EmployeeGroupExpiredDateComponent } from './employee-group-expired-date-dashboard/employee-group-expired-date/employee-group-expired-date.component';
import { EmployeeGroupExpiredDateTodayComponent } from './employee-group-expired-date-today-dashboard/employee-group-expired-date-today/employee-group-expired-date-today.component';
import { EmployeeGroupExpiredDateSoonComponent } from './employee-group-expired-date-soon-dashboard/employee-group-expired-date-soon/employee-group-expired-date-soon.component';

@NgModule({
  declarations: [GroupsComponent, GroupComponent,
    ChangepasswordComponent, UsermangmentsComponent, 
    UsermangmentComponent, GroupRolesComponent, 
    RolesTableComponent, EmployeesComponent,
     EmployeeComponent, GroupEmployeesComponent, GroupEmployeesDetailsComponent, EmployeeGroupsComponent, EmployeeGroupDetailsComponent, EmployeeDetailsComponent, EmployeeDetailComponent, EmployeeGroupExpiredDateDashboardComponent, EmployeeGroupExpiredDateTodayDashboardComponent, EmployeeGroupExpiredDateSoonDashboardComponent, EmployeeGroupExpiredDateComponent, EmployeeGroupExpiredDateTodayComponent, EmployeeGroupExpiredDateSoonComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    UserManagementRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    CoreModule,
    MatPasswordStrengthModule,
    SharedModule
  ],
  providers: [AuthGuard],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [
    GroupComponent,
    UsermangmentComponent,EmployeeDetailComponent,
    EmployeeComponent,GroupEmployeesDetailsComponent,EmployeeGroupDetailsComponent,EmployeeGroupExpiredDateComponent,EmployeeGroupExpiredDateTodayComponent,EmployeeGroupExpiredDateSoonComponent
  ],
  exports: [EmployeesComponent,GroupEmployeesComponent]
})
export class UserManagementModule {

}
