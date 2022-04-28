import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { Shell } from 'src/app/component/shell';
import { DeviceGroupComponent } from '../device-group/device-group.component';
import { GroupsService } from '../Services/groups.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent extends BaseEditComponent implements OnInit {
  model: any = {};
  id: string;
  url = 'Groups/GetAllPaged';
  baseUrl = 'Groups/';
  saveBtn: boolean = false;

  get Service(): GroupsService { return Shell.Injector.get(GroupsService); }
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<GroupComponent>,
    public dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
    if (this.data) {
      this.model = this.data;
      this.isNew = false;
    }
    this.form = fb.group({
      id: [this.model.id],
      groupDescription: [this.model.groupDescription, [Validators.required, this.removeSpaces]]
    });

    this.dialogRef.afterClosed().subscribe(result => {
      if (this.saveBtn == true && this.isNew == true) 
      {
        this.openDetails();
      }
    });

  }

  ngOnInit() {
  }
  onAddSave(event: any) {
   
      this.saveBtn = event.buttonType === 'SaveClose' ? true : false;
      this.close(event);

  }

  openDetails(){
    this.Service.getGroupBygroupDescription(this.form.value.groupDescription).subscribe(data => {
     this.openViewDetail(DeviceGroupComponent, data, '1300px');
   });
 }
 openViewDetail(dialog: any, data: any, width = '1100px') {
   this.openDialog(dialog, data, width);
 }
 protected openDialog(dialog: any, data: any, width: any, height?:any): void {
   this.dialog.open(dialog, {
     height,
     width,
     data,
     panelClass: 'my-dialog',
     direction: (this.localize.lang === 'ar' ? 'rtl' : 'ltr'),
     disableClose:true
   });
 }

}

