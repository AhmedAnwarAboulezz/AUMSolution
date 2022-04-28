import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { Shell } from 'src/app/component/shell';
import { DepartmentService } from '../Services/depatments.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent extends BaseEditComponent implements OnInit {
  model: any = {};
  id: string;
  url = 'Departments/GetAllPaged';
  baseUrl = 'Departments/';

  get Service(): DepartmentService { return Shell.Injector.get(DepartmentService); }
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<DepartmentComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
    if (this.data) {
      debugger;
      this.model = this.data;
      this.isNew = false;
    }
    this.form = fb.group({
      id: [this.model.id],
      departmentDescription: [this.model.departmentDescription, [Validators.required, this.removeSpaces]],
      departmentName: [this.model.departmentName, [Validators.required, this.removeSpaces]],
      departmentId:[this.model.departmentId,Validators.required]
    });
  }

  ngOnInit() {
  }

}
