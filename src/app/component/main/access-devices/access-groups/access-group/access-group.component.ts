import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { Shell } from 'src/app/component/shell';
import { AccessGroupService } from '../../Services/access-group.services';

@Component({
  selector: 'app-access-group',
  templateUrl: './access-group.component.html',
  styleUrls: ['./access-group.component.scss']
})
export class AccessGroupComponent extends BaseEditComponent implements OnInit {
  model: any = {};
  id: string;
  url = 'AccessGroups/GetAllPaged';
  baseUrl = 'AccessGroups/';
  get Service(): AccessGroupService { return Shell.Injector.get(AccessGroupService); }
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<AccessGroupComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
    if (this.data) {
      this.model = this.data;
      this.isNew = false;
    }
    this.form = fb.group({
      id: [this.model.id],
      //accessGroupNumber: [this.model.accessGroupNumber, [Validators.required, this.removeSpaces]],
      accessGroupName: [this.model.accessGroupName, [Validators.required, this.removeSpaces]],
      groupId:[this.model.groupId,Validators.required]
    });
  }

  ngOnInit() {
  }

}

