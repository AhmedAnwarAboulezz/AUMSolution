import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { Shell } from 'src/app/component/shell';
import { AlertService } from 'src/app/services/AlertService';
import { LocalizationService } from 'src/app/services/localization/localization.service';
import { TriggersService } from '../Services/triggers.service';

@Component({
  selector: 'app-trigger-time',
  templateUrl: './trigger-time.component.html',
  styleUrls: ['./trigger-time.component.scss']
})
export class TriggerTimeComponent  implements OnInit {
 
  model: any;
  triggerId: any;
  daysCodes: string[];
  groupRightsId: number;
  accessGroupName = "";
  showLoader= true;
  result:any[];
  baseUrl = 'Triggers/';
  triggerName="";
  triggerTypeName="";
  get Alert(): AlertService { return Shell.Injector.get(AlertService); }
  get Service(): TriggersService { return Shell.Injector.get(TriggersService); }
  constructor(
    public route: ActivatedRoute,public router: Router,    
      private titleService: Title,   
     public localizationService: LocalizationService,

    ) {
    
    this.triggerId = this.route.snapshot.params.id;
    if(this.triggerId != null){
      this.getAccessGroupRights();
    }
  

  }


  getAccessGroupRights(){
    this.showLoader = true;
    this.Service.getTriggerRights(this.triggerId).subscribe(res => {
     // console.log("Access Group Data is", res);      
        this.triggerName = res.triggerName;
        this.triggerTypeName = res.triggerType;
        if(res !== undefined && res.triggerRights !== null && res.triggerRights.length == 8){
          let rrr = res.triggerRights.map(a=>a.timePattern);
          this.daysCodes = rrr;
        }
        this.showLoader = false;

    }, error => {
      this.showLoader = false;
    });
  }
  ngOnInit() {
    var  data = this.localizationService.translate.instant("triggers.triggertime") + ' - AUM6';

    this.titleService.setTitle(data);
  }
  saveTable(event){
    console.log(event);
    this.result=[];
    event.forEach(obj => {
      let triggerRight ={
      triggerId : obj.accessGroupId,
      weekDayId:obj.weekDayId,
      timePattern : obj.timePattern,
      }
      this.result.push(triggerRight);
    });
    this.Service.updateTriggerRights(this.result).subscribe(res => {
      this.Alert.showSuccess("Added Successfully");
      this.router.navigate(['/main/lookups/triggers']);
    }, error =>{
      this.Alert.showError(error.error);
    })
  }
}
