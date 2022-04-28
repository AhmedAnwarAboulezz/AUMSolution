import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { Shell } from 'src/app/component/shell';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { DeviceGroupComponent } from './device-group/device-group.component';
import { GroupComponent } from './group/group.component';
import { GroupsService } from './Services/groups.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent extends BaseListComponent implements OnInit {

  get Service(): GroupsService { return Shell.Injector.get(GroupsService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog, public router: Router) {
    super(dialog);
  }

  tableData = {
    name: 'groups.title',
    componentName: 'GroupsComponent'
  };
  public columns: ColumnsInterface[] = [
    
    {
      field: 'groupDescription',
      header: 'groups.groupDescription',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
    },
    {
      field: 'deviceCount',
      header: 'groups.deviceCount',
      filterMode: 'number',
      selector: true,
      print: true,
      sort: true,
    }
  ];
  public actions: ActionsInterface[] = [
    {
      isEdit: true
    },
    {
      name: 'groups.assignDevices',
      icon: 'add_to_queue',
      isView: true
    },
    {
      isDelete: true
    }
  ];
  ngOnInit(): void {

  }

  viewDetail(model: any) {
    super.add(DeviceGroupComponent, model);
   }

   addEvent(model: any) {
    super.add(GroupComponent, model);    
  }
  
}
