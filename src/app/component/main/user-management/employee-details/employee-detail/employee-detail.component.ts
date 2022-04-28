import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import moment from 'moment';
import { BaseEditComponent } from 'src/app/component/base/components/BaseEditComponent';
import { Shell } from 'src/app/component/shell';
import { EmployeeDetailService } from '../Services/employee-detail.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent extends BaseEditComponent implements OnInit {
  baseUrl= 'EmployeeDetails/';
  url = 'EmployeeDetails/GetAllPaged';
  nationalities: any[];
  religions: any[];
  genders: any[];
  jobs: any[];  
  adminstrativelevels: any[];
  contractTypes: any[];
  model :any={employeeId:0};
  base64textString = '';
  saveBtn: boolean = false;
  disabledEmployees: boolean = false;
  form: FormGroup;
  selectedFile = './assets/img/man.png';
  get Service(): EmployeeDetailService { return Shell.Injector.get(EmployeeDetailService); }
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<EmployeeDetailComponent>,
    public dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
   // this.getlookup();
    if (this.data) {
      this.model = this.data;
      this.isNew = false;
     this.disabledEmployees=true;
     this.Service.getEmployeeImage(this.model.id).subscribe(response => {
      
      if(response != null && response != ""){
        this.selectedFile = response;
      }
    });
    }else     
     this.disabledEmployees=false;

 
    // this.Service.getEmployeeImage(this.model.id).subscribe(response => {
    //   if(response != null && response != ""){
    //     this.selectedFile = response;
    //   }
    // });
    this.form = fb.group({
      id: [this.model.id],
      employeeId: [this.model.employeeId, Validators.required],
      employeeNameEn: [this.model.employeeNameEn, Validators.required],
      employeeNameAr: [this.model.employeeNameAr],
      civilId: [this.model.civilId, [Validators.required]],
      nationalityId: [this.model.nationalityId, Validators.required],
      religionId: [this.model.religionId, Validators.required],
      genderId: [this.model.genderId, Validators.required],
      administrativeLevelId: [this.model.administrativeLevelId, Validators.required],
      contractTypeId: [this.model.contractTypeId],
      jobId: [this.model.jobId],
      dateOfHiring: [this.model.dateOfHiring, Validators.required],
      email: this.fb.control(this.model.email,  Validators.email),
      startDate: [this.model.startDate, Validators.required],
      endDate: [this.model.endDate],
      employeeImage: [this.model.employeeImage]
    });

    // let validationIndexes = ['employeeNameFl', 'employeeNameSl', 'civilId','employeeNumber' , 'email'];
    // validationIndexes.forEach((element, i) => {
    //    this.form.controls[element].setValidators([this.isExistValidator(this.form.controls[element], i),this.removeSpaces]);
    // });
  //  this.form.get('civilId').setValidators([Validators.min(100000000000) , Validators.max(999999999999)]);



  }
  getlookup() {
    this.Service.getLookups().subscribe(data => {
      this.jobs = data[0];
      this.adminstrativelevels = data[1];
      this.genders = data[2];
      this.nationalities = data[3];
      this.religions = data[4];
      this.contractTypes = data[5];
    });
  }
  ngOnInit() {
    this.getlookup();
  }

  onSelectedFilesChanged(inputImage: any) {
    try {
      const file: File = inputImage.files[0];
      if (file.size > 2000000) {
        this.Alert.showError(this.localize.translate.instant('Message.maxFileSize'));
        inputImage.value = null;
      } else {
        const reader = new FileReader();
        reader.addEventListener('load', (event: any) => {
          this.base64textString = event.target.result;
          this.selectedFile = (event.target.result ? event.target.result : './assets/img/man.png');
        });
        reader.readAsDataURL(file);
      }

    } catch (error) {
      this.base64textString = null;
      this.selectedFile = './assets/img/man.png';
    }
  }


  validateDate(startDate, endDate, dateOfHiring): boolean {
    let momentSDate = moment.parseZone(startDate);
    let momentEDate = moment.parseZone(endDate);
    let momentHDate = moment.parseZone(dateOfHiring);
    let validateResult = false;
    
    if (momentSDate > momentEDate && endDate != null) {
      this.Alert.showError(this.localize.translate.instant('Message.startDateLessThanEndDate'))
    } else if (momentSDate < momentHDate) {
      this.Alert.showError(this.localize.translate.instant('Message.hireDateBeforeStartDate'))

    } else {
      validateResult = true;
    }
    return validateResult;
  }

  onAddSave(event: any) {
    if (this.selectedFile != './assets/img/man.png') {
      event.form.employeeImage = this.selectedFile;
    }

    let NewForm = event.form;
    let validateResult = this.validateDate(NewForm.startDate, NewForm.endDate, NewForm.dateOfHiring);
    if (validateResult) {
      this.saveBtn = event.buttonType === 'SaveClose' ? true : false;
      
      this.close(event);
    }
    this.selectedFile = './assets/img/man.png';
    this.disabledEmployees=false;

  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
}
