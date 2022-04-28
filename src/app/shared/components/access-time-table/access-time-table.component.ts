import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Shell } from 'src/app/component/shell';
import { AlertService } from 'src/app/services/AlertService';
import { LocalizationService } from 'src/app/services/localization/localization.service';

@Component({
  selector: 'app-access-time-table',
  templateUrl: './access-time-table.component.html',
  styleUrls: ['./access-time-table.component.scss']
})

export class AccessTimeTableComponent implements OnInit {
  @Input() daysCodes: string[] = [];
  @Input() groupRightsId: number;
  @Output() fillTable: EventEmitter<any> = new EventEmitter<any>();
  times = [
    '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16',
    '17', '18', '19', '20', '21', '22', '23'
  ];
  mintuesMin = ['00','30'];
  mintuesMax = ['29','59'];
  days = [];
  daysOfWeek: day[] = [];
  fromHour: any;
  fromMin: any;
  toHour: any;
  toMin: any;
  daysReset: boolean[] = [false, false,false, false,false, false,false, false];
  dayIds = [];
  dayCodeArrays: boolean[][][];

  get Alert(): AlertService { return Shell.Injector.get(AlertService); }
  get localize(): LocalizationService { return Shell.Injector.get(LocalizationService); }
  constructor() {
    if (this.localize.lang == 'en') {
      this.days = [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
        'Friday', 'Saturday', 'Restday'
      ];
    } else {
      this.days = [
        'الأحد', 'الأثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعه',
        'السبت', 'العطلة',
      ];
    }
    for (var i=0; i<this.days.length; i++) {      
      this.daysOfWeek.push({ name: this.days[i], value: i, isChecked: false });
    }
  }

  ngOnInit() {
    if(this.daysCodes == null || this.daysCodes == undefined || this.daysCodes.length !== 8){
      this.daysCodes = [
        "000000000000000000000000000000000000000000000000",
        "000000000000000000000000000000000000000000000000",
        "000000000000000000000000000000000000000000000000",
        "000000000000000000000000000000000000000000000000",
        "000000000000000000000000000000000000000000000000",
        "000000000000000000000000000000000000000000000000",
        "000000000000000000000000000000000000000000000000",
        "000000000000000000000000000000000000000000000000"
      ];
    }
    for(var i = 0; i<this.daysCodes.length; i++){
      if(this.daysCodes[i] == "111111111111111111111111111111111111111111111111"){
        
        this.daysReset[i] = true;
      }
    }
    //this.getTableDraw();
  }




  onChange(i,event){
    if(event) {
      this.daysOfWeek.find(a=>a.value == i).isChecked = true; 
    } 
    else{
      this.daysOfWeek.find(a=>a.value == i).isChecked = false;
    } 
  }

  getTableDraw(){
    this.dayCodeArrays = [];
    this.daysCodes.forEach(element => {
      let sundayCodeArray1 = [];
      let sundayCodeArray2 = [];
      let sundayCodeArray = [];
      let rrr = element.split('');
      for(var i=0; i< rrr.length; i++){
        let element = rrr[i];
        if(i % 2 == 0){
          if(+element == 1) sundayCodeArray1.push(true);
          if(+element == 0) sundayCodeArray1.push(false);
        }
        else{
          if(+element == 1) sundayCodeArray2.push(true);
          if(+element == 0) sundayCodeArray2.push(false);  
        }
      }
      for(var i=0; i < rrr.length / 2; i++){
        sundayCodeArray.push([sundayCodeArray1[i],sundayCodeArray2[i]]);
      }
      this.dayCodeArrays.push(sundayCodeArray);
    });
  }


 


  Apply(){
    let selectedDays = this.daysOfWeek.filter(a=>a.isChecked == true).map(a=>a.value);

    if(!this.validation(selectedDays)){
       return false;
    }
    selectedDays.forEach(element => {
      this.getBinaryFromDayAndTime(element,this.fromHour,this.fromMin, this.toHour, this.toMin);
    });
  }

  validation(selectedDays : any[]) : boolean{
    if(selectedDays.length == 0){
      this.Alert.showError(this.localize.translate.instant('Message.requireDay'));
      return false;
    }
    if(this.fromHour == undefined || this.fromMin == undefined || this.toHour == undefined || this.toMin == undefined){
      this.Alert.showError(this.localize.translate.instant('Message.requireTime'));
      return false;
    }
    return true;
  }

  resetAllTable(){
    let emptyChecked = this.generateString(48, '0');
    for(var i =0; i< this.daysCodes.length; i++)
    {
      this.daysCodes[i]= emptyChecked;
      this.daysReset[i] = false;
    }
  }

  resetDay(dayIndex, event){
    let emptyChecked = '';
    if(event) emptyChecked = this.generateString(48, '1');
    else emptyChecked = this.generateString(48, '0');
    this.daysCodes[dayIndex]= emptyChecked;
    this.daysReset[dayIndex] = event;
  }

  getBinaryFromDayAndTime(selectedDay,fromHr,fromMin, toHr, toMin){
    let oldDayCode = this.daysCodes[+selectedDay];
    let fromHrIndex = this.times.findIndex(x => x === fromHr);
    let toHrIndex = this.times.findIndex(x => x === toHr);
    let fromMinIndex = this.mintuesMin.findIndex(x => x === fromMin);
    let toMinIndex =  toMin == '29' ? 1 : 2;
    let fromIndex = (fromHrIndex*2) + fromMinIndex;
    let toIndex = (toHrIndex*2) + toMinIndex;
    if(toIndex < fromIndex){
      this.Alert.showError(this.localize.translate.instant('Message.timeValidation')); 
      return false;
    }
    let iii = this.generateString(toIndex - fromIndex, '1');
    this.daysCodes[+selectedDay] = oldDayCode.replaceBetween(fromIndex, toIndex, iii); 
    if(this.daysCodes[+selectedDay] == "111111111111111111111111111111111111111111111111"){
      this.daysReset[+selectedDay] = true;
    }
  }

  generateString(length : number, randomChars:string) {
    let result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(0);
    }
    return result;
  }


  onCheckDay(dayIndex,timeIndex,halfIndex,event){
    let fromIndex = timeIndex*2+halfIndex;
    let toIndex = fromIndex+1;
    if(event){
      this.daysCodes[+dayIndex] = this.daysCodes[+dayIndex].replaceBetween(fromIndex,toIndex,"1");
      if(this.daysCodes[+dayIndex] == "111111111111111111111111111111111111111111111111"){
        this.daysReset[+dayIndex] = true;
      }
    }
    else{
      this.daysCodes[+dayIndex] = this.daysCodes[+dayIndex].replaceBetween(fromIndex,toIndex,"0");
      this.daysReset[+dayIndex] = false;
    }
  }


  save(){
    let result = [];
    for(var i = 0; i<this.daysCodes.length; i++){
        let resItem = new AccessTime();
        resItem.weekDayId = i;
        resItem.timePattern =this.daysCodes[i];
        resItem.accessGroupId = +this.groupRightsId;
        result.push(resItem);
    }
    this.fillTable.emit(result);

  }
  

}

declare global {
  interface String {
    replaceBetween(start, end, what): string;
  }
}
String.prototype.replaceBetween = function(start, end, what) {
  return this.substring(0, start) + what + this.substring(end);
};
interface day {
  name;
  value;
  isChecked;
}

export class AccessTime{
  timePattern?:string;
  accessGroupId?:number;
  weekDayId:number;
}