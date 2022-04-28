import { Component, OnInit } from '@angular/core';
import { OptionControls } from 'src/app/shared/components/reports-filter/models/option-controls';

@Component({
  selector: 'app-employee-attendance-log-report',
  templateUrl: './employee-attendance-log-report.component.html',
  styleUrls: ['./employee-attendance-log-report.component.scss']
})

export class EmployeeAttendanceLogReportComponent implements OnInit {
  option = new OptionControls();
  constructor() { }

  ngOnInit() {
    this.option.employee=this.option.logtype = 
    this.option.serialNumber=this.option.date=true;
  }

}