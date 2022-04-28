import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { Shell } from 'src/app/component/shell';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { EmployeeMessageDetaialsComponent } from './employee-message-detaials/employee-message-detaials.component';
import { EmployeeMessageComponent } from './employee-message/employee-message.component';
import { EmployeeMessageService } from './services/employee-message.service';

@Component({
  selector: 'app-employee-messages',
  templateUrl: './employee-messages.component.html',
  styleUrls: ['./employee-messages.component.scss']
})


export class EmployeeMessagesComponent extends BaseListComponent implements OnInit {

  get Service(): EmployeeMessageService { return Shell.Injector.get(EmployeeMessageService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);  
  }

  ngOnInit() {
  }


  tableData = {
    name: 'employeemessage.employeemessage',
    componentName: 'EmployeeMessagesComponent'
  };
  public columns: ColumnsInterface[] = [
    
    {
      field: 'message',
      header: 'employeemessage.message',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'fromDateShow',
      header: 'employeemessage.fromDateShow',
      filterMode: 'date',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'fromTimeShow',
      header: 'employeemessage.fromTimeShow',
      filterMode: 'time',
      selector: true,
      print: true,
      sort: true
    },     
    {
      field: 'period',
      header: 'employeemessage.period',
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
      name: 'employeemessage.assignemployeemessage',
      isView: true
    }
    ,
    {
      isDelete: true
    }
  ];

  viewDetail(model: any) {
    super.openViewDetail(EmployeeMessageDetaialsComponent, model);
   }
  addEvent(model: any) {
     super.add(EmployeeMessageComponent, model);  
  }
}
