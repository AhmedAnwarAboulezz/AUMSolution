import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { Shell } from 'src/app/component/shell';
import { AccessDoorService } from '../Services/access-door.services';

@Component({
  selector: 'app-access-door',
  templateUrl: './access-door.component.html',
  styleUrls: ['./access-door.component.scss']
})
export class AccessDoorComponent extends BaseEditComponent implements OnInit {
  model: any = {};
  id: string;
  url = 'AccessDoors/GetAllPaged';
  baseUrl = 'AccessDoors/';

  get Service(): AccessDoorService { return Shell.Injector.get(AccessDoorService); }
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<AccessDoorComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
    if (this.data) {
      this.model = this.data;
      this.isNew = false;
    }
    this.form = fb.group({
      id: [this.model.id],
      accessDoorDescription: [this.model.accessDoorDescription, [Validators.required, this.removeSpaces]],
      //accessDoorName: [this.model.accessDoorName, [Validators.required, this.removeSpaces]]
    });
  }

  ngOnInit() {
  }

}

