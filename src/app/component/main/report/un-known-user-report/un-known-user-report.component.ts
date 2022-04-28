import { Component, OnInit } from '@angular/core';
import { OptionControls } from 'src/app/shared/components/reports-filter/models/option-controls';

@Component({
  selector: 'app-un-known-user-report',
  templateUrl: './un-known-user-report.component.html',
  styleUrls: ['./un-known-user-report.component.scss']
})

export class UnKnownUserReportComponent implements OnInit {
  option = new OptionControls();
  constructor() { }

  ngOnInit() {
    this.option.employee=this.option.logtype = 
    this.option.serialNumber=this.option.date=true;
  }

}
