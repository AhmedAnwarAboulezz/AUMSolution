import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MatTabGroup, MAT_DIALOG_DATA } from '@angular/material';
import { from, Observable } from 'rxjs';
import { BaseEditWithListComponent } from 'src/app/component/base/components/BaseEditWithListComponent';
import { Shell } from 'src/app/component/shell';
import { LoadOptions } from 'src/app/core/table-details/models/LoadOptions';
import { AddDeviceAccessGroupDto } from 'src/app/models/addEmployeeAccessGroupDto';
import { advancedSearch } from 'src/app/models/advancedSearch';
import { HttpService } from 'src/app/services/http/http.service';
import { AccessGroupService } from '../../Services/access-group.services';

@Component({
  selector: 'app-device-access-group',
  templateUrl: './device-access-group.component.html',
  styleUrls: ['./device-access-group.component.scss']
})


export class DeviceAccessGroupComponent extends BaseEditWithListComponent implements OnInit {
  @ViewChild(MatTabGroup, null) tabGroup: MatTabGroup;
  showLoader = false;
  pageIds: any[] = [];
  model: any;
  filterSerach: any;
  devicedata: any;
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
  advanceSearch: advancedSearch;

  queryRequest2: LoadOptions = { offset: 1, limit: 50, sortField: 'id', sortDirection: "", filter: {} };
  //get Service(): AccessGroupService { return Shell.Injector.get(AccessGroupService); }
  get httpService(): HttpService { return Shell.Injector.get(HttpService); }

  mainLoader(x: LoadOptions): Observable<any> {
    let queryRequest = { offset: x.offset, limit: x.limit, sortDirection: x.sortDirection, sortField: x.sortField };
    const result = this.resultOfDevice(queryRequest);
    
    return from(result);
  }

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<DeviceAccessGroupComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(dialogRef);
    if (this.localize.lang == 'en') {
      this.displayedColumns = {

        ipAddress: 'Ip Address',
        serialNumber: 'Serial Number',
        deviceDescription: 'Device Description'
      };
    } else {
      this.displayedColumns = {
        ipAddress: 'عنوان الجهاز',
        serialNumber: 'كود الجهاز',
        deviceDescription: 'وصف الجهاز'
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

  async resultOfDevice(queryRequest: any) {
    this.showLoader = true;
    const responce: any = await this.httpService.postQueryParamsReq('Devices/GetAllPagedForDeviceAccessGroup', this.advanceSearch, queryRequest).toPromise();
    
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
    const responce: any = await this.httpService.postQueryParamsReq('Devices/GetAllPagedForDeviceAccessGroup', this.advanceSearch, queryRequest).toPromise();
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

  onCheckboxChange(event) {
    this.checkedList = event;
  }

  fillDataList(checkedListIds: any[], functionType?: string) {
    this.dataList = [];
    checkedListIds.forEach(obj => {
      let deviceAccessGroup = new AddDeviceAccessGroupDto();
      deviceAccessGroup.deviceId = obj;
      deviceAccessGroup.accessGroupId = this.model.id;
      deviceAccessGroup.functionType = functionType;
      this.dataList.push(deviceAccessGroup);
    });

  }
  fillSearchResult() {
    this.loadTableData();
  }

  onAddSave(event) {
    let type = event.buttonType;
    this.fillDataList(this.checkedList);
    console.log('list', this.dataList)
    this.httpService.postQueryParamsReq('AccessGroupDevices/Add', this.dataList)
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
    this.httpService.postQueryParamsReq('AccessGroupDevices/Update', this.dataList)
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
