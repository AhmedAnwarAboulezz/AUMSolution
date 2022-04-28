import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { from, Observable } from 'rxjs';
import { BaseEditWithListComponent } from 'src/app/component/base/components/BaseEditWithListComponent';
import { Shell } from 'src/app/component/shell';
import { LoadOptions } from 'src/app/core/table-details/models/LoadOptions';
import { AddEmployeeAccessGroupDto } from 'src/app/models/addEmployeeAccessGroupDto';
import { advancedSearch } from 'src/app/models/advancedSearch';
import { HttpService } from 'src/app/services/http/http.service';
import { AccessGroupService } from '../../Services/access-group.services';
import { MatTabGroup } from '@angular/material';

@Component({
  selector: 'app-employee-access-group',
  templateUrl: './employee-access-group.component.html',
  styleUrls: ['./employee-access-group.component.scss']
})


export class EmployeeAccessGroupComponent extends BaseEditWithListComponent implements OnInit {
   @ViewChild(MatTabGroup, null) tabGroup: MatTabGroup;
  showLoader = false;
  pageIds: any[] = [];
  model: any;
  filterSerach: any;
  employeedata: any;
  id: string;
  checkedItem = false;
  checkedList: any[] = [];
  dataList: any[] = [];
  detailsTable = false;
  componentName = 'AccessGroups';
  url = 'AccessGroups/GetAllPaged';
  checkedAll: boolean;
  checkedAllDisable = false;
  displayedColumns = {};
  //selectedIndex = 0;
  advanceSearch: advancedSearch;

  queryRequest2: LoadOptions = { offset: 1, limit: 50, sortField: 'id', sortDirection: "", filter: {} };
  get httpService(): HttpService { return Shell.Injector.get(HttpService); }

  mainLoader(x: LoadOptions): Observable<any> {
    let queryRequest = { offset: x.offset, limit: x.limit, sortDirection: x.sortDirection, sortField: x.sortField };
    const result = this.resultOfEmployee(queryRequest);
    
    return from(result);
  }

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<EmployeeAccessGroupComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
    if (this.localize.lang == 'en') {
      this.displayedColumns = {

        employeeNumber: 'Employee Number',
        firstName: 'Employee First Name',
        lastName: 'Last Name',
        smartCardNumber: 'Card Number'
      };
    } else {
      this.displayedColumns = {
        employeeNumber: 'رقم الموظف',
        firstName: ' أسم الموظف',
        lastName: 'الأسم الثاني',
        smartCardNumber: 'رقم البطاقة'
      };
    }
    if (this.data) {
      this.model = this.data;
      this.isNew = false;
    }
    this.advanceSearch = new advancedSearch();
    this.advanceSearch.accessGroupId.push(this.model.id);
    this.form = fb.group({
      id: [this.model.id],
      accessGroupNumber: [this.model.accessGroupNumber],
      accessGroupName: [this.model.accessGroupName],
    });
  }

  async resultOfEmployee(queryRequest: any) {
    this.showLoader = true;
    const responce: any = await this.httpService.postQueryParamsReq('Employees/GetAllPagedForEmployeeAccessGroup', this.advanceSearch, queryRequest).toPromise();
    
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
    if (this.model.employeeCount == 0) {
      //this.selectedIndex = 1;
      this.tabGroup.selectedIndex = 1;
      this.advanceSearch.typeProcess = 'Add';
    }
    else {
      this.tabGroup.selectedIndex = 0;
      this.advanceSearch.typeProcess = 'edit';
    }
    this.emitTable(this.queryRequest2);
  }

  async emitTable(queryRequest: any) {
    const responce: any = await this.httpService.postQueryParamsReq('Employees/GetAllPagedForEmployeeAccessGroup', this.advanceSearch, queryRequest).toPromise();
    this.loadPagedData();
  }

  edit() {
    //this.tabGroup.selectedIndex = 0;
    this.checkedList = [];
    this.advanceSearch.typeProcess = 'edit';
    this.loadTableData();
  }

  add() {
    //this.tabGroup.selectedIndex = 1;
    this.checkedList = [];
    this.advanceSearch.typeProcess = 'Add';
    this.loadTableData();
  }

  onCheckboxChange(event) {
    this.checkedList = event;
  }

  fillDataList(checkedListIds: any[], functionType?: string) {
    this.dataList = [];
    checkedListIds.forEach(obj => {
      let employeeAccessGroup = new AddEmployeeAccessGroupDto();
      employeeAccessGroup.employeeId = obj;
      employeeAccessGroup.accessGroupId = this.model.id;
      employeeAccessGroup.functionType = functionType;
      this.dataList.push(employeeAccessGroup);
    });

  }
  fillSearchResult() {
    this.loadTableData();
  }

  onAddSave(event) {
    let type = event.buttonType;
    this.fillDataList(this.checkedList);
    console.log('list', this.dataList)
    this.httpService.postQueryParamsReq('EmployeeAccessGroups/Add', this.dataList)
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

    let type = event.buttonType;
    if (this.checkedList.length == 0) {
      this.checkedList = this.pageIds;
      this.fillDataList(this.checkedList, 'RemoveAll');
    } else {
      this.fillDataList(this.checkedList);
    }
    this.httpService.postQueryParamsReq('EmployeeAccessGroups/Update', this.dataList)
      .subscribe(responce => {
        if (type == 'SaveClose') { this.saveAndClose(); }
        else { 
          this.changeIndexAfterSave('Add');
          this.saveAndReload();
         }
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
