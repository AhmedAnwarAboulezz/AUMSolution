import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { Shell } from 'src/app/component/shell';
import { ActionsInterface } from 'src/app/shared/components/data-table/models/actions.interface';
import { ColumnsInterface } from 'src/app/shared/components/data-table/models/columns.interface';
import { AdmistrativeLevelComponent } from './admistrative-level/admistrative-level.component';
import { AdmistrativeLevelsService } from './Services/admistrative-levels.service';

@Component({
  selector: 'app-admistrative-levels',
  templateUrl: './admistrative-levels.component.html',
  styleUrls: ['./admistrative-levels.component.scss']
})
export class AdmistrativeLevelsComponent extends BaseListComponent implements OnInit {

  get Service(): AdmistrativeLevelsService { return Shell.Injector.get(AdmistrativeLevelsService); }
  constructor(public route: ActivatedRoute, public dialog: MatDialog) {
    super(dialog);  
  }
  ngOnInit() {
  }
  tableData = {
    name: 'administrativeLevel.title',
    componentName: 'AdmistrativeLevelsComponent'
  };
 
  public columns: ColumnsInterface[] = [
    
    {
      field: 'admLevelEn',
      header: 'administrativeLevel.nameFl',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      addedText: this.localize.flLang
      
    },
    {
      field: 'admLevelAr',
      header: 'administrativeLevel.nameSl',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      addedText: this.localize.slLang,
      editable: !this.localize.multiLang
    },
    {
      field: 'parentName',
      header: 'administrativeLevel.parent',
      filterMode: 'text',
      selector: true,
      print: true,
      sort: true,
      addedText: this.localize.flLang

    },
    {
      field: 'admEmail',
      header: 'administrativeLevel.email',
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
      isDelete: true
    }
  ];
 
  addEvent(model: any) {
    super.add(AdmistrativeLevelComponent, model , '1200px');
  }
}
