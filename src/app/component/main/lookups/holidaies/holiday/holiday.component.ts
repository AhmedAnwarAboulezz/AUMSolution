import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { Shell } from 'src/app/component/shell';
import { Holiday } from 'src/app/models/Holiday';
import { DatePickerHeader } from 'src/app/shared/components/datepicker-header.component';
import { HolidayService } from '../Services/holiday.service';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.scss']
})

export class HolidayComponent extends BaseEditComponent implements OnInit {
  header = DatePickerHeader;

  model: Holiday = {};
  id: string;
  url = 'Holidaies/GetAllPaged';
  baseUrl = 'Holidaies/';
  get Service(): HolidayService { return Shell.Injector.get(HolidayService); }
  form: FormGroup;
  

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<HolidayComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    super(dialogRef);
    if (this.data) {
      this.model = this.data;
      this.isNew = false;
    }
    this.form = fb.group({
      id: [this.model.id],
      holidayName: [this.model.holidayName, Validators.required],
      startDate: [this.model.startDate, Validators.required],
      holidayId: [this.model.holidayId, Validators.required]
     // endDate: [this.model.endDate, Validators.required]
    });
  }

  ngOnInit() {

  }

 

}