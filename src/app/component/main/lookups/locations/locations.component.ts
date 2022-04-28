import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { Shell } from 'src/app/component/shell';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { LocationComponent } from './location/location.component';
import { LocationsService } from './Services/locations.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})


export class LocationsComponent extends BaseListComponent implements OnInit {

  get Service(): LocationsService { return Shell.Injector.get(LocationsService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);  
  }

  ngOnInit() {
    //this.getLookups();  
    this.getTimeZones();

  }


  tableData = {
    name: 'locations.locations',
    componentName: 'LocationsComponent'
  };
  public columns: ColumnsInterface[] = [

    {
      field: 'locationName',
      header: 'locations.locationName',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },  
    {
      field: 'timeZoneName',
      dropdownFilterName: 'serviceTimeZoneIds',
      header: 'locations.timeZoneName',
      filterMode: 'dropdown',
      filterDropdown: [],
      selector: true,
      print: true,
      sort: true,
      sortName:'serviceTimeZoneId'
    },
    {
      field: 'sntpEnable',
      header: 'locations.sntpEnable',
      filterMode: 'check',
      
      selector: true ,
      print: true,
      sort: true     
    },
    {
      field: 'sntpServer',
      header: 'locations.sntpServer',
      filterMode: 'text',
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
      isView: false
    }
    ,
    {
      isDelete: true
    }
  ];
  getTimeZones(){
    this.Service.getZones().subscribe((data: any) => {
      this.columns[1].filterDropdown = data;
    });    
   }
  addEvent(model: any) {
    super.add(LocationComponent, model);
  }
}
