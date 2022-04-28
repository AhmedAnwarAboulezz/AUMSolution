import { Component, OnInit, Compiler } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ChartDataSets } from 'chart.js';
import { HomeService } from './services/home.service';
import { LocalizationService } from 'src/app/services/localization/localization.service';
import { Shell } from '../../shell';
import * as moment from 'moment';
import { TreeNode } from 'src/app/shared/components/tree/models/tree';
import { HttpClient } from '@angular/common/http';
import { StorageService } from 'src/app/services/storage/storage.service';
import { HttpService } from 'src/app/services/http/http.service';
import { Router } from '@angular/router';
import { error } from 'protractor';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/AlertService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  get localize(): LocalizationService { return Shell.Injector.get(LocalizationService); }
  get Alert(): AlertService { return Shell.Injector.get(AlertService); }

  cards: any[];
  events = [];
  eventsEN =[];
  options = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    height: 400,
    header: {
      left: 'prev,next',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    },
    editable: true,

  };
  optionsar = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    height: 400,
    header: {
      left: 'prev,next',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    },
    editable: true,
    locale:  'ar' ,
  };

  // PieChart General Colors
  maincolors = ['#1759d3', '#1dd317', '#990e29', '#3a087d', '#dde55c', '#0cb5e7', '#eb6c22', '#fa60d9', '#9a55ff', '#ff1b1be0'];

  // init piechrt object
  hiddenColors = ['#1759d3', '#1dd317', '#990e29', '#3a087d', '#dde55c', '#0cb5e7', '#eb6c22', '#fa60d9', '#3bf2b79e', '#ff1b1be0'];
  hiddenLables = ['Test1', '#Test2', 'Test3', '#Test4', 'Test5', '#Test6', 'Test7', '#Test8', 'Test9', '#Test10'];
  hiddenValues = [11, 30, 5, 8, 25, 17, 7, 4, 13, 22];

  // colors
  accessTerminalColors = [];
  unRegisteredDeviceColors = [];
  employeeColors = ['#FFF59D', '#81D4FA', '#80CBC4'];
  employeeWithRemarkColors = ['#FFF59D', '#81D4FA', '#80CBC4','#1759d3', '#1dd317', '#990e29'];

  employeeInDeviceColors = ['#FFF59D', '#81D4FA', '#80CBC4','#1759d3', '#1dd317', '#990e29'];


  // labels
  unRegisteredDeviceLabelsFl = [];
  unRegisteredDeviceLabelsSl = [];

  accessTerminallabels = [];
  accessTerminallabelsFl = [];
  accessTerminallabelsSl = [];

  employeeLabelsSl = [
    'موظفين انتهي تاريخ مجموعاتهم',
    ' موظفين ينتهي تاريخ مجموعاتهم اليوم',
    'موظفين ينتهي تاريخ مجموعاتهم قريبا'
   
  ];
  employeeLabelsFl = [
    'Expiring Period Employee In Groups',
    'Expiring Period Employee In Groups Today',
    'Expiring Period Employee In Groups soon'
  ];
  employeeLabelUrl = [
    "main/usermanagement/employee-group-expired-date-dash-board",
    "main/usermanagement/employee-group-expired-date-today-dash-board",
    "main/usermanagement/employee-group-expired-date-soon-dash-board",
  ];
  employeeLabelInDevicesUrl = [
    "main/lookups/employee-in-devices-dashboard",
    "main/lookups/employee-in-devices-dashboard",
    "main/lookups/employee-in-devices-dashboard",
    "main/lookups/employee-in-devices-dashboard",
    "main/lookups/employee-in-devices-dashboard",
  ];
  
  employeeWithRemarkLabelsSl = [
    'الموظفين مستخدمي الكارت',
    'الموظفين مستخدمي الرقم السري',
    'الموظفين مستخدمي الوجه',
    'الموظفين مستخدمي بصمه الاصبع',
    'موظفين مستخدمي تطابق الوجه',
    'موظفين مستخدمي تطابق الاصبع',
   
  ];
  employeeWithRemarkLabelsFl = [
    'Employees Use Smart Card',
    'Employees Use Password',
    'Employees Use Face',
    'Employees Use Finger Print',
    'Employees Use Face AutoMatch',
    'Employees Use Finger Print AutoMatch',
  ];
  employeeInDeviceLabelsSl = [];
  employeeInDeviceLabelsFl = [];
  // data
  accessTerminals= [];
  unRegisteredDevices = [];
  
  employeeInDevicesData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0], label: 'Employee Count In Devices', barThickness: 50 }
  ];
  employeeInDevicesDataSl: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0], label: 'عدد الموظفين علي المجموعات', barThickness: 50 }
  ];
  employeeInDevicesDataFl: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0], label: 'Employee Count In Devices', barThickness: 50 }
  ];

  employeeStatusData: ChartDataSets[] = [
    { data: [0, 0, 0], label: 'Expiring Employees Group', barThickness: 50 }
  ];
  employeeStatusDataSl: ChartDataSets[] = [
    { data: [0, 0, 0], label: 'انتهاء تاريخ مجموعاتهم', barThickness: 50 }
  ];
  employeeStatusDataFl: ChartDataSets[] = [
    { data: [0, 0, 0], label: 'Expiring Employees Group', barThickness: 50 }
  ];

  employeeWithRemarkStatusData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0], label: 'Employees Remark', barThickness: 50 }
  ];
  employeeWithRemarkStatusDataSl: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0], label: 'بصمات الموظفين', barThickness: 50 }
  ];
  employeeWithRemarkStatusDataFl: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0], label: 'Employees Remark', barThickness: 50 }
  ];
  
  // Show/Hide
  unRegisteredDevicePieChart = false;
  accessTerminalDoughnutChart = false;
  holidayCalender = false;
  haveEmployeeData = false;
  haveemployeeWithRemarkData = false;
  haveemployeeInDevice = false;

  showLoader = true;
  taskClasses=["bg-gradient-warning","bg-gradient-success","bg-gradient-danger","bg-gradient-primary"];

  get Storage(): StorageService { return Shell.Injector.get(StorageService); }
  constructor(private _compiler: Compiler,
              private homeService: HomeService,
              public http: HttpClient,
              public httpService: HttpService,
              private router: Router,
              public authService: AuthService) 
  {

    //this.checkOtherUserIn();
    this.getRegisteredDeviceDashBoard();
    this.getAccessTerminalDevicesStatus();
    this.getHolidays();
    this.getCards();
    this.getEmployees();
    this.getEmployeesWithRemark();
    this.getEmployeesInDevices();
    
  }



  ngOnInit() {
    this._compiler.clearCache();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.cards, event.previousIndex, event.currentIndex);
    this.Storage.set('homeData', JSON.stringify(this.cards));
  }
  getBackgroundColor(cardName) {
    return 'red';
  }
  getGradientColorForIcon(cardId) {
    switch (cardId) {
      case cardId = 1:
        return 'linear-gradient(60deg, #5e35b1, #039be5)';
      case cardId = 2:
        return 'linear-gradient(60deg, #654ea3, #eaafc8)';
      case cardId = 3:
        return 'linear-gradient(60deg, #2193b0, #6dd5ed)';
      case cardId = 4:
        return 'linear-gradient(60deg, #1f4037, #99f2c8)';
    }
  }

  getCards() {
    this.cards = [
      {
        id: 1,
        itemvalue: '17',
        textFl: 'Attendance',
        textSl: 'الحضور',
        secondTextFl: 'no.of present employees / no.of employees shifts',
        secondTextSl: 'عدد الموظفين الحضور / عدد الموظفين للفترة الحالية',
        icon: 'person',
        cols: 1,
        rows: 1,
        hasSecondaryText: true,
        itemUnitFl: 'employee',
        itemUnitSl: 'موظف',
        color: '#484ebe',
        link: '/main/logs/employee-today-present'
      },
      {
        id: 2,
        itemvalue: '15',
        textFl: 'Permissions',
        secondTextFl: 'total no.of permissions',
        itemUnitFl: 'permission',
        textSl: 'تصريح جزئى',
        secondTextSl: 'اجمالي عدد التصريحات',
        itemUnitSl: 'تصريح',
        icon: 'security',
        cols: 1,
        rows: 1,
        hasSecondaryText: true,
        color: '#7c5faa',
        link: '/main/permissions/employee-permissions-dashboard'
      },
      {
        id: 3,
        itemvalue: '120',
        textFl: 'Late Signin',
        secondTextFl: 'Total Minutes Of Late Signin',
        itemUnitFl: 'minute',
        textSl: 'حضور متأخر',
        secondTextSl: 'عدد دقائق تأخر الحضور',
        itemUnitSl: 'دقيقة',
        icon: 'watch',
        cols: 1,
        rows: 1,
        hasSecondaryText: true,
        color: '#32a1bd',
        link: '/main/logs/employee-today-lateins'
      },
      {
        id: 4,
        itemvalue: '420',
        textFl: 'Early Signout',
        secondTextFl: 'Total Minutes of Early Signout',
        itemUnitFl: 'minute',
        textSl: 'الخروج المبكر',
        secondTextSl: 'عدد دقائق الخروج المبكر',
        itemUnitSl: 'دقيقة',
        icon: 'accessibility',
        cols: 1,
        rows: 1,
        hasSecondaryText: true,
        color: '#345e50',
        link: '/main/logs/employee-today-earlyouts'
      }
    ];
    this.showLoader = false;
  }

  getRegisteredDeviceDashBoard() {
    this.homeService.GetUnRegisteredDeviceDashBoard().subscribe(result => {   
    if (result.values.length != 0) {
    this.unRegisteredDeviceLabelsFl = result.namesFl;
    this.unRegisteredDeviceLabelsSl = result.namesSl;
    this.unRegisteredDeviceColors = this.generateColorArray(result.values.length, false);
    this.unRegisteredDevices = result.values;
    this.unRegisteredDevicePieChart = true;
    } else {
      this.unRegisteredDevicePieChart = false;
    }
  });
  }

  getAccessTerminalDevicesStatus() {
    // let result = {
    //   namesFl:["Pending Req","History Req"],
    //   namesSl:["الطلبات التامة","الطلبات المعلقة"],
    //   values:[9,3]
    // };
    // if (result.values.length != 0) {
    //   this.accessTerminallabels = this.localize.lang == 'ar' ? result.namesSl : result.namesFl;
    //   this.accessTerminallabelsFl = result.namesFl;
    //   this.accessTerminallabelsSl = result.namesSl;
    //   this.accessTerminalColors = this.generateColorArray(result.values.length, true);
    //   this.accessTerminals= result.values;
    //   this.accessTerminalDoughnutChart = true;
    // } else {
    //   this.accessTerminalDoughnutChart = false;
    // }
    this.homeService.GetAccessTerminalsCountDashBoard().subscribe(result => {
      if (result.values.length != 0) {
        this.accessTerminallabels = this.localize.lang == 'ar' ? result.namesSl : result.namesFl;
        this.accessTerminallabelsFl = result.namesFl;
        this.accessTerminallabelsSl = result.namesSl;
        this.accessTerminalColors = ['#25dc25','#ff0000'];
        this.accessTerminals= result.values;
        this.accessTerminalDoughnutChart = true;
      } else {
        this.accessTerminalDoughnutChart = false;
      }
    });
  }


  ApplyHolidays(data,isAr=true) : any []  {
  let  events = [];
  data.forEach(obj => {
   // 
   let  holiday = { start:'' , end:'' ,title:''  } ;
    holiday.start= obj.start;
    holiday.end= obj.end;
    holiday.title= isAr  ? obj.titleSl :obj.titleFl ;
    events.push(holiday);
   }); 
   return events;
  }
  getHolidays() {
    // this.homeService.GetPublicHolidaysCalender().subscribe(result => {
    //   if (result.length != 0) {
    //     this.events = this.ApplyHolidays(result);
    //     this.eventsEN = this.ApplyHolidays(result,false);
    //     this.holidayCalender = true;
    //   } else {
    //     this.holidayCalender = false;
    //   }
    // });
  }

  getEmployees() {
    this.homeService.getEmployeeGroupExpireData().subscribe(result => {

      this.employeeStatusDataFl = [
        { data: result, label: 'Employees Status', barThickness: 50 }
      ];
      this.employeeStatusDataSl = [
        { data: result, label: 'حالة الموظفين', barThickness: 50 }
      ];
      this.haveEmployeeData = true;
    });
  }
  getEmployeesWithRemark() {
    this.homeService.getEmployeeWithRemarkData().subscribe(results => {

      this.employeeWithRemarkStatusDataFl = [
        { data: results, label: 'Employees Remark', barThickness: 50 }
      ];
      this.employeeWithRemarkStatusDataSl = [
        { data: results, label: 'بصمات الموظفين', barThickness: 50 }
      ];
      this.haveemployeeWithRemarkData = true;
    });
  }
  getEmployeesInDevices() {
    this.homeService.GetDeviceWithEmployeesCountDashBoard().subscribe(result => {

      this.employeeInDevicesDataFl = [
        { data: result.values, label: 'Employees Count In Devices', barThickness: 50 }
      ];
      this.employeeInDevicesDataSl = [
        { data: result.values, label: 'عدد الموظفين علي الاجهزه', barThickness: 50 }
      ];

      this.employeeInDeviceLabelsFl = result.namesFl;
      this.employeeInDeviceLabelsSl = result.namesSl;
      this.haveemployeeInDevice = true;
    });
  }

  generateColorArray(limit: number, reverse: boolean): any {
    let newColors = [];
    if(reverse){
      for (let i = 0; i < limit; i++) {
        let index = this.maincolors.length -(i % this.maincolors.length)-1;
        newColors.push(this.maincolors[index]);
      }
    }
    else{
      for (let i = 0; i < limit; i++) {
        let index = i % this.maincolors.length;
        newColors.push(this.maincolors[index]);
      }
    }
    return newColors;
  }


  onOptionsSelected(value){
    if(value !== null && value !== ''){
      //this.router.navigate([value]);
      window.open(value, '_blank')
    }
  }
  clickEvent(index){
    let url = this.employeeLabelUrl[index];
    window.open(url, '_blank');
  }
  clickEventemployeeInDevice(index){
    let url = this.employeeLabelInDevicesUrl[index];
    window.open(url, '_blank');
  }
  
  PieClickEvent(value,index){
    let chartType = value == 0 ? 'Leave':
              value == 1 ? 'FullPermission': 'Allowance';
    let chartWithIndex = chartType + " --> "+ index
    console.log(chartWithIndex);
  }

  // chartOnClick(chartTitle: any, seriesIndex: number, filterName?: string ) {
  //   if(chartTitle == "accessTerminal"){
  //     this.router.navigateByUrl(`main/lookups/device-monitor?currentstatus=${seriesIndex}&filterName=${filterName}`);
  //   }
  //   else if(chartTitle == "late"){
  //     this.router.navigateByUrl(`home/inquiry/part-day-list/list?filterName="permission"&filterId=${seriesIndex}`);
  //   }
  //   else if(chartTitle == "permission"){  
  //     this.router.navigateByUrl(`home/inquiry/part-day-list/list?filterName="permission"&filterId=${seriesIndex}`);
  //   }
  //   else if(chartTitle == "leave"){
  //     this.router.navigateByUrl("home/inquiry/leavs-balance-list/list");
  //   }
  // }

}
