import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { Shell } from 'src/app/component/shell';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { DevicesService } from '../devices/Services/devices.service';

@Component({
  selector: 'app-devices-un-register',
  templateUrl: './devices-un-register.component.html',
  styleUrls: ['./devices-un-register.component.scss']
})


export class DevicesUnRegisterComponent extends BaseListComponent implements OnInit {

  get Service(): DevicesService { return Shell.Injector.get(DevicesService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);  
  }

  ngOnInit() {
    //this.getLookups();  
    this.getLocationservice();
    this.GetAllDeviceTypes();

  }


  tableData = {
    name: 'device.DevicesUnRegister',
    componentName: 'DevicesUnRegisterComponent'
  };
  public columns: ColumnsInterface[] = [
    
    {
      field: 'serialNumber',
      header: 'device.DeviceCode',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'deviceDescription',
      header: 'device.description',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },     
    {
      field: 'locationName',
      dropdownFilterName: 'locationId',
      header: 'device.location',
      filterMode: 'dropdown',
      filterDropdown: [],
      selector: true,
      print:true,
      sort: true

    },
    {
      field: 'deviceTypeName',
      dropdownFilterName: 'deviceTypeId',
      header: 'device.deviceType',
      filterMode: 'dropdown',
      filterDropdown: [],
      selector: true,
      print:true,
      sort: true

    },
    {
      field: 'ipAddress',
      header: 'device.DeviceAddress',
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
      isView: false
    }
    ,
    {
      isDelete: false
    }
  ];

 
 
  getLocationservice(){
    this.Service.getLocation().subscribe((data: any) => {
      this.columns[2].filterDropdown = data;
    });    
   }
 GetAllDeviceTypes(){
  this.Service.GetAllDeviceType().subscribe((data: any) => {
    this.columns[3].filterDropdown = data;
  });
}
}