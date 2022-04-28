export class Trigger {
    id?:number;
    triggerTypeId?: number;
    triggerName?: number;
    isEnabled?:boolean = true;
    triggerDevice?: TriggerDevices[];

}
export class TriggerDevices {
    triggerId: number;
    deviceId: string;

}
export class AddTriggerDevicesDto {
    triggerId: number;
    deviceId: string;
    isActive: boolean = true;
    functionType?: string;
    id?: number = null;
}