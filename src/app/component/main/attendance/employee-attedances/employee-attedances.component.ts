import { Component, OnInit, ViewChild } from '@angular/core';
import { Shell } from 'src/app/component/shell';
import { Result } from 'src/app/core/table-details/models/Result';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AttendanceSearch } from 'src/app/models/attendanceSearch';
import { EmployeeAttendanceService } from './services/employeeAttendance.service';
import { AdvancedSearchComponent } from 'src/app/shared/components/advanced-search/advanced-search.component';
import { advancedSearch } from 'src/app/models/advancedSearch';
import { TableCoreService } from 'src/app/shared/components/data-table/services/table-core.service';
import { LocalizationService } from 'src/app/services/localization/localization.service';
import { DatePickerHeader } from 'src/app/shared/components/datepicker-header.component';

@Component({
  selector: 'app-employee-attedances',
  templateUrl: './employee-attedances.component.html',
  styleUrls: ['./employee-attedances.component.scss']
})

export class EmployeeAttedancesComponent implements OnInit {
  get localize(): LocalizationService { return Shell.Injector.get(LocalizationService); }
  header = DatePickerHeader;

  @ViewChild(AdvancedSearchComponent, null) advancedSearchComp: AdvancedSearchComponent;
  get TableCore(): TableCoreService { return Shell.Injector.get(TableCoreService); }

  get Service(): EmployeeAttendanceService { return Shell.Injector.get(EmployeeAttendanceService); }
  employeeLogs: Result;
  model: AttendanceSearch = {};
  advanceSearch: advancedSearch;
  form: FormGroup;
  logTypes: any;
  remarks: any;
  searchResult = true;
  branchs: any;
  devices: any;
  accessmethods:any;
  lookupsFilter: any[];
  showAccessmethods:boolean;
  constructor(public fb: FormBuilder
  ) {
    this.getLookups();
    let todayDate = new Date();
    this.advanceSearch = new advancedSearch();
    this.advanceSearch.typeProcess = 'Add';
    this.form = fb.group({
      employeeId: [0],
      startDate: [todayDate],
      endDate: [todayDate],
      logTypeId: [this.model.logTypeId],
      remarkId: [this.model.remarkId],
      deviceId: [this.model.deviceId],
      branchId: [null],
      accessMethodId:[this.model.accessMethodId]
    });

  }

  ngOnInit(): void {
    this.getLookups();
  }


  searchToggle() {
    if (this.form.value.remarkId != null) {
      this.form.value.remarkId = this.form.value.remarkId.filter(e => e != 0);
    }
    this.reloadGridComponant();
  }

  reloadGridComponant() {
    --this.TableCore.pageOptions.offset;
    this.TableCore.reRenderTable('EmployeeAttendanceLogs/GetAllPaged', this.form.value);
  }

  // toggleAllSelection(selected) {
  //   if (selected) {
  //     this.form.controls.remarkId
  //       .patchValue([...this.remarks.map(item => item.id), 0]);
  //   } 
  //   else {
  //     this.form.controls.remarkId.patchValue([]);
  //   }
  // }
  // toggleUnSelectAll(selected) {
  //   var selectedItems= this.form.controls.remarkId.value.filter(e => e != 0);
  //   this.form.controls.remarkId.patchValue(selectedItems);
  // }
  toggleAllSelection(selected, formControlName, index: number) {

    if (selected) {
      this.form.controls[formControlName]
        .patchValue([...this.lookupsFilter[index].map(item => item.id), 0]);
    } else {
      this.form.controls[formControlName].patchValue([]);
    }
    if (index==1)
    {
      if(this.form.get(formControlName).value.some(c=>c ===1) )
      this.showAccessmethods=true
      else
      this.showAccessmethods=false

    }
  }
  toggleUnSelectAll(selected, formControlName) {
    
    let selectedItems = this.form.controls[formControlName].value.filter(e => e != 0);
    this.form.controls[formControlName].patchValue(selectedItems);
    if (formControlName=='remarkId')
    {
      if(this.form.get(formControlName).value.some(c=>c ===1) )
      this.showAccessmethods=true
      else
      this.showAccessmethods=false

    }
  }
  openDrop(formControlName, index: number) {
    var listids = this.form.get(formControlName).value;
    if(listids!=null){
          if (listids.some(e => e == 0))
      this.toggleAllSelection(true,formControlName,index)
    }


  }
  closeDrop(formControlName) {
    var listids = this.form.get(formControlName).value;
    if(listids!=null){

    if (listids.some(e => e == 0))
      this.form.controls[formControlName].patchValue([0]);
    }
  }
  getLookups() {


    this.Service.getLookup().subscribe(data => {
      this.logTypes = data[0];
      this.remarks = data[1];
      this.branchs = data[2];
      this.devices = data[3];
      this.accessmethods = data[4];
      this.lookupsFilter= data;

    });
  
    
  }

  onEmployeeCancel() {
    this.form.controls['employeeId'].setValue(0);
  }

}
