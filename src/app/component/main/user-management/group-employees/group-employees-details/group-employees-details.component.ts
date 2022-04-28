import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatTabGroup, MAT_DIALOG_DATA } from '@angular/material';
import { from, Observable } from 'rxjs';
import { BaseEditWithListComponent } from 'src/app/component/base/components/BaseEditWithListComponent';
import { Shell } from 'src/app/component/shell';
import { LoadOptions } from 'src/app/core/table-details/models/LoadOptions';
import { advancedSearch } from 'src/app/models/advancedSearch';
import { HttpService } from 'src/app/services/http/http.service';
import { GroupEmployeesService } from '../services/group-employees.service';

@Component({
  selector: 'app-group-employees-details',
  templateUrl: './group-employees-details.component.html',
  styleUrls: ['./group-employees-details.component.scss']
})
export class GroupEmployeesDetailsComponent extends BaseEditWithListComponent implements OnInit {
  @ViewChild(MatTabGroup, null) tabGroup: MatTabGroup;
  showLoader = false;
  pageIds: any[] = [];
  model: any;
  typeProcess: any;
  componentName = '';
  // advanceSearch: advancedSearch;
  employeedata: any;
  id: string;
  checkedItem = false;
  checkedList: any[] = [];
  dataList: any[] = [];
  detailsTable = false;
  //componentName = 'EmployeeGroups';
  url = 'EmployeeGroups/GetAllPaged';
  checkedAll: boolean;
  checkedAllDisable = false;
  showDate = false;
  displayedColumns = {};
  updateEmployeeId = 0;
  queryRequest2: LoadOptions = { offset: 1, limit: 50, sortField: 'id', sortDirection: "", filter: {} };

  get Service(): HttpService { return Shell.Injector.get(HttpService); }

  mainLoader(x: LoadOptions): Observable<any> {
    let queryRequest = { offset: x.offset, limit: x.limit, sortDirection: x.sortDirection, sortField: x.sortField };
    const result = this.resultOfEmployee(queryRequest);
    return from(result);
  }
  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<GroupEmployeesDetailsComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    super(dialogRef);
    if (this.localize.lang == 'en') {
      this.displayedColumns = {
        employeeNumber: 'Employee Number',
        firstName: 'Employee Name',
        lastName: 'last Name',
        otherName: 'other Name',
        smartCardNumber: 'smart CardNumber',
        expireDateStr: 'expire Date',
      };
    } else {
      this.displayedColumns = {
        employeeNumber: 'رقم الموظف',
        firstName: 'اسم الموظف الاول',
        lastName: 'اسم الموظف الثاني',
        otherName: 'اسم الموظف الآخر',
        smartCardNumber: 'رقم الكارت',
        expireDateStr: 'تاريخ الانتهاء',
      };
    }
    if (this.data) {
      this.model = this.data;
      this.isNew = false;
    }

    // this.advanceSearch = new advancedSearch();
    // this.advanceSearch.teamId.push(this.model.id);
    this.form = fb.group({
      id: [this.model.id],
      employeeId: [this.model.employeeId],
      groupId: [this.model.groupId],
      expireDate: [this.model.expireDate],
    });
  }
  async resultOfEmployee(queryRequest: any) {

    var filter = {
      groupId: [],
      typeProcess: this.typeProcess,
    }
    filter.groupId.push(this.model.groupId);

    this.showLoader = true;
    const responce: any = await this.Service.postQueryParamsReq('Employees/GetAllPagedForEmployeeGroup', filter, queryRequest).toPromise();;

    if (responce.list.length == 0) {
      this.checkedAllDisable = true;
    }
    if (responce.list.length > 0) {
      this.checkedAllDisable = false;
    }
    if (this.typeProcess == 'Add') {
      this.checkedItem = false;
      this.checkedAll = false;
    }
    else if (this.typeProcess == 'edit') {
      this.checkedItem = true;
      this.employeedata = responce.list;
      this.checkedList = responce.list.map(element => element.id);
      this.checkedAll = true;
    }
    this.pageIds = responce.list.map(element => element.id);
    this.showLoader = false;
    return responce;
  }

  loadTableData() {
    this.dataTable.dataService = (d: any) => this.mainLoader(d);
    this.dataTable.reload.emit();
  }

  ngOnInit() {
    this.initFunction();
  }

  initFunction() {
    this.showLoader = true;
    this.checkedList = [];
    if (this.model.employeeNumber == 0) {
      this.tabGroup.selectedIndex = 1;
      this.typeProcess = 'Add';
    }
    else {
      this.typeProcess = 'edit';
    }
    this.emitTable(this.queryRequest2);
  }
  async emitTable(queryRequest: any) {
    var filter = {
      groupId: [],
      typeProcess: this.typeProcess,
    }
    filter.groupId.push(this.model.groupId);
    const responce: any = await this.Service.postQueryParamsReq('Employees/GetAllPagedForEmployeeGroup', filter, queryRequest).toPromise();
    this.loadPagedData();
  }

  edit() {
    this.checkedList = [];
    if (this.localize.lang == 'en') {
      this.displayedColumns = {
        employeeNumber: 'Employee Number',
        firstName: 'Employee Name',
        lastName: 'last Name',
        otherName: 'other Name',
        smartCardNumber: 'smart CardNumber',
        expireDateStr: 'expire Date',
      };
    } else {
      this.displayedColumns = {
        employeeNumber: 'رقم الموظف',
        firstName: 'اسم الموظف الاول',
        lastName: 'اسم الموظف الثاني',
        otherName: 'اسم الموظف الآخر',
        smartCardNumber: 'رقم الكارت',
        expireDateStr: 'تاريخ الانتهاء',
      };
    }
    this.showDate = false;
    this.typeProcess = 'edit';
    this.loadTableData();
  }

  add() {
    this.checkedList = [];
    if (this.localize.lang == 'en') {
      this.displayedColumns = {
        employeeNumber: 'Employee Number',
        firstName: 'Employee Name',
        lastName: 'last Name',
        otherName: 'other Name',
        smartCardNumber: 'smart CardNumber',
      };
    }
    else {
      this.displayedColumns = {
        employeeNumber: 'رقم الموظف',
        firstName: 'اسم الموظف الاول',
        lastName: 'اسم الموظف الثاني',
        otherName: 'اسم الموظف الآخر',
        smartCardNumber: 'رقم الكارت',
      };
    }
    this.showDate = true;
    this.typeProcess = 'Add';
    this.loadTableData();
  }
  
  onCheckboxChange(event) {
    this.checkedList = event;
  }



  fillDataListUpdate(checkedListIds: any[]) {
    this.dataList = [];
    checkedListIds.forEach(obj => {
      debugger;
      let employeeGroup = {
        id: obj.id,
        employeeId: obj.employeeId,
        GroupId: this.model.groupId,
        expireDate: obj.expireDate
      }
      this.dataList.push(employeeGroup);
    });

  }
  fillDataList(checkedListIds: any[]) {

    this.dataList = [];
    checkedListIds.forEach(obj => {
      let employeeGroup = {
        employeeId: obj,
        groupId: this.model.groupId,
        expireDate: this.form.get('expireDate').value
      }
      this.dataList.push(employeeGroup);
    });

  }
  fillSearchResult() {
    this.loadTableData();
  }

  onAddSave(event) {
    let type = event.buttonType;
    this.fillDataList(this.checkedList);
    this.Service.post('EmployeeGroups/Add', this.dataList)
      .subscribe(responce => {
        if (type == 'SaveClose') {    
           this.saveAndClose(); 
          }
        else {
          this.changeIndexAfterSave('edit');
          this.saveAndReload();
        }
        this.Alert.showSuccess(this.localize.translate.instant('Message.AddSuccess'));
      });
  }
  onUpdateSave(event) {
    
    var result = this.employeedata.filter(o => this.checkedList.indexOf(o.id) !== -1);
    let type = event.buttonType;
    if (this.checkedList.length == 0) {
      this.checkedList = this.pageIds;
      this.fillDataListUpdate(this.checkedList);
    } else {
      debugger;
      this.fillDataListUpdate(result);
    }

    this.Service.post('EmployeeGroups/Update', this.dataList)
      .subscribe(responce => {
        if (type == 'SaveClose') { this.saveAndClose(); } else { this.changeIndexAfterSave('Add'); this.saveAndReload(); }
        this.Alert.showSuccess(this.localize.translate.instant('Message.UpdateSuccess'));
      });
  }

  changeIndexAfterSave(type: string = 'edit'){
    if(type == 'Add'){
      this.checkedAll = false;
      this.checkedItem = false;
      this.tabGroup.selectedIndex = 1;
      this.checkedList = [];
      this.typeProcess = 'Add';
    }
    else{
      this.checkedItem = true;
      this.checkedAll = true;
      this.tabGroup.selectedIndex = 0;
      this.checkedList = [];
      this.typeProcess = 'edit';
    }
  }
  changeIndex(value: any) {
    if (value == 0) {
      this.edit();
    }
    if (value == 1) {
      this.add();
    }
  }
  editEmployee(model) {

    this.form.controls['expireDate'].setValue(model.expireDate);
    this.updateEmployeeId = model.id;
  }


}
