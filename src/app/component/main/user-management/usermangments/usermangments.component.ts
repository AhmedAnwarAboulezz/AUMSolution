import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Shell } from 'src/app/component/shell';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { DialogService } from 'primeng/api';
import { UsermangmentComponent } from './usermangment/usermangment.component';
import { UsermangmentsService } from './services/usermangments.service';

@Component({
  selector: 'app-usermangments',
  templateUrl: './usermangments.component.html',
  styleUrls: ['./usermangments.component.scss'],
  providers: [DialogService]
})
export class UsermangmentsComponent extends BaseListComponent implements OnInit {
  get Service(): UsermangmentsService { return Shell.Injector.get(UsermangmentsService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);
  }

  tableData = {
    name: 'usermangments.title',
    componentName: 'UsermangmentsComponent'
  };
  public columns: ColumnsInterface[] = [
    
    {
      field: 'userName',
      printField: 'userName',
      header: 'usermangments.userName',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'email',
      printField: 'email',
      header: 'usermangments.email',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
  
    {
      field: 'isActive',
      header: 'usermangments.active',
      filterMode: 'check',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'expireDate',
      printField: 'expireDate',
      header: 'usermangments.expireDate',
      filterMode: 'date',
      selector: true,
      print: true,
      sort: true
    },
    
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
    super.add(UsermangmentComponent, model);
  }

}
