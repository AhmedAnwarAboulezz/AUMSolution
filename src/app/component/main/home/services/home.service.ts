import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Observable, forkJoin } from 'rxjs';
import { ReportFilter } from 'src/app/models/report-filter';

@Injectable({
  providedIn: 'root'
})
export class HomeService {


  constructor(private http: HttpService){

  }

  // GetDashboardTotal(): Observable<any> {
  //   return this.http.get(this.serverUrl + 'Reports/GetDashboardCounts');
  // }

  // GetEmployeesTotalPermissionsForToday(): Observable<any> {
  //   return this.http.get(this.serverUrl + 'EmployeePermissions/GetEmployeesTotalPermissionsForToday');
  // }
  // GetEmployeesLeavesForToday(): Observable<any> {
  //   return this.http.get(this.serverUrl + 'EmployeeLeaves/GetEmployeesLeavesForToday');
  // }
  GetAccessTerminalsCountDashBoard(): Observable<any> {
    return this.http.get('Devices/GetAccessTerminalsCountDashBoard');
  }
  GetUnRegisteredDeviceDashBoard(): Observable<any> {
    return this.http.get('Devices/GetUnRegisteredDeviceDashBoard');
  }
  GetEmployeeGroupExpireDashBoard(): Observable<any> {
      return this.http.get('EmployeeGroups/GetEmployeeGroupExpireDashBoard');
    }
  GetEmployeeGroupExpireTodayDashBoard(): Observable<any> {
      return this.http.get('EmployeeGroups/GetEmployeeGroupExpireTodayDashBoard');
    }
  GetEmployeeGroupExpireThroughWeekDashBoard(): Observable<any> {
      return this.http.get('EmployeeGroups/GetEmployeeGroupExpireThroughWeekDashBoard');
    }
    GetDeviceWithEmployeesCountDashBoard(): Observable<any> {
      return this.http.get('DeviceGroups/GetDeviceWithEmployeesCountDashBoard');
    }
    
    GetEmployeeIsUseFingerPrint(): Observable<any> {
      return this.http.get('Employees/GetEmployeeIsUseFingerPrint');
    }

    GetEmployeeIsUseSmartCard(): Observable<any> {
      return this.http.get('Employees/GetEmployeeIsUseSmartCard');
    }

    GetEmployeeIsUsePassword(): Observable<any> {
      return this.http.get('Employees/GetEmployeeIsUsePassword');
    }
    GetEmployeeIsUseFace(): Observable<any> {
      return this.http.get('Employees/GetEmployeeIsUseFace');
    }
    GetEmployeeIsFaceAutoMatch(): Observable<any> {
      return this.http.get('Employees/GetEmployeeIsFaceAutoMatch');
    }
    GetEmployeeIsFingerPrintAutoMatch(): Observable<any> {
      return this.http.get('Employees/GetEmployeeIsFingerPrintAutoMatch');
    }
    
    
  // GetEmployeesAllowancesForToday(): Observable<any> {
  //   return this.http.get(this.serverUrl + 'EmployeeAllowances/GetEmployeesAllowancesForToday');
  // }
  // GetEmployeeDutyForToday(): Observable<any> {
  //   return this.http.get(this.serverUrl + 'EmployeeDuties/GetEmployeeDutyForToday');
  // }
  // GetEmployeeShiftForToday(): Observable<any> {
  //   return this.http.get(this.serverUrl + 'EmployeeDuties/GetEmployeeShiftForToday');
  // }
  // GetPublicHolidaysCalender(): Observable<any> {
  //   return this.http.get(this.serverUrl + 'HolidayDates/GetHolidayDatesCalender');
  // }

  // GetAdminstrativeWithOutManger(): Observable<any> {
  //   return this.http.get(this.serverUrl + 'AdminMangers/AdminstrativeWithOutManger');
  // }
  // GetInCompletDateforEmployee(): Observable<any> {
  //   return this.http.get(this.serverUrl + 'Employees/InCompletDateforEmployee');
  // }
  // GetEmployeeTemporaryAdminstrationExpire(): Observable<any> {
  //   return this.http.get(this.serverUrl + 'Employees/EmployeeTemporaryAdminstrationExpire');
  // }
  
  // GetEmployeeFullDayExpire(): Observable<any> {
  //   return this.http.get(this.serverUrl + 'EmployeeFullDayPermissions/EmployeeFullDayExpire');
  // }


  // IsLoginFromOtherDeviceRequest(): Observable<any> {
  //   return this.http.get(this.serverUrl + 'Users/IsLoginFromOtherDeviceRequest');
  // }


  // getCardsData(): Observable<any> {
  //   const sources = [];
  //   sources.push(this.GetDashboardTotal());
  //   sources.push(this.GetEmployeesTotalPermissionsForToday());
  //   sources.push("9");
  //   sources.push("5");
  //   return forkJoin(sources);
  // }
  
  getEmployeeGroupExpireData(): Observable<any> {
    const sources = [];
    sources.push(this.GetEmployeeGroupExpireDashBoard());
    sources.push(this.GetEmployeeGroupExpireTodayDashBoard());
    sources.push(this.GetEmployeeGroupExpireThroughWeekDashBoard());
    return forkJoin(sources);
  }

  getEmployeeWithRemarkData(): Observable<any> {
    const sources = [];
    sources.push(this.GetEmployeeIsUseSmartCard());
    sources.push(this.GetEmployeeIsUsePassword());
    sources.push(this.GetEmployeeIsUseFace());
    sources.push(this.GetEmployeeIsUseFingerPrint());
    sources.push(this.GetEmployeeIsFaceAutoMatch());
    sources.push(this.GetEmployeeIsFingerPrintAutoMatch());
    return forkJoin(sources);
  }
  
  

}
