import { Component, OnInit } from '@angular/core';
import { OptionControls } from 'src/app/shared/components/reports-filter/models/option-controls';

@Component({
  selector: 'app-device-connect-group-report',
  templateUrl: './device-connect-group-report.component.html',
  styleUrls: ['./device-connect-group-report.component.scss']
})
export class DeviceConnectGroupReportComponent implements OnInit {
  option = new OptionControls();
  constructor() { }

  ngOnInit() {
    this.option.serialNumber=true;
  }

}
