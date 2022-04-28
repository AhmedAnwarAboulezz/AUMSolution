import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseComponent } from 'src/app/component/BaseComponent';
import { Shell } from 'src/app/component/shell';
import { Organization } from 'src/app/models/Organization';
import { OrganizationLicence } from 'src/app/models/organizationLicence';
import { StorageService } from 'src/app/services/storage/storage.service';
import { OrganizationsService } from '../services/organizations.service';

@Component({
  selector: 'app-organization-licences',
  templateUrl: './organization-licences.component.html',
  styleUrls: ['./organization-licences.component.scss']
})

export class OrganizationLicencesComponent extends BaseComponent implements OnInit {
  get Service(): OrganizationsService { return Shell.Injector.get(OrganizationsService); }
  get Storage(): StorageService { return Shell.Injector.get(StorageService); }

  organiztionID: any;
  licenceForm: FormGroup;

  model: OrganizationLicence = {};
  constructor(
    private fb: FormBuilder,
   
  ) {
    
    super();
    let organization = JSON.parse(this.Storage.get('Organizations_data')) as Organization;
    this.organiztionID = organization.id; 
    
    this.getData();
      
  }  

  ngOnInit() {
   
  }
  
   

  getData() {
    this.Service.getOrganizatiolicenseScreen(this.organiztionID).subscribe(res =>{
      this.model = res;
      
    } );   
      
  }
  
 

}

