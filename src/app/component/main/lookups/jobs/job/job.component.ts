import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { Shell } from 'src/app/component/shell';
import { JobsService } from '../Services/jobs.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent extends BaseEditComponent implements OnInit {
  model: any = {};
  id: string;
  url = 'Jobs/GetAllPaged';
  baseUrl = 'Jobs/';

  get Service(): JobsService { return Shell.Injector.get(JobsService); }
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<JobComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
    if (this.data) {
      this.model = this.data;
      this.isNew = false;
    }
    this.form = fb.group({
      id: [this.model.id],
      jobCode: [this.model.jobCode, [Validators.required, this.removeSpaces]],
      jobNameAr: [this.model.jobNameAr, [Validators.required, this.removeSpaces]],
      jobNameEn: [this.model.jobNameEn, [Validators.required, this.removeSpaces]],


    });
  }


  ngOnInit() {
  }

}
