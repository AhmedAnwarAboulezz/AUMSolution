import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MatTabGroup, MAT_DIALOG_DATA } from '@angular/material';
import { from, Observable } from 'rxjs';
import { BaseEditWithListComponent } from 'src/app/component/base/components/BaseEditWithListComponent';
import { Shell } from 'src/app/component/shell';
import { LoadOptions } from 'src/app/core/table-details/models/LoadOptions';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-access-door-devices',
  templateUrl: './access-door-devices.component.html',
  styleUrls: ['./access-door-devices.component.scss']
})
export class AccessDoorDevicesComponent extends BaseEditWithListComponent implements OnInit {
  @ViewChild(MatTabGroup, null) tabGroup: MatTabGroup;
  showLoader = false;
  pageIds: any[] = [];
  model: any;
  typeProcess: any;
  componentName = '';
  devicesdata: any;
  id: string;
  checkedItem = false;
  checkedList: any[] = [];
  dataList: any[] = [];
  detailsTable = false;
  url = 'AccessDoors/GetAllPaged';
  checkedAll: boolean;
  checkedAllDisable = false;
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
    public dialogRef: MatDialogRef<AccessDoorDevicesComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    super(dialogRef);
    if (this.localize.lang == 'en') {
      this.displayedColumns = {
        ipAddress: 'Ip Address',
        serialNumber: 'Serial Number',
        deviceDescription: 'Device Description'
      };
    } 
    else {
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
    
    this.form = fb.group({
      accessDoorId: [this.model.id],
      deviceId: [],
    });
  }


  async resultOfEmployee(queryRequest: any) {
    var filter = {
      accessDoorIds: [],
      typeProcess: this.typeProcess,
    }
    filter.accessDoorIds.push(this.model.id);

    this.showLoader = true;
    const responce: any = await this.Service.postQueryParamsReq('AccessDoors/GetAllPagedForAccessDoorDevices', filter, queryRequest).toPromise();;

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
      this.devicesdata = responce.list;
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
      accessDoorIds: [],
      typeProcess: this.typeProcess,
    }
    filter.accessDoorIds.push(this.model.id);
    const responce: any = await this.Service.postQueryParamsReq('AccessDoors/GetAllPagedForAccessDoorDevices', filter, queryRequest).toPromise();
    if(responce.list.length == 0 && this.typeProcess == 'edit'){
      this.changeIndexAfterSave('Add'); 
      this.saveAndReload();
    }
    else{
      this.loadPagedData();
    }
  }
  onCheckboxChange(event) {
    this.checkedList = event;
  }


  edit() {
    this.checkedList = [];    
    this.typeProcess = 'edit';
    this.loadTableData();
  }

  add() {
    this.checkedList = [];
    this.typeProcess = 'Add';
    this.loadTableData();
  }





  fillDataList(checkedListIds: any[], functionType?: string) {
    this.dataList = [];
    checkedListIds.forEach(obj => {
      let accessDoorDevice = {
        deviceId: obj,
        accessDoorId: this.model.id,
        functionType: functionType
      }
      this.dataList.push(accessDoorDevice);
    });
  }
  onAddSave(event) {
    let type = event.buttonType;
    this.fillDataList(this.checkedList);
    this.Service.post('AccessDoors/AddAccessDoorDevices', this.dataList)
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
    
    let type = event.buttonType;
    if (this.checkedList.length == 0) 
    {
      this.checkedList = this.pageIds;
      this.fillDataList(this.checkedList, 'RemoveAll');
    } 
    else {
      this.fillDataList(this.checkedList);
    }
    this.Service.post('AccessDoors/UpdateAccessDoorDevices', this.dataList)
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
}