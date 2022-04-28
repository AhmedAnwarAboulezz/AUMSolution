import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { Shell } from 'src/app/component/shell';
import { Role } from 'src/app/models/role';
import { RolesService } from '../Services/roles.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})

export class RoleComponent extends BaseEditComponent {
  model: Role = {};
  id: string;
  url = 'Roles/GetAllPaged';
  baseUrl = 'Roles/';
  resetedForm:any;
  get Service(): RolesService { return Shell.Injector.get(RolesService); }
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<RoleComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
    if (this.data) {
      this.model = this.data;
      this.isNew = false;
    }
    this.form = this.resetForm(this.model);
   
  }

  resetForm(model:Role): any{
    debugger;
    let resetForm = this.fb.group({   
      id: [model.id],
      roleNameEn: [model.roleNameEn, Validators.required],
      roleNameAr: [model.roleNameAr],
      isActive: [(model.isActive !== null && model.isActive !== undefined )? model.isActive : true]
    });
    return resetForm;
  }


  onClose(event){
  this.close(event, this.resetForm(new Role()));
  }
}