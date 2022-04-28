import { Time } from "@angular/common";


export class employeeMessage {
    id?: number;
    message?: string;
    period?: number;
    fromTimeShow?: Time;
    fromDateShow?:Date;
}
export class employeeMessageDetail {
    id?: number;
    employeeMessageId?: number;
    employeeId?: number;
    functionType?:string;
}
