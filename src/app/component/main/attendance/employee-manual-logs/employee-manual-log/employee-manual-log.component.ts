import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { Shell } from 'src/app/component/shell';
import { LogTypeEnum } from 'src/app/enums/LogType';
import { EmployeeLog } from 'src/app/models/EmployeeLog';
import { DatePickerHeader } from 'src/app/shared/components/datepicker-header.component';
import { ManualLogsService } from '../Services/manualLogs.service';

@Component({
  selector: 'app-employee-manual-log',
  templateUrl: './employee-manual-log.component.html',
  styleUrls: ['./employee-manual-log.component.scss']
})

export class EmployeeManualLogComponent extends BaseEditComponent implements OnInit {
  logTypeEnum = LogTypeEnum;
  logTypes: any;
  model: EmployeeLog = {};
  id: string;
  header = DatePickerHeader;
  url = 'EmployeeManualLogs/GetAllPaged';
  baseUrl = 'EmployeeManualLogs/';
  get Service(): ManualLogsService { return Shell.Injector.get(ManualLogsService); }
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<EmployeeManualLogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
    this.getLookups();
    if (this.data) {
      this.model = this.data;
      this.isNew = false;
      this.isDisable = true;
    }
    else{
      this.model.employeeId = 0;
    }
    this.form = fb.group({
      id: [this.model.id],
      employeeId: [this.model.employeeId, Validators.required],
      logDate: [this.model.logDate, Validators.required],
      logTime: [this.model.logTime, Validators.required],
      logTypeId: [this.model.logTypeId, Validators.required],
    });
  }

  getLookups() {
    this.Service.getAllLogtypes().subscribe(data => {
        this.logTypes = data;
      });
  }
  onEmployeeCancel() {
    this.form.controls['employeeId'].setValue(null);
  }
}


