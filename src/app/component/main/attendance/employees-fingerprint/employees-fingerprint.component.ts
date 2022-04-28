import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { from, Observable } from 'rxjs';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { BaseEditWithListComponent } from 'src/app/component/base/components/BaseEditWithListComponent';
import { Shell } from 'src/app/component/shell';
import { LoadOptions } from 'src/app/core/table-details/models/LoadOptions';
import { TableDetailsComponent } from 'src/app/core/table-details/table-details.component';
import { AlertService } from 'src/app/services/AlertService';
import { LocalizationService } from 'src/app/services/localization/localization.service';
import { EmployeesFingerprintService } from './services/employees-fingerprint.service';

@Component({
  selector: 'app-employees-fingerprint',
  templateUrl: './employees-fingerprint.component.html',
  styleUrls: ['./employees-fingerprint.component.scss']
})
export class EmployeesFingerprintComponent  implements OnInit {
  fingerPrintSecurityLevels: any;
  groups: any;
  form: FormGroup;
  model:any={employeeId:0,groupId:[0],fingerPrintSecurityLevelId:0};
  lookupsFilter: any;
  displayedColumns = {};
  componentName = 'EmployeesFingerprint';
  checkedList:any[];
  showLoader: boolean;
  get Service(): EmployeesFingerprintService { return Shell.Injector.get(EmployeesFingerprintService); }
  get localize(): LocalizationService { return Shell.Injector.get(LocalizationService); }
  @ViewChild(TableDetailsComponent, null) dataTable: TableDetailsComponent;
  get Alert(): AlertService { return Shell.Injector.get(AlertService); }

  mainLoader(x: LoadOptions): Observable<any> {
    
    let queryRequest = { offset: x.offset, limit: x.limit, sortDirection: x.sortDirection, sortField: x.sortField };
    const result = this.resultOfEmployee(queryRequest);
    return from(result);
  }
   loadTableData()
  {
    this.dataTable.dataService = (d: any) => this.mainLoader(d);
    this.dataTable.reload.emit();
  }
  onFillSearch() {
    
    this.loadTableData();
  }
  constructor(  
      public fb: FormBuilder
    ) { 


      if (this.localize.lang == 'en') {
        this.displayedColumns = {
          employeeNumber: 'Employee Number',
          firstName: 'Employee Name',
          lastName: 'last Name',
          otherName: 'other Name',
          smartCardNumber: 'smart CardNumber',
          fingerPrintSecurityLevelName :'finger Print Security LevelName'
        };
      } else {
        this.displayedColumns = {
          employeeNumber: 'رقم الموظف',
          firstName: 'اسم الموظف الاول',
          lastName: 'اسم الموظف الثاني',
          otherName: 'اسم الموظف الآخر',
          smartCardNumber: 'رقم الكارت',
          fingerPrintSecurityLevelName :'امن البصمه'
        };
      }
    
      
      this.form = this.fb.group({
        employeeId: [this.model.employeeId],        
        groupId: [this.model.groupId],
        fingerPrintSecurityLevelId:[this.model.fingerPrintSecurityLevelId]
      });
    }

  ngOnInit() {
    this.getLookups();
  }
  ngAfterViewInit(){
    this.loadTableData();
  }
getLookups(){
  this.Service.getLookups().subscribe(data => {
    
    this.fingerPrintSecurityLevels= data[0];
    this.groups=data[1];
    this.lookupsFilter=data;
    this.form.controls['fingerPrintSecurityLevelId'].setValue(data[0][0].id)
   // this.model.fingerPrintSecurityLevelId=data[0][0].id;
  });
}
onEmployeeCancel() {
  this.form.controls['employeeId'].setValue(0);
}
async resultOfEmployee(queryRequest:any)
{
  var filter={
    employeeId: this.form.controls['employeeId'].value,        
    groupId:[] ,
  }
  var groupIds= this.form.controls['groupId'].value
  if (! groupIds.some(e => e == 0) )
  filter.groupId = groupIds.filter(e => e != 0)
 
  if (filter.employeeId != 0)
  filter.groupId=[];

   this.showLoader = true;
   const responce : any = await this.Service.getEmployees(filter,queryRequest).toPromise();
    this.checkedList = [];
    this.showLoader = false;    
   return responce;
}
toggleAllSelection(selected, formControlName, index: number) {

  if (selected) {
    this.form.controls[formControlName]
      .patchValue([...this.lookupsFilter[index].map(item => item.id), 0]);
  } else {
    this.form.controls[formControlName].patchValue([]);
  }
}
toggleUnSelectAll( formControlName,index) {

  let selectedItems = this.form.controls[formControlName].value.filter(e => e != 0);
  if (selectedItems.length == this.lookupsFilter[index].length )
  {
    selectedItems.push(0);
  }
  this.form.controls[formControlName].patchValue(selectedItems); 
}
openDropDown(formControlName,index){
  
  var listids= this.form.get(formControlName).value ;
   if (listids.some(e => e == 0) )  
     this.toggleAllSelection(true,formControlName,index)
   
 }
 closeDropDown(formControlName){
   var listids= this.form.get(formControlName).value ;
   if ( listids.some(e => e == 0) )  
     this.form.controls[formControlName].patchValue([0]); 
 }
 onCheckboxChange(event) {
  this.checkedList = event;
}
onSave(){
  var model ={
    fingerPrintSecurityLevelId: this.form.controls['fingerPrintSecurityLevelId'].value ,
    employeesId:this.checkedList
  }
  this.Service.updateFingerPrint(model)
      .subscribe(responce => {    
        this.Alert.showSuccess(this.localize.translate.instant('Message.UpdateSuccess'));
        this.form.controls['employeeId'].setValue('0');
        this.form.controls['groupId'].setValue([0]); 
        this.checkedList=[]
        this.loadTableData();
      }, error => {
        this.Alert.showError(this.localize.translate.instant('Message.UpdateError'));

      });
}
}
