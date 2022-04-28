import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Shell } from 'src/app/component/shell';
import { AlertService } from 'src/app/services/AlertService';
import { AccessGroupService } from '../../Services/access-group.services';

@Component({
  selector: 'app-update-access-group-right',
  templateUrl: './update-access-group-right.component.html',
  styleUrls: ['./update-access-group-right.component.scss']
})
export class UpdateAccessGroupRightComponent implements OnInit {
  accessGroupId: any;
  daysCodes: string[];
  groupRightsId: number;
  accessGroupName = "";
  showLoader= true;
  get Alert(): AlertService { return Shell.Injector.get(AlertService); }
  get Service(): AccessGroupService { return Shell.Injector.get(AccessGroupService); }

  constructor(public route: ActivatedRoute,public router: Router) {
    this.accessGroupId = this.route.snapshot.params.id;
    if(this.accessGroupId != null){
      this.getAccessGroupRights();
    }
  }

  ngOnInit() {
    //alert(this.accessGroupId);
  }

  getAccessGroupRights(){
    this.showLoader = true;
    this.Service.getAccessGroupRights(this.accessGroupId).subscribe(res => {
      console.log("Access Group Data is", res);      
        this.accessGroupName = res.accessGroupName;
        if(res !== undefined && res.accessGroupRights !== null && res.accessGroupRights.length == 8){
          let rrr = res.accessGroupRights.map(a=>a.timePattern);
          this.daysCodes = rrr;
        }
        this.showLoader = false;

    }, error => {
      this.showLoader = false;
    });
  }
  saveTable(event){
    console.log(event);
    this.Service.updateAccessRights(event).subscribe(res => {
      this.Alert.showSuccess("Added Successfully");
      this.router.navigate(['/main/accessGroups']);
    }, error =>{
      this.Alert.showError(error.error);
    })
  }
}
