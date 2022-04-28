import { Component, OnInit } from '@angular/core';
import { time } from 'console';
import { OptionControls } from 'src/app/shared/components/reports-filter/models/option-controls';

@Component({
  selector: 'app-employee-transaction-report',
  templateUrl: './employee-transaction-report.component.html',
  styleUrls: ['./employee-transaction-report.component.scss']
})
export class EmployeeTransactionReportComponent implements OnInit {
  option = new OptionControls();
  constructor() { }

  ngOnInit() {
     this.option.employee=
    //this.option.group
    this.option.logtype = 
    this.option.serialNumber= this.option.branch =this.option.date=true;
  }

}
