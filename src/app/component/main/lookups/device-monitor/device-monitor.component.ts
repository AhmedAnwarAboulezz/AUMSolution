import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { Shell } from 'src/app/component/shell';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { DevicesService } from '../devices/Services/devices.service';

@Component({
  selector: 'app-device-monitor',
  templateUrl: './device-monitor.component.html',
  styleUrls: ['./device-monitor.component.scss']
})

export class DeviceMonitorComponent extends BaseListComponent implements OnInit {

  get Service(): DevicesService { return Shell.Injector.get(DevicesService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);  
  }

  ngOnInit() {
   
  }


  tableData = {
    name: 'devicemonitor.DeviceMonitor',
    componentName: 'DeviceMonitorComponent'
  };
  public columns: ColumnsInterface[] = [
    
    {
      field: 'terminalSn',
      header: 'devicemonitor.terminalSn',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'terminalIp',
      header: 'devicemonitor.terminalIp',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },     
    
    {
      field: 'serialNumber',
      header: 'devicemonitor.serialNumber',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'registerStatus',
      header: 'devicemonitor.registerStatus',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'modelNumber',
      header: 'devicemonitor.modelNumber',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'firmwareVersion',
      header: 'devicemonitor.FirmwareVersion',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'timeZone',
      header: 'devicemonitor.timeZone',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'deviceMode',
      header: 'devicemonitor.deviceMode',
      filterMode: 'text',
      //filterMode: 'status',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'currentStatusValue',
      header: 'devicemonitor.currentStatus',
      filterMode: 'status',
      selector: true,
      print: true,
      //sort: false,
      sort: true,
      sortName:'modifiedDate'

    },
    {
      field: 'maximumUsers',
      header: 'devicemonitor.maximumUsers',
      filterMode: 'number',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'registerUserWithAcualUser',
      header: 'devicemonitor.RegisterUserWithAcualUser',
      filterMode: 'string',
      selector: true,
      print: true,
      sort: false
    },
    {
      field: 'automatchUsers',
      header: 'devicemonitor.automatchUsers',
      filterMode: 'number',
      selector: true,
      print: true,
      sort: true
    },
    
    
  ];
  public actions: ActionsInterface[] = [
    {
      isEdit: false
    }
    ,
    {
      isDelete: false
    }
  ];
}