import { UserBranch } from './userBranch';

export class UserMangment {
        id?: number;
        isActive?: boolean;
        expireDate?: Date; 
        userBranches?: UserBranch[];
        userName?: string;
        email?:string;
        password?: string;
        roleId?: number;
}
