import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { Shell } from 'src/app/component/shell';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { AccessGroupService } from '../Services/access-group.services';
import { DeviceAccessGroupComponent } from './device-access-group/device-access-group.component';


@Component({
  selector: 'app-access-groups-with-devices',
  templateUrl: './access-groups-with-devices.component.html',
  styleUrls: ['./access-groups-with-devices.component.scss']
})
export class AccessGroupsWithDevicesComponent extends BaseListComponent implements OnInit {

  get Service(): AccessGroupService { return Shell.Injector.get(AccessGroupService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog, public router: Router) {
    super(dialog);
  }

  tableData = {
    name: 'accessGroup.deviceaccessgroup',
    componentName: 'AccessGroupsWithDevicesComponent'
  };
  public columns: ColumnsInterface[] = [
    // {
    //   field: 'accessGroupNumber',
    //   header: 'accessGroup.groupNumber',
    //   filterMode: 'text',
    //   selector: true,
    //   print: true,
    //   sort: true
    // },
    
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
      isEdit: false
    },
    {
      name: 'accessGroup.deviceaccessgroup',
      icon: 'add_to_queue',
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
    super.openViewDetail(DeviceAccessGroupComponent,model);
   }
}
