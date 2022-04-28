import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { Shell } from 'src/app/component/shell';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { AddTriggerComponent } from './add-trigger/add-trigger.component';
import { TriggersService } from './Services/triggers.service';
import { TriggerDevicesComponent } from './trigger-devices/trigger-devices.component';
import { TriggerTimeComponent } from './trigger-time/trigger-time.component';

@Component({
  selector: 'app-triggers',
  templateUrl: './triggers.component.html',
  styleUrls: ['./triggers.component.scss']
})
export class TriggersComponent extends BaseListComponent implements OnInit {

  get Service(): TriggersService { return Shell.Injector.get(TriggersService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog, public router: Router) {
    super(dialog);  
  }

  ngOnInit() {
    this.getLookups();  

  }


  tableData = {
    name: 'triggers.title',
    componentName: 'TriggersComponent'
  };
  public columns: ColumnsInterface[] = [
    {
      field: 'triggerTypeName',
      header: 'triggers.trigger',
      dropdownFilterName: 'triggerTypeIds',
      filterMode: 'dropdown',
      selector: true,
      print: true,
      sort: true,
      sortName:'triggerTypeName'
    },
    {
      field: 'triggerName',
      header: 'triggers.triggerName',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },    
    {
      field: 'isEnabled',
      header: 'triggers.active',
      filterMode: 'check',
      
      selector: true ,
      print: true,
      sort: true     
    },
    {
      field: 'deviceCount',
      header: 'accessGroup.deviceCount',
      filterMode: 'number',
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
        name: 'triggers.triggertime',
        icon: 'access_time',
        isView: true  
    },
    {
      name: 'triggers.triggerDevices',
      icon: 'add_to_queue',
      isAssign: true
    },
    {
      isDelete: true
    }
  ];

  addEvent(model: any) {
    super.add(AddTriggerComponent, model);
  }
  assignDetail(model: any) {
    super.add(TriggerDevicesComponent, model);
  }

  viewDetail(model: any) {
    let url = (model !== null && model !== undefined) ? ('/main/lookups/triggerTimes/'+model.id) : ('/main/home');
    this.router.navigate([url]);
  }
  getLookups(){
    this.Service.getTriggerTypes().subscribe(data => {
    this.columns[0].filterDropdown = data;

  });
}
}

  
