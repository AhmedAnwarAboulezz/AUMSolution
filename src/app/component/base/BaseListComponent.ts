import { OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Shell } from '../shell';
import { AlertService } from 'src/app/services/AlertService';
import { HttpService } from 'src/app/services/http/http.service';
import { LocalizationService } from 'src/app/services/localization/localization.service';
import { MatDialog } from '@angular/material/dialog';

export abstract class BaseListComponent implements OnInit {

  get localize(): LocalizationService { return Shell.Injector.get(LocalizationService); }
  get Alert(): AlertService { return Shell.Injector.get(AlertService); }
  get Route(): Router { return Shell.Injector.get(Router); }
  get MatDialog(): MatDialog { return Shell.Injector.get(MatDialog); }
  @Output() addClick: EventEmitter<any> = new EventEmitter<any>();
  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  add(dialog: any, data: any, width = '800px',height?:any) {
    this.openDialog(dialog, data, width,height);
  }
  protected openDialog(dialog: any, data: any, width: any, height?:any): void {
    this.dialog.open(dialog, {
      height,
      width,
      data,
      panelClass: 'my-dialog',
      direction: (this.localize.lang === 'ar' ? 'rtl' : 'ltr'),
      disableClose:true,
      
    });
  }

  openViewDetail(dialog: any, data: any, width = '1100px', height?:any) {
    this.openDialog(dialog, data, width,height);
  }


}
