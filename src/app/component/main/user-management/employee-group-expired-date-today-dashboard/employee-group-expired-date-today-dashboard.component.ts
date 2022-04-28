import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { Shell } from 'src/app/component/shell';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { EmployeeGroupExpiredDateComponent } from '../employee-group-expired-date-dashboard/employee-group-expired-date/employee-group-expired-date.component';
import { EmployeeService } from '../employees/services/employee.service';
import { EmployeeGroupExpiredDateTodayComponent } from './employee-group-expired-date-today/employee-group-expired-date-today.component';

@Component({
  selector: 'app-employee-group-expired-date-today-dashboard',
  templateUrl: './employee-group-expired-date-today-dashboard.component.html',
  styleUrls: ['./employee-group-expired-date-today-dashboard.component.scss']
})

export class EmployeeGroupExpiredDateTodayDashboardComponent extends BaseListComponent implements OnInit {
  get Service(): EmployeeService { return Shell.Injector.get(EmployeeService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);  
  }


  ngOnInit() {
    this.getGroupsDropDown();
  }
  tableData = {
    name: 'employees.EmployeeGroupExpiredDateTodayDashboardComponent',
    componentName: 'EmployeeGroupExpiredDateTodayDashboardComponent'
  };
  public columns: ColumnsInterface[] = [
    {
      field: 'employeeNumber',
      header: 'employees.employeeNumber',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'firstName',
      header: 'employees.employeeNameFirst',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'lastName',
      header: 'employees.employeeNameSecond',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'otherName',
      header: 'employees.employeeNameOther',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'groupDescription',
      header: 'employees.groupDescription',
      dropdownFilterName: 'groupId',
      filterMode: 'dropdown',
      selector: true,
      print: true,
      sort: false, 

    },
    
    {
      field: 'expireDate',
      header: 'employees.expireDate',
      filterMode: 'date',
      selector: true,
      print: true,
      sort: true
    },
    
    
    
  ];
  public actions: ActionsInterface[] = [
    {
      isEdit: true
    },
    {
        isView: false
      
    }
    ,
    {
      isDelete: false
    }
  ];

  getGroupsDropDown(){
      this.Service.getGroupsDropDown().subscribe(data => {   
          this.columns[4].filterDropdown = data;
    });
  }
  
  addEvent(model: any) {
    super.add(EmployeeGroupExpiredDateTodayComponent, model);
  }
}
