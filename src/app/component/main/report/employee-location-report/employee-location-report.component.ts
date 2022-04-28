import { Component, OnInit } from '@angular/core';
import { OptionControls } from 'src/app/shared/components/reports-filter/models/option-controls';

@Component({
  selector: 'app-employee-location-report',
  templateUrl: './employee-location-report.component.html',
  styleUrls: ['./employee-location-report.component.scss']
})
export class EmployeeLocationReportComponent implements OnInit {
  option = new OptionControls();

  constructor() { }

  ngOnInit() {
    this.option.serialNumber=this.option.employee=true;
  }

}
