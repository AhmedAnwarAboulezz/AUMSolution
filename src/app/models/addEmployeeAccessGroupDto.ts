export class AddEmployeeAccessGroupDto {
    accessGroupId: number;
    employeeId: number;
    isActive: boolean = true;
    functionType?: string;
    id?: number = null;
}

export class AddDeviceAccessGroupDto {
    accessGroupId: number;
    deviceId: string;
    isActive: boolean = true;
    functionType?: string;
    id?: number = null;
}

export class AddDeviceGroupDto {
    groupId: number;
    deviceId: string;
    isActive: boolean = true;
    functionType?: string;
    id?: number = null;
}