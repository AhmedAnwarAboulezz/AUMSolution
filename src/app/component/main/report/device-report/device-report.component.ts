import { Component, OnInit } from '@angular/core';
import { OptionControls } from 'src/app/shared/components/reports-filter/models/option-controls';

@Component({
  selector: 'app-device-report',
  templateUrl: './device-report.component.html',
  styleUrls: ['./device-report.component.scss']
})
export class DeviceReportComponent implements OnInit {
  option = new OptionControls();

  constructor() { }

  ngOnInit() {
    this.option.devicetype = this.option.branch =this.option.group=this.option.serialNumber=true;
    this.option.groupby = false;

  }

}
