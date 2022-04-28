import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';


@Pipe({ name: 'filter' })
export class FilterPipe implements PipeTransform {
  transform(value, term) {

    if (!term) return value;
    return value.filter(item =>
      (item != null && item.nameFl != null) ? item.nameFl.toLowerCase().indexOf(term.toLowerCase()) !== -1: '');
  }
}
@Pipe({ name: 'showTimeSpan' })
export class ShowTimeSpanPipe implements PipeTransform {
  transform(timeObj, format, type) {
    if(type == "fromDate")
    {
      return moment(timeObj).format(format);
    }
    return moment(timeObj,"HH:mm").format(format);
  
 }
}

@Pipe({ name: 'auditField' })
export class AuditField implements PipeTransform {
  transform(propName, screenName) {
    screenName = screenName.endsWith("y")? screenName.replace(/.$/, "ies.") : screenName + "s.";
    screenName = screenName[0].toLowerCase()+ screenName.substr(1);
    propName = propName.replace("*", "");
    propName = propName.replace("+", "");
    propName = propName.replace("-", "");  
    propName = propName[0].toLowerCase()+ propName.substr(1);
    propName = propName.endsWith("Id")? propName.replace("Id", "Name") : propName;
    let result = screenName + propName;
     return result;
  }  
 }


@Pipe({ name: 'excludeItem' })
export class ExcludeItemPipe implements PipeTransform {
    transform(listData: any[], filterId): any {
        if (!listData || !filterId || listData.length == 0) {
            return listData;
        }
        listData = listData.filter(a=>a.id !== filterId);
        return listData
    }
  }


@Pipe({ name: 'getCheckedItem' })
export class GetCheckedItemPipe implements PipeTransform {
    transform(listData: string, index, second): boolean {
        if (!listData || index == null || second == null ) return false;
        let listSplit = listData.split('');
        if(listSplit.length == 0) return false;
        let itemByindex = [listSplit[index*2], listSplit[(index*2) + 1]];
        if(itemByindex == null || itemByindex == undefined) return false;
        let res = +itemByindex[second];
        if(res == 0) return false;
        else if(res == 1) return true;
    }
  }