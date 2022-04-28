import { Shell } from './shell';
import { AlertService } from '../services/AlertService';
import { DataService, APIs } from '../services/shared';
import { LocalizationService } from '../services/localization/localization.service';
import { HttpService } from '../services/http/http.service';
export abstract class BaseComponent {

    get localize(): LocalizationService { return Shell.Injector.get(LocalizationService); }
    get alertService(): AlertService { return Shell.Injector.get(AlertService); }
    get service(): HttpService { return Shell.Injector.get(HttpService); }
    //get APIs(): APIs { return Shell.Injector.get(APIs); }
    dir = 'dir';
    constructor() {

    }
}
