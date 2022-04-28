import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MatTabGroup, MAT_DIALOG_DATA } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { from, Observable } from 'rxjs';
import { BaseListComponent } from 'src/app/component/base/BaseListComponent';
import { BaseEditWithListComponent } from 'src/app/component/base/components/BaseEditWithListComponent';
import { Shell } from 'src/app/component/shell';
import { LoadOptions } from 'src/app/core/table-details/models/LoadOptions';
import { Result } from 'src/app/core/table-details/models/Result';
import { employeeMessageDetail } from 'src/app/models/addEmployeeMessage';
import { advancedSearch, EmployeeGroupMessageFilterDto } from 'src/app/models/advancedSearch';
import { APIs } from 'src/app/services/APIs';
import { HttpService } from 'src/app/services/http/http.service';
import { LocalizationService } from 'src/app/services/localization/localization.service';
import { DatePickerHeader } from 'src/app/shared/components/datepicker-header.component';
import { EmployeeMessageService } from '../services/employee-message.service';

@Component({
  selector: 'app-employee-message-detaials',
  templateUrl: './employee-message-detaials.component.html',
  styleUrls: ['./employee-message-detaials.component.scss']
})



export class EmployeeMessageDetaialsComponent extends BaseEditWithListComponent implements OnInit {
  @ViewChild(MatTabGroup, null) tabGroup: MatTabGroup;
  showLoader = false;
  pageIds: any[] = [];
  model: any;
  filterSerach: any;
  devicedata: any;
  groups:any;
  id: string;
  checkedItem = false;
  checkedList: any[] = [];
  dataList: any[] = [];
  detailsTable = false;
  componentName = 'EmployeeMessages';
  url = 'EmployeeMessages/GetAllPaged';
  checkedAll: boolean;
  checkedAllDisable = false;
  displayedColumns = {};
  advanceSearch: EmployeeGroupMessageFilterDto = {
    employeeId:0,
    typeProcess:'edit'
  };

  queryRequest2: LoadOptions = { offset: 1, limit: 50, sortField: 'id', sortDirection: "", filter: {} };
  get httpService(): HttpService { return Shell.Injector.get(HttpService); }
  get Service(): EmployeeMessageService { return Shell.Injector.get(EmployeeMessageService); }
  mainLoader(x: LoadOptions): Observable<any> {
    let queryRequest = { offset: x.offset, limit: x.limit, sortDirection: x.sortDirection, sortField: x.sortField };
    const result = this.resultOfEmployee(queryRequest);
    
    return from(result);
  }

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<EmployeeMessageDetaialsComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
    if (this.localize.lang == 'en') {
      this.displayedColumns = {

        employeeNumber: 'Employee Number',
        firstName: 'First Name',
        lastName:'LastName',
      };
    } else {
      this.displayedColumns = {
        employeeNumber: 'رقم الموظف',
        firstName: ' الاسم الاول',
        lastName:'الاسم الاخير',
      };

    }
    if (this.data) {
      this.model = this.data;
      this.isNew = false;
    }
    this.advanceSearch = new EmployeeGroupMessageFilterDto();
    this.advanceSearch.employeeMessageId.push(this.model.id);
    this.advanceSearch.employeeId = 0;
    this.form = fb.group({
      message: [this.model.message],
      fromDateShow: [this.model.fromDateShow],
      
    });
  }

  async resultOfEmployee(queryRequest: any) {
    this.showLoader = true;
    const responce: any = await this.httpService.postQueryParamsReq('EmployeeMessageDetails/GetAllPagedEmployeeGroupMessageDetails', this.advanceSearch, queryRequest).toPromise();
    
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
      this.devicedata = responce.list;
      debugger;
      if((this.advanceSearch.employeeId == 0 || this.advanceSearch.employeeId == null )
        && (this.advanceSearch.groupIds == null || this.advanceSearch.groupIds.length == 0 || this.advanceSearch.groupIds == []))
      {
        this.checkedList = responce.list.map(element => element.id);
      }
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
    this.getGroups();
    this.initFunction();
  }

  initFunction() {
    this.showLoader = true;
    this.checkedList = [];
    if (this.model.deviceCount == 0) {
      this.tabGroup.selectedIndex = 1;
      this.advanceSearch.typeProcess = 'Add';
    }
    else {
      this.advanceSearch.typeProcess = 'edit';
    }
    this.emitTable(this.queryRequest2);
  }

  async emitTable(queryRequest: any) {
    const responce: any = await this.httpService.postQueryParamsReq('EmployeeMessageDetails/GetAllPagedEmployeeGroupMessageDetails', this.advanceSearch, queryRequest).toPromise();
    this.loadPagedData();
  }

  edit() {
    this.checkedList = [];
    this.advanceSearch.typeProcess = 'edit';
    this.loadTableData();
  }

  add() {
    this.checkedList = [];
    this.advanceSearch.typeProcess = 'Add';
    this.loadTableData();
  }
applySearch(){
  console.log(this.advanceSearch);
  //this.checkedList = [];
  this.loadTableData();
  
}
  onCheckboxChange(event) {
    this.checkedList = event;
  }

  fillDataList(checkedListIds: any[], functionType?: string) {
    this.dataList = [];
    checkedListIds.forEach(obj => {
      let employeeMessageDetails = new employeeMessageDetail();
      employeeMessageDetails.employeeId = obj;
      employeeMessageDetails.employeeMessageId = this.model.id;
      employeeMessageDetails.functionType = functionType;
      this.dataList.push(employeeMessageDetails);
    });

  }
  fillSearchResult() {
    this.loadTableData();
  }

  onAddSave(event) {
    let type = event.buttonType;
    this.fillDataList(this.checkedList);
    console.log('list', this.dataList)
    this.httpService.postQueryParamsReq('EmployeeMessageDetails/AddList', this.dataList)
      .subscribe(responce => {
        if (type == 'SaveClose') { this.saveAndClose(); }
        else {
          //this.checkedItem = true;
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
    this.httpService.postQueryParamsReq('EmployeeMessageDetails/UpdateEmployeeMessageDetail', this.dataList)
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
  getGroups() {
    this.Service.getGroups().subscribe(elements => {
      this.groups = elements;
    });
  }

  onEmployeeCancel() {
    this.advanceSearch.employeeId= 0;
  }
 
}