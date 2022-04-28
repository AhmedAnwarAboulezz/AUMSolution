export class AddEmployeeGroupsDto {
    groupId: number;
    employeeId: number;
    isActive: boolean = true;
    id?: number = null;
    expireDate?:Date;
}