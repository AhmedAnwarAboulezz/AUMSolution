import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { Shell } from 'src/app/component/shell';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { DeviceAccessGroupComponent } from '../access-groups-with-devices/device-access-group/device-access-group.component';
import { AccessGroupService } from '../Services/access-group.services';
import { AccessGroupComponent } from './access-group/access-group.component';

@Component({
  selector: 'app-access-groups',
  templateUrl: './access-groups.component.html',
  styleUrls: ['./access-groups.component.scss']
})

export class AccessGroupsComponent extends BaseListComponent implements OnInit {

  get Service(): AccessGroupService { return Shell.Injector.get(AccessGroupService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog, public router: Router) {
    super(dialog);
  }

  tableData = {
    name: 'accessGroup.accessGroup',
    componentName: 'AccessGroupsComponent'
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
      field: 'deviceCount',
      header: 'accessGroup.deviceCount',
      filterMode: 'number',
      selector: true,
      print: true,
      sort: true
    }
  ];
  public actions: ActionsInterface[] = [
    {
      isEdit: true
    },
    {
      name: 'accessGroup.accessGroupsRight',
      icon: 'access_time',
      isView: true
    },
    {
      name: 'accessGroup.deviceaccessgroup',
      icon: 'add_to_queue',
      isAssign: true
    },
    {
      isDelete: true
    }
  ];
  ngOnInit(): void {

  }

  viewDetail(model: any) {
    let url = (model !== null && model !== undefined) ? ('/main/accessGroups/accessGroupRight/'+model.id) : ('/main/home');
    this.router.navigate([url]);
   }
   assignDetail(model: any) {
    super.add(DeviceAccessGroupComponent, model);
  }
   addEvent(model: any) {
    super.add(AccessGroupComponent, model);

    
  }
  
}
