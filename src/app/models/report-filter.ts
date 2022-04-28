
export class ReportFilter {
   
    deviceTypeIds?:[];
    groupIds?:[];
    branchIds?:[];
    deviceIds?:[];
    logTypeIds?:[];
    employeeIds: string;
    groupBy = 1;
    groupBy1 = 2;
    isPiChart = true;
    isPaged = false;
    startDate = new Date();
    endDate = new Date();
  
    reportName: string;
    organizationId = '00000000-0000-0000-0000-000000000000';
    organizationName: string;
    organizationLogo: string;
    printType ?= 1;

}
