import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { Shell } from 'src/app/component/shell';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { RoleComponent } from './role/role.component';
import { RolesService } from './Services/roles.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})

export class RolesComponent extends BaseListComponent implements OnInit {

  get Service(): RolesService { return Shell.Injector.get(RolesService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);
  }

  tableData = {
    name: 'roles.title',
    componentName: 'RolesComponent'
  };
  public columns: ColumnsInterface[] = [
    
    {
      field: 'roleNameEn',
      header: 'roles.roleNameEn',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'roleNameAr',
      header: 'roles.roleNameAr',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'isActive',
      header: 'roles.active',
      filterMode: 'check',
      selector: true,
      print: true,
      sort: true
    }
  ];
  public actions: ActionsInterface[] = [
    {
      isEdit: true
    }
    ,
    {
      isDelete: true
    }
  ];
  ngOnInit(): void {

  }

  addEvent(model: any) {
    super.add(RoleComponent, model);
  }

}
