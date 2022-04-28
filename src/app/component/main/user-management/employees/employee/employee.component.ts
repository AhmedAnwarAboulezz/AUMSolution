import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { Shell } from 'src/app/component/shell';
import { Employee, EmployeeDepartments } from 'src/app/models/employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent extends BaseEditComponent implements OnInit {
  model: Employee = {};
  id: string;
  url = 'Employees/GetAllPaged';
  baseUrl = 'Employees/';
  adminLevels: any[];
  fingerPrintSecurityLevels: any[];
  departments: any[];
  accessGroups: any[];
  hide = true;
  lookupsFilter: any[];
oldPassword :any;

  get Service(): EmployeeService { return Shell.Injector.get(EmployeeService); }
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<EmployeeComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
    this.model.isActiveEmployee=true;
    if (this.data) {
      this.model = this.data;
      this.isNew = false;
      this.oldPassword=this.data.password;
      this.model.password="";
    }
    
    if (this.model.employeeDepartments !== undefined &&
      this.model.employeeDepartments.some(e => typeof e === 'object')) {
      this.model.employeeDepartments = this.model.employeeDepartments.map(({ departmentId }: any) => (departmentId));
   
    }
    if (this.model.employeeAccessGroup !== undefined && this.model.employeeAccessGroup !== null && 
      this.model.employeeAccessGroup.some(e => typeof e === 'object')) {
      this.model.employeeAccessGroup = this.model.employeeAccessGroup.map(({ accessGroupId }: any) => (accessGroupId));
    }


   this.form= this.resetForm(this.model);
  }
  getLookups(){
    this.Service.getLookups().subscribe(data => {
    this.adminLevels = data[0];
    this.fingerPrintSecurityLevels= data[1];
    this.departments=data[2];
    this.accessGroups=data[3];
    this.lookupsFilter=data;
    
    let isAllDepartment= this.departments.map(item=>item.id).some(r=> this.model.employeeDepartments.includes(r))
    if(isAllDepartment &&this.departments.length == this.model.employeeDepartments.length )
    {
          this.form.controls['employeeDepartments'].value.push( 0 );
    this.closeDropDown('employeeDepartments')
    }
    let isAllaccessGroups= this.accessGroups.map(item=>item.id).some(r=> this.model.employeeAccessGroup.includes(r))
    if(isAllaccessGroups &&this.accessGroups.length == this.model.employeeAccessGroup.length )
    {
          this.form.controls['employeeAccessGroup'].value.push( 0 );
           this.closeDropDown('employeeAccessGroup')
    }
  });

}
  ngOnInit() {
    this.getLookups();  
     
  }
  closeConfirmation(result, resetForm?: any) {
    
     var employeeDepartments= this.form.get('employeeDepartments').value ;
     if (employeeDepartments.some(e => e == 0) )
       employeeDepartments= this.departments.map(item=>item.id);
      result.form.employeeDepartments = employeeDepartments.filter(e => e != 0).map((e: any) => ({ departmentId: e, employeeId: result.form.id }));
    
      var employeeAccessGroup= this.form.get('employeeAccessGroup').value ;
      if (employeeAccessGroup.some(e => e == 0) )
      employeeAccessGroup= this.accessGroups.map(item=>item.id);
      result.form.employeeAccessGroup = employeeAccessGroup.filter(e => e != 0).map((e: any) => ({ accessGroupId: e, employeeId: result.form.id }));

      if(result.form.password == "" && result.form.isUsePassword)
    result.form.password =this.oldPassword;

    let newmodel =new  Employee() ;
    this.close(result, this.resetForm(newmodel));
  }
  resetForm(model):any{
   let form = this.fb.group({
      id: [model.id],
      employeeNumber: [model.employeeNumber, [Validators.required, this.removeSpaces]],
      firstName: [model.firstName, [ this.removeSpaces]],
      lastName: [model.lastName, [this.removeSpaces]],
      otherName: [model.otherName, [ this.removeSpaces]],
      adminLevelId: [model.adminLevelId, [Validators.required]],
      fingerPrintSecurityLevelId: [model.fingerPrintSecurityLevelId, [Validators.required]],    
      isUsePassword:[model.isUsePassword],
      password: [model.password, [ this.removeSpaces]],
      isUseSmartCard:[model.isUseSmartCard],
      smartCardNumber:[model.smartCardNumber, [ this.removeSpaces]],
      isUseFingerPrint:[model.isUseFingerPrint],
      isFingerPrintAutoMatch:[model.isFingerPrintAutoMatch],
      isUseFace:[model.isUseFace],
      isFaceAutoMatch:[model.isFaceAutoMatch],
      isActiveEmployee:[model.isActiveEmployee],
      employeeDepartments:[model.employeeDepartments, [Validators.required]],
      employeeAccessGroup:[model.employeeAccessGroup, [Validators.required]]

    }
    // , {
    //   validator: (group) => {
    //     if (group.controls.isUsePassword.value === true) {
    //        Validators.required((group.controls.password));
    //     }
    //     if (group.controls.isUseSmartCard.value === true) {
    //        Validators.required((group.controls.smartCardNumber));
    //     }
    //   }
    // }
    );
    return form;

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
   onCheckChange(event,formcontrol){
    if (!event.checked) {
      this.form.controls[formcontrol].setValue("");
      this.form.get(formcontrol).setValidators([]);
      this.form.get(formcontrol).updateValueAndValidity();
    }
    else{
      if(formcontrol=="password" && !this.isNew)
      return;
      this.form.get(formcontrol).setValidators([Validators.required]);
      this.form.get(formcontrol).updateValueAndValidity();
      
    
    }
   }
}
