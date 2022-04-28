export class Group {
    id?: number;
    code?: string;
    groupFL?: string;
    groupSL?: string;
    active?: boolean;
}
export class GroupEmployee {
    id?: number;
    employeeId?: number;
    groupId?: number;
    expireDate?: Date;
 
}