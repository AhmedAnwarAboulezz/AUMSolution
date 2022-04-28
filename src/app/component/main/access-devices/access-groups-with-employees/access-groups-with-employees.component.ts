import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { Shell } from 'src/app/component/shell';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { AccessGroupService } from '../Services/access-group.services';
import { EmployeeAccessGroupComponent } from './employee-access-group/employee-access-group.component';


@Component({
  selector: 'app-access-groups-with-employees',
  templateUrl: './access-groups-with-employees.component.html',
  styleUrls: ['./access-groups-with-employees.component.scss']
})
export class AccessGroupsWithEmployeesComponent extends BaseListComponent implements OnInit {

  get Service(): AccessGroupService { return Shell.Injector.get(AccessGroupService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);
  }

  tableData = {
    name: 'accessGroup.employeeaccessgroup',
    componentName: 'AccessGroupsWithEmployeesComponent'
  };
  public columns: ColumnsInterface[] = [
    {
      field: 'groupId',
      header: 'accessGroup.groupCode',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'accessGroupName',
      header: 'accessGroup.groupName',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
    },
    
    {
      field: 'employeeCount',
      header: 'accessGroup.employeeCount',
      filterMode: 'number',
      selector: true,
      print: true,
      sort: true
    }
  ];
  public actions: ActionsInterface[] = [
    {
      isEdit: false
    },
    {
      name: 'accessGroup.employeeaccessgroup',
      icon: 'group_add',
      isView: true
    }
    ,
    {
      isDelete: false
    }
  ];
  ngOnInit(): void {

  }
   viewDetail(model: any) {
    super.openViewDetail(EmployeeAccessGroupComponent,model);
   }
}
