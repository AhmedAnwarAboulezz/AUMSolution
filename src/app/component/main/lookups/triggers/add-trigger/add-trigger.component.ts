import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { Shell } from 'src/app/component/shell';
import { Trigger } from 'src/app/models/trigger';
import { HttpService } from 'src/app/services/http/http.service';
import { TriggersService } from '../Services/triggers.service';

@Component({
  selector: 'app-add-trigger',
  templateUrl: './add-trigger.component.html',
  styleUrls: ['./add-trigger.component.scss']
})
export class AddTriggerComponent extends BaseEditComponent implements OnInit {
  baseUrl = 'Triggers/';
  get Service(): TriggersService { return Shell.Injector.get(TriggersService); }
  resetForm(model):any{
    let form = this.fb.group({
      id: [model.id],
      triggerTypeId: [model.triggerTypeId, [Validators.required]],
      triggerName: [model.triggerName, [Validators.required, this.removeSpaces]],
      isEnabled: [model.isEnabled != null ? this.model.isEnabled : false],
      // triggerDevice:[model.triggerDevice, [Validators.required]]
      });
       return form;
    }

  model: Trigger = {};
  id: string;
  url = 'Triggers/GetAllPaged';
  triggersTypes: any[];
  lookupsFilter:any[];
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<AddTriggerComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
    this.model.isEnabled=true;

    if (this.data) {
      this.model = this.data;
      this.isNew = false;
    }
    this.form = this.resetForm( this.model);
  }
  ngOnInit() {
    this.getLookUps();
  }
getLookUps(){
  this.Service.getLookups().subscribe(data => {
  this.triggersTypes=data[0];
  this.lookupsFilter=data;

  });

}

closeConfirmation(result)
{ 
let newmodel =new  Trigger() ;
this.close(result, this.resetForm(newmodel));
}
}
