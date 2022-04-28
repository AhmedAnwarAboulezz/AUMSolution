import { Component, OnInit } from '@angular/core';
import { OptionControls } from 'src/app/shared/components/reports-filter/models/option-controls';

@Component({
  selector: 'app-employee-connect-device-report',
  templateUrl: './employee-connect-device-report.component.html',
  styleUrls: ['./employee-connect-device-report.component.scss']
})
export class EmployeeConnectDeviceReportComponent implements OnInit {
  option = new OptionControls();
  constructor() { }

  ngOnInit() {
    this.option.serialNumber=true;
  }

}
