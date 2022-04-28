import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { Shell } from 'src/app/component/shell';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { GroupEmployeesDetailsComponent } from './group-employees-details/group-employees-details.component';
import { GroupEmployeesService } from './services/group-employees.service';

@Component({
  selector: 'app-group-employees',
  templateUrl: './group-employees.component.html',
  styleUrls: ['./group-employees.component.scss']
})
export class GroupEmployeesComponent extends BaseListComponent implements OnInit {
  get Service(): GroupEmployeesService { return Shell.Injector.get(GroupEmployeesService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);
  }
  tableData = {
    name: 'groupEmployees.groupEmployees',
    componentName: 'GroupEmployeesService'
  };
  ngOnInit() {
  }
  // addEvent(model: any) {
  //   super.add(GroupEmployeesDetailsComponent, model);
  // }
  viewDetail(model: any) {
    super.openViewDetail(GroupEmployeesDetailsComponent, model);
  }

  public columns: ColumnsInterface[] = [
    {
      field: 'groupName',
      header: 'groupEmployees.groupName',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'employeesCount',
      header: 'groupEmployees.employeesCount',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },

  ];
  public actions: ActionsInterface[] = [
    {
      isEdit: false
    },
    {
      name: 'groupEmployees.groupDetail',
      icon: 'person_pin',
      isView: true
    }
    ,
    {
      isDelete: false
    }
  ];
  
}
