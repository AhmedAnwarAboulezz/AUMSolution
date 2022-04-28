import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { Shell } from 'src/app/component/shell';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { JobComponent } from './job/job.component';
import { JobsService } from './Services/jobs.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent  extends BaseListComponent implements OnInit {

  get Service(): JobsService { return Shell.Injector.get(JobsService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);  
  }
  ngOnInit() {
  }
  tableData = {
    name: 'jobs.jobs',
    componentName: 'JobsComponent'
  };
  public columns: ColumnsInterface[] = [
    {
      field: 'jobCode',
      header: 'jobs.code',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'jobNameAr',
      header: 'jobs.jobNameAr',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'jobNameEn',
      header: 'jobs.jobNameEn',
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

  addEvent(model: any) {
    super.add(JobComponent, model);
  }
}
