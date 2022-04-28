import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { Shell } from 'src/app/component/shell';
import { GroupEmployee } from 'src/app/models/group';
import { EmployeeService } from '../../employees/services/employee.service';

@Component({
  selector: 'app-employee-group-expired-date-today',
  templateUrl: './employee-group-expired-date-today.component.html',
  styleUrls: ['./employee-group-expired-date-today.component.scss']
})


export class EmployeeGroupExpiredDateTodayComponent extends BaseEditComponent {
  model: any = {};
  id: string;
  groups:any[];
  url = 'EmployeeGroups/GetAllPagedEmployeeGroupExpireTodayDashBoard';
  baseUrl = 'EmployeeGroups/';
  resetedForm:any;

  get Service(): EmployeeService { return Shell.Injector.get(EmployeeService); }
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<EmployeeGroupExpiredDateTodayComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
    this.getGroupsDropDown();
    if (this.data) {
      this.model = this.data;
      this.isNew = false;
    }
    this.form = this.resetForm(this.model);
   
  }

  resetForm(model:any): any{
    
    let resetForm = this.fb.group({   
      id: [model.id],
      employeeId: [model.employeeId],
      groupId: [model.groupId],
      expireDate: [model.expireDate],
    });
    return resetForm;
  }


  onClose(event){
  this.close(event, this.resetForm(new GroupEmployee()));
  }
  onAddSave(event) {
    this.httpService.postQueryParamsReq('EmployeeGroups/UpdateEmployeeGroup', event)
      .subscribe(responce => {
        --this.TableCore.pageOptions.offset;
        this.TableCore.reRenderTable(this.url);    
        this.Alert.showSuccess(this.localize.translate.instant('Message.UpdateSuccess'));
        this.dialogRef.close();
      }, error => {
        this.Alert.showSuccess(this.localize.translate.instant('Message.error'));

      });
  }

  getGroupsDropDown(){
    this.Service.getGroupsDropDown().subscribe(data => {   
        this.groups = data;
  });
}
}