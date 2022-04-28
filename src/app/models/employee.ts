export class Employee {
     id?: number;
     employeeNumber?: string;
     firstName?: string;
     lastName?: string;
     otherName?: string;
     adminLevelId?: string;
     fingerPrintSecurityLevelId?: string;
     isActiveEmployee? : boolean;
     isUsePassword? : boolean;
     password? : string;
     isUseSmartCard?  : boolean;
     smartCardNumber? : string;
     isUseFingerPrint? : boolean;
     isFingerPrintAutoMatch?  : boolean;
     isUseFace?  : boolean;
     isFaceAutoMatch?  : boolean;
     employeeDepartments?: EmployeeDepartments[];
     employeeAccessGroup?: EmployeeAccessGroups[];

}
export class EmployeeDepartments {
    employeeId? : string;
    departmentId? : string;
}
export class EmployeeAccessGroups {
    employeeId? : string;
    accessGroupId? : string;
}