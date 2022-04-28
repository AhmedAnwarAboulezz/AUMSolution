import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { Shell } from 'src/app/component/shell';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeDetailService } from './Services/employee-detail.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent extends BaseListComponent implements OnInit {
  get Service(): EmployeeDetailService { return Shell.Injector.get(EmployeeDetailService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);  
  }
  ngOnInit() {
    this.getLookups();
  }
  tableData = {
    name: 'employees.detailstitle',
    componentName: 'EmployeeDetailsComponent'
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
      field: 'employeeNameAr',
      header: 'employees.employeeNameAr',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'employeeNameEn',
      header: 'employees.employeeNameEn',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'civilId',
      header: 'employees.civilId',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'genderName',
      header: 'employees.gender',
      dropdownFilterName: 'genderIds',
      filterMode: 'dropdown',
      selector: true,
      print: true,
      sort: true,
      sortName:'genderName'

    },
    {
      field: 'religionName',
      header: 'employees.religionName',
      dropdownFilterName: 'religionIds',
      filterMode: 'dropdown',
      selector: true,
      print: true,
      sort: true,
      sortName:'religionName'

    },

    {
      field: 'email',
      header: 'employees.email',
      filterMode: 'text',
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
      isDelete: true
    }
  ];

  getLookups(){
      this.Service.getGenders().subscribe(data => {     
      this.columns[4].filterDropdown = data;
    });
    this.Service.getReligions().subscribe(data => {     
      this.columns[5].filterDropdown = data;
    });
  }
  
  addEvent(model: any) {
    super.add(EmployeeDetailComponent, model, '1300px');
  }
}
