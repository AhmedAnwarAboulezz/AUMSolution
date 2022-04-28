import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@microsoft/signalr';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { Shell } from 'src/app/component/shell';
import { AdministrativeLevel } from 'src/app/models/administrativeLevel';
import { HttpService } from 'src/app/services/http/http.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { TreeComponent } from 'src/app/shared/components/tree/components/tree/tree.component';
import { AdmistrativeLevelsService } from '../Services/admistrative-levels.service';

@Component({
  selector: 'app-admistrative-level',
  templateUrl: './admistrative-level.component.html',
  styleUrls: ['./admistrative-level.component.scss']
})
export class AdmistrativeLevelComponent extends BaseEditComponent implements OnInit {
  baseUrl = 'AdministrativeLevels/';
  @ViewChild(TreeComponent, null) tree: TreeComponent;
  model: AdministrativeLevel = {};
  id: string;
  url = 'AdministrativeLevels/GetAllPaged';
  get Service(): HttpService { return Shell.Injector.get(HttpService); }

 // get Service(): AdmistrativeLevelsService { return Shell.Injector.get(AdmistrativeLevelsService); }
  constructor(
    public fb: FormBuilder,
    public storageService: StorageService,
    public dialogRef: MatDialogRef<AdmistrativeLevelComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);

    if (this.data) {
      this.model = this.data;
      this.isNew = false;
    }
    this.form = fb.group({

      id: [this.model.id],
      admLevelEn: [this.model.admLevelEn, [Validators.required,this.removeSpaces]],
      admLevelAr: [this.model.admLevelAr,this.removeSpaces],
      admEmail: [this.model.admEmail, Validators.email],
      parentId: [this.model.parentId],
      isParent: [this.model.isParent]
    });
    if (!this.model.isParent) {
      this.form.controls.isParent.setValue(false);
    }
  }

  ngOnInit() {
  }

  closeConfirm(event) {
    
    if (!event.form.isParent) { event.form.isParent = false; }
    if (event.form.parentId == 0) { event.form.parentId = null; }

    if (this.isNew) {
      this.submitNew(event.form, event.buttonType);
    } else {
      this.submitUpdate(event.form, event.buttonType);
    }
    if (event.buttonType === 'Save') {
      this.isNew = true;
    }
  }

  submitNew(model: any, buttonType?: any, resetForm?: any): void {
    this.Service.post('AdministrativeLevels/Add', model).subscribe((result: any) => {
      // if (result != null) {
      //   this.Alert.showError(this.localize.translate.instant('Message.AddError'));
      //   return false;
      // }
      --this.TableCore.pageOptions.offset;
      this.TableCore.reRenderTable(this.url);
      this.Alert.showSuccess(this.localize.translate.instant('Message.AddSuccess'));
      this.onNoClick(buttonType, resetForm);
      this.storageService.removeStorgeByKey("TheTree");
      this.tree.loadData([], true);
    }, error => {
//this.Alert.showError(this.localize.translate.instant('Message.AddError'));
    });
  }

  submitUpdate(model: any, buttonType?: any, resetForm?: any): void {
    this.Service.put('AdministrativeLevels/Update', model).subscribe((result: any) => {

      // if (result != null) {
      //   this.Alert.showError(this.localize.translate.instant('Message.UpdateError'));
      //   return false;
      // }
      --this.TableCore.pageOptions.offset;
      this.TableCore.reRenderTable(this.url);
      this.Alert.showSuccess(this.localize.translate.instant('Message.UpdateSuccess'));
      this.onNoClick(buttonType, resetForm);
      this.storageService.removeStorgeByKey("TheTree");
      this.tree.loadData([], true);
    }, error => {
   //   this.Alert.showError(this.localize.translate.instant('Message.AddError'));
    });
  }

}
