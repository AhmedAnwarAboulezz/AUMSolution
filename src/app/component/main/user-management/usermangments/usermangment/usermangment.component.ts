
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import {  FormBuilder, Validators } from '@angular/forms';
import { UsermangmentsService } from '../services/usermangments.service';
import { Shell } from 'src/app/component/shell';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { UserMangment } from 'src/app/models/UserMangment';
import { TreeComponent } from 'src/app/shared/components/tree/components/tree/tree.component';
import { DatePickerHeader } from 'src/app/shared/components/datepicker-header.component';
import { Branch } from 'src/app/models/Branch';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-usermangment',
  templateUrl: './usermangment.component.html',
  styleUrls: ['./usermangment.component.scss']
})
export class UsermangmentComponent extends BaseEditComponent implements OnInit {
  @ViewChild(TreeComponent, null) tree: TreeComponent;
  header = DatePickerHeader;
  model: UserMangment = {};
  id: string;
  url = 'Usermangments/GetAllPaged';
  baseUrl = 'Usermangments/';
  isendOfContractDate = true;
  branchs: Branch[];
  roles: Role[];
  passdisable = false;
  hide = true;
  get Service(): UsermangmentsService { return Shell.Injector.get(UsermangmentsService); }
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<UsermangmentComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);

    if (this.data) {
      
      this.model = this.data;
      this.isNew = false;
      this.isDisable = true;
    }
    this.getLookups();


    ///change to userBranch
    if (this.model.userBranches !== undefined &&
      this.model.userBranches.some(e => typeof e === 'object')) {
      this.model.userBranches = this.model.userBranches.map(({ branchId }: any) => (branchId));
    }

    this.form = this.resetForm(this.model);

  }


  getLookups() {
    this.Service.getLookup().subscribe((data: any) => {
      
      this.branchs = data[0];
      this.roles = data[1];
    });
  }

  onCloseConfirmation(event: any) {

debugger;
    this.form.value.userBranches =
      this.form.value.userBranches.map((e: any) => ({ branchId: e, userId: this.form.value.id })).filter(q => q.branchId != 0);
    event.form = this.form.value;
    this.close(event, this.resetForm(new UserMangment()));
    if (event.buttonType === 'Save') {
      this.isNew = true;
      this.tree.loadData([], true);
    }
  }




  resetForm(model: UserMangment): any {
    let resetForm = this.fb.group({
      id: [model.id],
      userName: [model.userName, Validators.required],
      email: [model.email],
      password: [model.password],
      userBranches: [model.userBranches, Validators.required],
      roleId: [model.roleId, Validators.required],
      expireDate: [model.expireDate],
      isActive: [(model.isActive !== null && model.isActive !== undefined) ? model.isActive : true],
    });


    if (model.id) {
      resetForm.controls['password'].setValue(null);
      resetForm.controls['password'].clearValidators();
      resetForm.controls['password'].updateValueAndValidity();
    }
    else {
      resetForm.controls['password'].setValidators([Validators.required]);
      resetForm.controls['password'].updateValueAndValidity();
    }
    return resetForm;
  }


  toggleAllSelection(selected, isGroup) {

    if (selected && isGroup) {
      this.form.controls.userBranches
        .patchValue([...this.branchs.map(item => item.id), 0]);
    }

    else {
      if (isGroup) { this.form.controls.userBranches.patchValue([]); }
    }
  }
  toggleUnSelectAll(selected, isGroup) {
    if (isGroup) {
      var selectedItems = this.form.controls.userBranches.value.filter(e => e != 0);
      this.form.controls.userBranches.patchValue(selectedItems);
    }

  }
 
}
