import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { Shell } from 'src/app/component/shell';
import { LocationsService } from '../Services/locations.service';
import { Time } from "@angular/common";
import moment from 'moment';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})


export class LocationComponent extends BaseEditComponent implements OnInit {
  model: any = {};
  id: string;
  url = 'Locations/GetAllPaged';
  baseUrl = 'Locations/';
  timeZones: any = {};
  aPBType :any = {};
  dayTime = moment(new Date(),"HH:mm").format("HH:mm");
  get Service(): LocationsService { return Shell.Injector.get(LocationsService); }
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<LocationComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
    if (this.data) {
      this.model = this.data;
      this.isNew = false;      
    }
    console.log("this mode ", this.model);
    
    this.getZones();
    this.getAllAPBTypes();
    this.form = fb.group({
      id: [this.model.id],
      serviceTimeZoneId: [this.model.serviceTimeZoneId, Validators.required],
      locationName: [this.model.locationName, [Validators.required, this.removeSpaces]],
      sntpServer:[this.model.sntpServer],
      sntpEnable: [this.model.sntpEnable != null ? this.model.sntpEnable : false],
      apbTypeId : [this.model.apbTypeId, Validators.required],
      lunchIN : [ this.model.lunchIN == null ? this.dayTime : moment(new Date(this.model.lunchIN),"HH:mm").format("HH:mm"), Validators.required],
      lunchOUT : [this.model.lunchOUT == null ? this.dayTime : moment(new Date(this.model.lunchOUT),"HH:mm").format("HH:mm"), Validators.required],
      resetEnable : [this.model.resetEnable != null ? this.model.resetEnable : false],
      resetTime : [this.model.resetTime == null ? null : moment(new Date(this.model.resetTime),"HH:mm").format("HH:mm")]
    });
  }

  ngOnInit() {
  }

  getZones(){
    this.Service.getZones().subscribe((data: any) => {
     this.timeZones = data;
    });
  }
  getAllAPBTypes(){
    this.Service.getAllAPBType().subscribe((data: any) => {
     this.aPBType = data;
    });
  }
  onresetEnableChange(event: any) {
    if (event) {
      //this.form.controls['resetTime'].setValue(this.form.controls['resetTime']);
    } else {
      this.form.controls['resetTime'].setValue('');
    }
  }
}
