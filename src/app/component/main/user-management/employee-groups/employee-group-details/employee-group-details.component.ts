import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MatTabGroup, MAT_DIALOG_DATA } from '@angular/material';
import { from, Observable } from 'rxjs';
import { BaseEditWithListComponent } from 'src/app/component/base/components/BaseEditWithListComponent';
import { Shell } from 'src/app/component/shell';
import { LoadOptions } from 'src/app/core/table-details/models/LoadOptions';
import { AddEmployeeGroupsDto } from 'src/app/models/addEmployeeGroupsDto';
import { advancedSearch } from 'src/app/models/advancedSearch';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-employee-group-details',
  templateUrl: './employee-group-details.component.html',
  styleUrls: ['./employee-group-details.component.scss']
})

export class EmployeeGroupDetailsComponent extends BaseEditWithListComponent implements OnInit {
  @ViewChild(MatTabGroup, null) tabGroup: MatTabGroup;
  showLoader = false;
  pageIds: any[] = [];
  showDate = false;
  model: any;
  filterSerach: any;
  employeedata: any;
  id: string;
  checkedItem = false;
  checkedList: any[] = [];
  dataList: any[] = [];
  detailsTable = false;
  componentName = 'AccessGroups';
  url = 'Employees/GetAllPaged';
  checkedAll: boolean;
  checkedAllDisable = false;
  displayedColumns = {};
  advanceSearch: advancedSearch;

  queryRequest2: LoadOptions = { offset: 1, limit: 50, sortField: 'id', sortDirection: "", filter: {} };
  get Service(): HttpService { return Shell.Injector.get(HttpService); }

  mainLoader(x: LoadOptions): Observable<any> {
    let queryRequest = { offset: x.offset, limit: x.limit, sortDirection: x.sortDirection, sortField: x.sortField };
    const result = this.resultOfEmployee(queryRequest);
    
    return from(result);
  }

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<EmployeeGroupDetailsComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
    if (this.localize.lang == 'en') {
      this.displayedColumns = {      
        groupDescription: 'Group Description',
        expireDateStr: 'expire Date',
        
      };
    } else {
      this.displayedColumns = {
        groupDescription: 'وصف المجموعة',
        expireDateStr: 'تاريخ الانتهاء',
       
      };
    }
    if (this.data) {
      this.model = this.data;
      this.isNew = false;
    }
    this.advanceSearch = new advancedSearch();
    this.advanceSearch.employeeIds.push(this.model.id);
    this.form = fb.group({
      employeeId: [this.model.id],
      expireDate: [this.model.expireDate]
      
    });
  }

  async resultOfEmployee(queryRequest: any) {
    this.showLoader = true;
    const responce: any = await this.Service.postQueryParamsReq('Groups/GetAllPagedForEmployeeGroup', this.advanceSearch, queryRequest).toPromise();
    
    if (responce.list.length == 0) {
      this.checkedAllDisable = true;
    }
    if (responce.list.length > 0) {
      this.checkedAllDisable = false;
    }
    if (this.advanceSearch.typeProcess == 'Add') {
      this.checkedItem = false;
      this.checkedAll = false;
    } else if (this.advanceSearch.typeProcess == 'edit') {
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
      this.advanceSearch.typeProcess = 'Add';
    }
    else {
      this.advanceSearch.typeProcess = 'edit';
    }
    this.emitTable(this.queryRequest2);
  }

  async emitTable(queryRequest: any) {
    const responce: any = await this.Service.postQueryParamsReq('Groups/GetAllPagedForEmployeeGroup', this.advanceSearch, queryRequest).toPromise();
    this.loadPagedData();
  }

  edit() {
    this.checkedList = [];  
    this.advanceSearch.typeProcess = 'edit';
    this.showDate = false;
    this.loadTableData();
  }

  add() {
    this.checkedList = [];
    this.advanceSearch.typeProcess = 'Add';
    this.showDate = true;
    this.loadTableData();
  }

  onCheckboxChange(event) {
    this.checkedList = event;
  }

  

  fillDataList(checkedListIds: any[]) {
    this.dataList = [];
    checkedListIds.forEach(obj => {

      let addEmployeeGroupsDto ={
      groupId : obj,
      employeeId : this.model.id,
      expireDate:this.form.get('expireDate').value
      }
      this.dataList.push(addEmployeeGroupsDto);
    });

  }
  fillDataListUpdate(checkedListIds: any[]) {
    this.dataList = [];
    checkedListIds.forEach(obj => {
      debugger;
      let employeeGroup = {
        id: obj.id,
        employeeId:this.model.id,
        groupId: obj.groupId,
        expireDate: obj.expireDate       
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
    
    console.log('list', this.dataList)
    this.Service.post('EmployeeGroups/Add', this.dataList)
      .subscribe(responce => {
        if (type == 'SaveClose') { this.saveAndClose(); }
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
      this.fillDataListUpdate(result);

    }
    this.Service.post('EmployeeGroups/UpdateGroupList', this.dataList)
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
      this.advanceSearch.typeProcess = 'Add';
    }
    else{
      this.checkedItem = true;
      this.checkedAll = true;
      this.tabGroup.selectedIndex = 0;
      this.checkedList = [];
      this.advanceSearch.typeProcess = 'edit';
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
}

