import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Shell } from 'src/app/component/shell';
import { AlertService } from 'src/app/services/AlertService';
import { AccessDoorService } from '../Services/access-door.services';

@Component({
  selector: 'app-access-door-right',
  templateUrl: './access-door-right.component.html',
  styleUrls: ['./access-door-right.component.scss']
})
export class AccessDoorRightComponent implements OnInit {
  accessDoorId: any;
  daysCodes: string[];
  accessDoorDescription = "";
  showLoader= true;
  get Alert(): AlertService { return Shell.Injector.get(AlertService); }
  get Service(): AccessDoorService { return Shell.Injector.get(AccessDoorService); }

  constructor(public route: ActivatedRoute,public router: Router) {
    this.accessDoorId = this.route.snapshot.params.id;
    if(this.accessDoorId != null){
      this.getAccessDoorRights();
    }
  }

  ngOnInit() {
    //alert(this.accessDoorId);
  }

  getAccessDoorRights(){
    this.showLoader = true;
    this.Service.getAccessDoorRights(this.accessDoorId).subscribe(res => {
      console.log("Access Door Data is", res);   
         
        this.accessDoorDescription = res.accessDoorDescription;
        if(res !== undefined && res.accessDoorRights !== null && res.accessDoorRight.length == 8){
          let rrr = res.accessDoorRight.map(a=>a.timePattern);
          this.daysCodes = rrr;
        }
        this.showLoader = false;

    }, error => {
      this.showLoader = false;
    });
  }
  saveTable(event){
    console.log(event);
    let result=[];
    event.forEach(obj => {
      let newObj ={
        accessDoorId : obj.accessGroupId,
        weekDayId:obj.weekDayId,
        timePattern : obj.timePattern,
      }
      result.push(newObj);
    });
    this.Service.updateAccessRights(result).subscribe(res => {
      this.Alert.showSuccess("Added Successfully");
      this.router.navigate(['/main/lookups/accessDoors']);
    }, error =>{
      this.Alert.showError(error.error);
    })
  }
}
