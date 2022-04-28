import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { Shell } from 'src/app/component/shell';
import { DevicesService } from '../Services/devices.service';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent extends BaseEditComponent implements OnInit {
  model: any = {};
  locations: any = {};
  deviceType: any = {};
  id: string;
  url = 'Devices/GetAllPaged';
  baseUrl = 'Devices/';
  get Service(): DevicesService { return Shell.Injector.get(DevicesService); }
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<DeviceComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
    this.getLocations();
    this.GetAllDeviceTypes();
    if (this.data) {
      this.model = this.data;
      this.isNew = false;
    }
    this.form = fb.group({
      id: [this.model.id],
      ipAddress: [this.model.ipAddress],
      serialNumber: [this.model.serialNumber, [Validators.required, this.removeSpaces]],
      deviceDescription:[this.model.deviceDescription],
      locationId: [this.model.locationId],
      deviceTypeId:[this.model.deviceTypeId]

    });
  }
  ngOnInit() {
  }
  getLocations(){
    this.Service.getLocation().subscribe((data: any) => {
     this.locations = data;
    });
  }
  GetAllDeviceTypes(){
    this.Service.GetAllDeviceType().subscribe((data: any) => {
     this.deviceType = data;
    });
  }

}
