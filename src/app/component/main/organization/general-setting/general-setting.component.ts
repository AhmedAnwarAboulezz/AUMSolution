import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/component/BaseComponent';
import { Shell } from 'src/app/component/shell';
import { ChooseAutoSyncEnum } from 'src/app/enums/ChooseAutoSyncEnum';
import { Group } from 'src/app/models/group';
import { Organization } from 'src/app/models/Organization';
import { organizationSetting } from 'src/app/models/organizationSetting';
import { StorageService } from 'src/app/services/storage/storage.service';
import { OrganizationsService } from '../services/organizations.service';

@Component({
  selector: 'app-general-setting',
  templateUrl: './general-setting.component.html',
  styleUrls: ['./general-setting.component.scss']
})


export class GeneralSettingComponent extends BaseComponent implements OnInit {

  get Service(): OrganizationsService { return Shell.Injector.get(OrganizationsService); }
  get Storage(): StorageService { return Shell.Injector.get(StorageService); }

  formsetting: FormGroup;
  model: organizationSetting = {};
  chooseAutoSyncs: any[];

  organiztionID: any;
  chooseAutoSyncEnum = ChooseAutoSyncEnum;
  organizationData:Organization;
  groups:any[];

  constructor(
    private fb: FormBuilder,

  ) {
    super();
    if (this.localize.lang == 'en') {
      this.chooseAutoSyncs = [{ id: ChooseAutoSyncEnum.None, name: 'None' },
      { id: ChooseAutoSyncEnum.SpecificGroups, name: 'Specific Groups' },
      { id: ChooseAutoSyncEnum.AllGroups, name: 'All Groups' }
    ];
    } else {
      this.chooseAutoSyncs = [{ id: ChooseAutoSyncEnum.None, name: 'لا شئ' },
      { id: ChooseAutoSyncEnum.SpecificGroups, name: 'مجموعات محدده' },
      { id: ChooseAutoSyncEnum.AllGroups, name: 'كل المجموعات' }
    ];
    }

    this.organizationData = JSON.parse(this.Storage.get('Organizations_data')) as Organization;
    this.organiztionID = this.organizationData.id;
    this.initForm(this.model);

     this.getGroups();
     this.getData();


  }

  ngOnInit() {
  }
  initForm(model : organizationSetting) {
    //let organization = JSON.parse(this.Storage.get('Organizations_data')) as Organization;  
    this.formsetting = this.fb.group({
      id: [model.id],
      chooseAutoSync: [model.chooseAutoSync, Validators.required],
      organizationSettingGroups:[model.organizationSettingGroups]

     
    });
    
  }

  
  getErrorMessage(error): string {
    let message = '';

    if (error.status === 400) {

      let errors: Array<any> = error.error.errors;

      if (errors instanceof Object) {
        Object.keys(errors).forEach((key) => {
          message += errors[key][0] + '\n';
        });
      } else if (typeof error.error === 'string') {
        // the error is validation error BadRequest('error message')
        message = error.error;
      } else {
        message = 'Bad Request';
      }

    } else if (error.status === 500) {
      message = 'Unexpected error happened.';
    }

    return message;
  }
  edit2() {
    if(this.formsetting.value.chooseAutoSync === this.chooseAutoSyncEnum.SpecificGroups){
      this.formsetting.value.organizationSettingGroups = this.formsetting.value.organizationSettingGroups.map((groupId: any) => ({
        groupId: groupId, organizationSettingId:this.formsetting.value.id
      }));
    }
    else{
      this.formsetting.value.organizationSettingGroups = null;
    }
   
    
    this.Service.UpdateSettingOrganization(this.formsetting.value)
       .subscribe(() => {
        this.alertService.showSuccess(this.localize.translate.instant('Message.UpdateSuccess'));
      },error =>{
        this.alertService.showError(this.getErrorMessage(error));

      });   
  }

  getData() {
    this.Service.GetOrganizationSetting(this.organiztionID).subscribe(res => {
      if (res.organizationSettingGroups !== undefined &&
        res.organizationSettingGroups.some(e => typeof e === 'object')) {
          res.organizationSettingGroups = res.organizationSettingGroups.map(({ groupId }: any) => (groupId));
      }
      
      this.initForm(res);
    });
  }
  

  getGroups() {
    this.Service.getGroups().subscribe((data: any) => {
      this.groups = data;
    });
  }

  toggleAllSelection(selected, isGroup) {

    if (selected && isGroup) {
      this.formsetting.controls.organizationSettingGroups
        .patchValue([...this.groups.map(item => item.id), 0]);
    } else if (selected && !isGroup) {
      this.formsetting.controls.organizationSettingGroups
        .patchValue([...this.groups.map(item => item.id), 0]);

    } else {
      if (isGroup) { this.formsetting.controls.organizationSettingGroups.patchValue([]); } else { this.formsetting.controls.organizationSettingGroups.patchValue([]); }
    }
  }
  toggleUnSelectAll(selected, isGroup)
  {
    if (isGroup) { 
      var selectedItems= this.formsetting.controls.organizationSettingGroups.value.filter(e => e != 0);
      this.formsetting.controls.organizationSettingGroups.patchValue(selectedItems);
    } 
    
  }
}