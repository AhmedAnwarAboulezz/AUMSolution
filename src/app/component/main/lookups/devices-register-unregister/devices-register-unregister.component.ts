import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalizationService } from 'src/app/services/localization/localization.service';

@Component({
  selector: 'app-devices-register-unregister',
  templateUrl: './devices-register-unregister.component.html',
  styleUrls: ['./devices-register-unregister.component.scss']
})


export class DevicesRegisterUnregisterComponent implements OnInit {
  emergencyAllowanceDescriptionTypes: any[];
  showDetails = false;
  constructor(public route: ActivatedRoute, public localize:LocalizationService) {
    this.emergencyAllowanceDescriptionTypes = [
      {
        id: "false", nameFl:"Registered Devices",nameSl:"الاجهزه المسجله"
      },
      {
        id: "true", nameFl:"UnRegistered Devices",nameSl:"الاجهزه غير المسجله"
      }
    ];
  }

  ngOnInit(): void {

  }
}