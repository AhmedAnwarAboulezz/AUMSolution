import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Shell } from 'src/app/component/shell';
import { LocalizationService } from 'src/app/services/localization/localization.service';
import { OptionControls } from 'src/app/shared/components/reports-filter/models/option-controls';

@Component({
  selector: 'app-device-connect-employees-report',
  templateUrl: './device-connect-employees-report.component.html',
  styleUrls: ['./device-connect-employees-report.component.scss']
})
export class DeviceConnectEmployeesReportComponent implements OnInit {

  option = new OptionControls();

  constructor( ) { }

  ngOnInit() {
    this.option.devicetype = this.option.branch =this.option.group= this.option.groupby = false;
    this.option.serialNumber=true;
   

  }

}
