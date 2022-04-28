import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { Shell } from 'src/app/component/shell';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { HolidayComponent } from './holiday/holiday.component';
import { HolidayService } from './Services/holiday.service';

@Component({
  selector: 'app-holidaies',
  templateUrl: './holidaies.component.html',
  styleUrls: ['./holidaies.component.scss']
})

export class HolidaiesComponent extends BaseListComponent implements OnInit {
  get Service(): HolidayService { return Shell.Injector.get(HolidayService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);
  }
  tableData = {
    name: 'holidayDates.holidayDates',
    componentName: 'HolidaiesComponent'
  };

  public columns: ColumnsInterface[] = [

    
    {
      field: 'holidayName',
      header: 'holidayDates.holidayName',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'startDate',
      printField: 'startDateStr',
      header: 'holidayDates.startDate',
      filterMode: 'date',
      customCell: 'date',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'holidayId',
      header: 'holidayDates.holidayCode',
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
      isView: false
    }
    ,
    {
      isDelete: true
    }
  ];
  ngOnInit(): void {
  }
  addEvent(model: any) {
    super.add(HolidayComponent, model);
  }


  
}