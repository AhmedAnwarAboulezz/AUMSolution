export class organizationSetting {
    id? : number ;
    chooseAutoSync?:number;
    organizationSettingGroups?: OrganizationSettingGroup[];
}
export class OrganizationSettingGroup{
    id? : number;
    groupId?:number
    organizationSettingId?:number
}

