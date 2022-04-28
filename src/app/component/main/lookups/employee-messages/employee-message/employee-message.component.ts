import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { Shell } from 'src/app/component/shell';
import { employeeMessage } from 'src/app/models/addEmployeeMessage';
import { DatePickerHeader } from 'src/app/shared/components/datepicker-header.component';
import { EmployeeMessageDetaialsComponent } from '../employee-message-detaials/employee-message-detaials.component';
import { EmployeeMessageService } from '../services/employee-message.service';

@Component({
  selector: 'app-employee-message',
  templateUrl: './employee-message.component.html',
  styleUrls: ['./employee-message.component.scss']
})


export class EmployeeMessageComponent extends BaseEditComponent implements OnInit {
  header = DatePickerHeader;
  model: employeeMessage = {};
  id: string;
  saveBtn: boolean = false;
  url = 'EmployeeMessages/GetAllPaged';
  baseUrl = 'EmployeeMessages/';
  get Service(): EmployeeMessageService { return Shell.Injector.get(EmployeeMessageService); }
  constructor(
    public fb: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EmployeeMessageComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);

    if (this.data) {
      this.model = this.data;
      this.isNew = false;
    }
    this.form = this.resetForm(this.model);
    this.dialogRef.afterClosed().subscribe(result => {
      if (this.saveBtn == true && this.isNew == true) 
      {
        this.openDetails();
      }
    });
  }

  onAddSave(event) {
    this.saveBtn = event.buttonType === 'SaveClose' ? true : false;
    super.close(event, this.resetForm(new employeeMessage()));
  }

  resetForm(model: employeeMessage): any {
    let resetForm = this.fb.group({
      id: [model.id],
      message: [model.message, Validators.required],
      period: [model.period, Validators.required],
      fromDateShow: [model.fromDateShow],
      fromTimeShow: [model.fromTimeShow, Validators.required],
    });
     
    return resetForm;
  }


  openDetails(){
    let maindata = {
      message: this.form.value.message, 
      fromDateShow: this.form.value.fromDateShow, 
    };

    this.Service.getMainData(maindata).subscribe(res => {
     this.openViewDetail(EmployeeMessageDetaialsComponent, res, '1300px');
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