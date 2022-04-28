import { advancedSearch } from './advancedSearch';

export class AttendanceSearch {
    employeeId?: number;
    employeeNumber?: string;
    startDate?: Date;
    endDate?: Date;
    logTypeId?: number;
    remarkId?: number;
    employeeStatusId?: number;    
    deviceId?:string;
    advancedSearch?: advancedSearch[];
    accessMethodId?:number;
}

export class AttendanceSearchImage {
    employeeId?: number;
    employeeNumber?: string;
    startDate?: Date;
    logTypeId?: number;
    remarkId?: number;
    id?: number;
}
