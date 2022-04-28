import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { Shell } from 'src/app/component/shell';
import { HttpService } from 'src/app/services/http/http.service';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { DepartmentComponent } from './department/department.component';
import { DepartmentService } from './Services/depatments.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent extends BaseListComponent implements OnInit {

  get Service(): DepartmentService { return Shell.Injector.get(DepartmentService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);  
  }


  ngOnInit() {
  }
  tableData = {
    name: 'department.department',
    componentName: 'DepartmentsComponent'
  };
  public columns: ColumnsInterface[] = [
    {
      field: 'departmentName',
      header: 'department.departmentName',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'departmentDescription',
      header: 'department.departmentDescription',
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

  addEvent(model: any) {
    super.add(DepartmentComponent, model);
  }
}
