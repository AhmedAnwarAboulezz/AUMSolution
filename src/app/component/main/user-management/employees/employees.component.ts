import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { Shell } from 'src/app/component/shell';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { EmployeeGroupDetailsComponent } from '../employee-groups/employee-group-details/employee-group-details.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeService } from './services/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent extends BaseListComponent implements OnInit {
  get Service(): EmployeeService { return Shell.Injector.get(EmployeeService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);  
  }


  ngOnInit() {
    this.getLookups();
  }
  tableData = {
    name: 'employees.title',
    componentName: 'EmployeesComponent'
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
      field: 'adminLevelName',
      header: 'employees.adminLevel',
      dropdownFilterName: 'adminLevelId',
      filterMode: 'dropdown',
      selector: true,
      print: true,
      sort: true,
      sortName:'adminLevelName'

    },
    {
      field: 'fingerPrintSecurityLevelName',
      header: 'employees.fingerPrintSecurityLevel',
      dropdownFilterName: 'fingerPrintSecurityLevelId',
      filterMode: 'dropdown',
      selector: true,
      print: true,
      sort: true,
      sortName:'fingerPrintSecurityLevelName'

    },

    {
      field: 'isUsePassword',
      header: 'employees.isUsePassword',
      filterMode: 'check',
      
      selector: true ,
      print: true,
      sort: true     
    },
    {
      field: 'isUseSmartCard',
      header: 'employees.isUseSmartCard',
      filterMode: 'check',
      
      selector: true ,
      print: true,
      sort: true     
    }
    ,
    {
      field: 'isUseFingerPrint',
      header: 'employees.isUseFingerPrint',
      filterMode: 'check',
      
      selector: true ,
      print: true,
      sort: true     
    } ,
    {
      field: 'isFingerPrintAutoMatch',
      header: 'employees.isFingerPrintAutoMatch',
      filterMode: 'check',
      
      selector: true ,
      print: true,
      sort: true     
    } ,
    {
      field: 'isUseFace',
      header: 'employees.isUseFace',
      filterMode: 'check',
      
      selector: true ,
      print: true,
      sort: true     
    },
    {
      field: 'isFaceAutoMatch',
      header: 'employees.isFaceAutoMatch',
      filterMode: 'check',
      
      selector: true ,
      print: true,
      sort: true     
    },
    {
      field: 'isActiveEmployee',
      header: 'employees.isActiveEmployee',
      filterMode: 'check',
      
      selector: true ,
      print: true,
      sort: true     
    }
  ];
  public actions: ActionsInterface[] = [
    {
      isEdit: true
    },
    {
      
        name: 'employees.assignemployeegroup',
        icon: 'person_pin',
        isView: true
      
    }
    ,
    {
      isDelete: true
    }
  ];

  getLookups(){
      this.Service.getLookups().subscribe(data => {
        
      this.columns[4].filterDropdown = data[0];
      this.columns[5].filterDropdown = data[1];

    });
  }
  
  addEvent(model: any) {
    super.add(EmployeeComponent, model);
  }
  viewDetail(model: any) {
    super.openViewDetail(EmployeeGroupDetailsComponent,model);
   }
}
