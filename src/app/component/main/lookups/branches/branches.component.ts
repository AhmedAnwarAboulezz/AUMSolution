import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { Shell } from 'src/app/component/shell';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { BranchComponent } from './branch/branch.component';
import { BranchesService } from './Services/branches.service';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss']
})
export class BranchesComponent extends BaseListComponent implements OnInit {
  get Service(): BranchesService { return Shell.Injector.get(BranchesService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);  
  }


  ngOnInit() {
  }
  tableData = {
    name: 'branches.branches',
    componentName: 'BranchesComponent'
  };
  public columns: ColumnsInterface[] = [
    {
      field: 'branchNameEn',
      header: 'branches.nameFl',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'branchNameAr',
      header: 'branches.nameSl',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true
    },
    {
      field: 'templateCode',
      header: 'branches.templateCode',
      filterMode: 'text',
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
      isView: false
    }
    ,
    {
      isDelete: true
    }
  ];

  addEvent(model: any) {
    super.add(BranchComponent, model);
  }
}
