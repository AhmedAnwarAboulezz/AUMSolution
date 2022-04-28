import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { Shell } from 'src/app/component/shell';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { AccessDoorDevicesComponent } from './access-door-devices/access-door-devices.component';
import { AccessDoorComponent } from './access-door/access-door.component';
import { AccessDoorService } from './Services/access-door.services';

@Component({
  selector: 'app-access-doors',
  templateUrl: './access-doors.component.html',
  styleUrls: ['./access-doors.component.scss']
})

export class AccessDoorsComponent extends BaseListComponent implements OnInit {
  get Service(): AccessDoorService { return Shell.Injector.get(AccessDoorService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog, public router: Router) {
    super(dialog);
  }

  tableData = {
    name: 'accessDoor.accessDoor',
    componentName: 'AccessDoorsComponent'
  };
  public columns: ColumnsInterface[] = [
    {
      field: 'accessDoorDescription',
      header: 'accessDoor.accessDoorDescription',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    }    
    // {
    //   field: 'accessDoorName',
    //   header: 'accessDoor.DoorName',
    //   filterMode: 'text',
    //   selector: true,
    //   print: true,
    //   sort: true,
    // }
  ];
  public actions: ActionsInterface[] = [
    {
      isEdit: true
    },
    {
      name: 'accessDoor.accessDoorsRight',
      icon: 'access_time',
      isView: true
    },
    {
      name: 'accessDoor.accessDoorDevices',
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
    let url = (model !== null && model !== undefined) ? ('/main/lookups/accessDoorRight/'+model.id) : ('/main/home');
    this.router.navigate([url]);
   }

   addEvent(model: any) {
    super.add(AccessDoorComponent, model);    
  }

  assignDetail(model: any){
    super.add(AccessDoorDevicesComponent, model); 
  }
  
}
