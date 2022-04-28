export class advancedSearch {
  genderId: number[];
  adminstrationId: number[];
  locationId: number[];
  jobId: number[];
  religionId: number[];
  teamId: number[] = [];
  overTimeOrderId: number[] = [];
  typeProcess = '';
  isSuperAdmin = false;

  employeeIds?: number[] = [];
  accessGroupId?:number[] = [];
  groupId?:number[] = [];


}

export class EmployeeGroupMessageFilterDto {

  typeProcess = '';
  employeeId?: number;
  employeeMessageId?:number[] = [];
  groupIds?:number[] = [];
}
