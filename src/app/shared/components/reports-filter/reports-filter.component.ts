import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportFilter } from 'src/app/models/report-filter';
import { LocalizationService } from 'src/app/services/localization/localization.service';
import { Shell } from 'src/app/component/shell';
import { ReportFilterService } from './services/report-filter.service';
import { TreeComponent } from '../tree/components/tree/tree.component';
import { OptionControls } from './models/option-controls';
import * as moment from 'moment';
import { AlertService } from 'src/app/services/AlertService';
import { DomSanitizer } from '@angular/platform-browser';
import { DatePickerHeader } from '../datepicker-header.component';
import { MatDatepicker } from '@angular/material';
import { Moment } from 'moment';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-reports-filter',
  templateUrl: './reports-filter.component.html',
  styleUrls: ['./reports-filter.component.scss']
})
export class ReportsFilterComponent implements OnInit {
  @Input() screenTitle: string;
  @Input() options: OptionControls = new OptionControls();
  @ViewChild(TreeComponent, null) tree: TreeComponent;
  @Input() action: string;
  get localize(): LocalizationService { return Shell.Injector.get(LocalizationService); }
  get Service(): ReportFilterService { return Shell.Injector.get(ReportFilterService); }
  get Alert(): AlertService { return Shell.Injector.get(AlertService); }
  get Storage(): StorageService { return Shell.Injector.get(StorageService); }
  isLoading = false;
  statusList: any;
  group1 = [
    { id: '2', name: 'ReportFilter.location' },
  ];
  header = DatePickerHeader;
  months = [
    { val: '1', nameFl: 'Jan', nameSl: 'يناير' },
    { val: '2', nameFl: 'Feb', nameSl: 'فبراير' },
    { val: '3', nameFl: 'Mar', nameSl: 'مارس' },
    { val: '4', nameFl: 'Apr', nameSl: 'إبريل' },
    { val: '5', nameFl: 'May', nameSl: 'مايو' },
    { val: '6', nameFl: 'Jun', nameSl: 'يونيو' },
    { val: '7', nameFl: 'Jul', nameSl: 'يوليو' },
    { val: '8', nameFl: 'Aug', nameSl: 'أغسطس' },
    { val: '9', nameFl: 'Sep', nameSl: 'سبتمبر' },
    { val: '10', nameFl: 'Oct', nameSl: 'أكتوبر' },
    { val: '11', nameFl: 'Nov', nameSl: 'نوفمبر' },
    { val: '12', nameFl: 'Dec', nameSl: 'ديسمبر' }
  ];
  devicetypes: any[];
  branchs :any[];
  groups:any[];
  devices:any[];
  logtypes:any[];
  showDuty = false;
  form: FormGroup;
  model = new ReportFilter();
  lookupsFilter: any[];
  searchNow = false;
  constructor(public fb: FormBuilder, private sanitizer: DomSanitizer) {
    this.form = fb.group({
     
      deviceTypeIds: [this.model.deviceTypeIds],
      groupIds: [this.model.groupIds],
      branchIds: [this.model.branchIds],
      deviceIds: [this.model.deviceIds],
      isPiChart: [this.model.isPiChart],
      isPaged: [this.model.isPaged],
      organizationName: [null],
      organizationLogo: [null],
      organizationId: [null],
      printType: [this.model.printType],
      startDate: [this.model.startDate],
      endDate: [this.model.endDate],
      logTypeIds :[this.model.logTypeIds],
      employeeIds: [0],
    });
    this.getLookups();
  }
 
  
 
  getLookups() {
    this.Service.getLookup().subscribe(elements => {
      this.devicetypes = elements[0];
      this.branchs =elements[1];
      this.groups =elements[2];
     this.devices =elements[3];
     this.logtypes =elements[4];
      this.lookupsFilter = elements;
    });
  }
  ngOnInit() {
    //this.changeGroup(1);
  }
 

  setOrganizationData() {

    // tslint:disable-next-line:variable-name
    let Organizations_data = this.Storage.get('Organizations_data');
    Organizations_data = JSON.parse(Organizations_data);
    if (Organizations_data) {
      // tslint:disable-next-line:no-string-literal
      let orgId = Organizations_data['id'];
      // tslint:disable-next-line:no-string-literal
      let orgName = this.localize.currentLang == 'Sl' ? Organizations_data['organizationNameSl'] : Organizations_data['organizationNameFl'];
      // tslint:disable-next-line:no-string-literal
      let orgLogo = this.localize.currentLang == 'Sl' ? Organizations_data['logoURLSl'] : Organizations_data['logoURLFl'];
      this.form.controls.organizationName.setValue(orgName);
      this.form.controls.organizationLogo.setValue(orgLogo);
    }
  }
  searchClick(printType) {
    this.searchNow = true;
    this.isLoading = true;
   
    this.setOrganizationData();
    let reportFilter = this.form.value;
    reportFilter.printType = printType;
    if (!this.options.date) {
      reportFilter.startDate = moment.parseZone(new Date(reportFilter.year, this.options.month ? reportFilter.month - 1 : 0, 1))
        .format('L LT');
      reportFilter.endDate = moment.parseZone(new Date(reportFilter.year, this.options.month ? reportFilter.month : 12, 0))
        .format('L LT');
    }
    
    reportFilter.reportName = this.screenTitle;

    this.Service.generateReport(this.action, reportFilter)
      .subscribe(response => {
      
        this.Service.downLoadFile(response, reportFilter.printType == 1 ? 'application/pdf'
          : 'application/msword', reportFilter.printType == 1 ? 'pdf' : 'doc', reportFilter.reportName);
        this.isLoading = false;
        this.searchNow = false;
      }, () => {
        this.Alert.showError(this.localize.translate.instant('Message.noDataFound'));
        this.isLoading = false;
        this.searchNow = false;
      });
  }

  
  

  reset() {
    this.form.reset(new ReportFilter());
    this.tree.loadData([], true);
  }
  getMonth(): number {
    let today = new Date();
    return today.getMonth() + 1;
  }
  
  onOpen(datepicker: MatDatepicker<Moment>) {
    let matCalendar = document.getElementsByClassName('mat-calendar')[0];
    let button = document.createElement('mat-button');
    button.style.color = 'white';
    button.style.backgroundColor = '#3f51b5';
    button.className = 'mat-button';
    button.style.bottom = '5px';
    button.style.position = 'absolute';
    button.style.left = '120px';
    button.style.height = '20px';
    button.style.padding = '0';
    button.style.border = '0';
    button.style.textAlign = 'center';
    button.style.lineHeight = '20px';
    // tslint:disable-next-line:only-arrow-functions
    button.addEventListener('click', function () {
      // tslint:disable-next-line:no-shadowed-variable
      const today = moment().utcOffset(0);
      today.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
      today.toISOString();
      today.format();
      datepicker.select(today);
      datepicker.close();
    }, false);

    let today = 'Today';
    if (this.localize.lang != 'en') {
      today = 'الـيــــوم';
    }

    let text = document.createTextNode(today);

    button.appendChild(text);

    matCalendar.appendChild(button);
  }
  // changeGroup(event) {
  //   if (event == 1) {
  //     this.group1 = [{ id: '2', name: 'ReportFilter.location' }];
  //     this.form.controls['groupBy1'].setValue('2');
  //   } else {
  //     this.group1 = [{ id: '1', name: 'ReportFilter.departmentGroup' }];
  //     this.form.controls['groupBy1'].setValue('1');

  //   }

  // }

  toggleAllSelection(selected, formControlName, index: number) {

    if (selected) {
      this.form.controls[formControlName]
        .patchValue([...this.lookupsFilter[index].map(item => item.id), 0]);
    } else {
      this.form.controls[formControlName].patchValue([]);
    }
  }
  toggleUnSelectAll(selected, formControlName) {
    let selectedItems = this.form.controls[formControlName].value.filter(e => e != 0);
    this.form.controls[formControlName].patchValue(selectedItems);
  }
  fireEvent(e) {
    e.stopPropagation();
    e.preventDefault();
    console.log('click inside input');
    return false;
  }
}
