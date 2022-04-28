import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { Shell } from 'src/app/component/shell';
import { BranchesService } from '../Services/branches.service';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})
export class BranchComponent extends BaseEditComponent implements OnInit {
  model: any = {};
  id: string;
  url = 'Branches/GetAllPaged';
  baseUrl = 'Branches/';

  get Service(): BranchesService { return Shell.Injector.get(BranchesService); }
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<BranchComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
    if (this.data) {
      this.model = this.data;
      this.isNew = false;
    }
    this.form = fb.group({
      id: [this.model.id],
      branchNameAr: [this.model.branchNameAr, [Validators.required, this.removeSpaces]],
      branchNameEn: [this.model.branchNameEn, [Validators.required, this.removeSpaces]],
      templateCode: [this.model.templateCode, [Validators.required, this.removeSpaces]],
    });
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  ngOnInit() {
  }

}
