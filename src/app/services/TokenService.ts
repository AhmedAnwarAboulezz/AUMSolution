import { Injectable } from '@angular/core';
import { LocalizationService } from './localization/localization.service';
import { Shell } from '../component/shell';
import { DataService } from './data.service';
import { ConfigService } from 'ngx-envconfig';
import { StorageService } from './storage/storage.service';


@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly JWT_TOKEN = 'token';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  get localize(): LocalizationService { return Shell.Injector.get(LocalizationService); }
  //get Storage(): StorageService { return Shell.Injector.get(StorageService); }

  constructor(
    private service: DataService, 
    private configService: ConfigService,
    public Storage: StorageService
    ) 
  {   
   }
   async refreshToken() {
    let serverUrl = this.configService.get('host');
    let tokens: Tokens ={
      token: this.getJwtToken(),
      refreshToken: this.getRefreshToken()
    }
    let refreshtokens: Tokens = await this.service.post(serverUrl+'Accounts/RefreshToken/refresh-token',tokens).toPromise();
    this.storeJwtToken(refreshtokens.token);
    return refreshtokens;
  }

  getJwtToken() {
    return this.Storage.get(this.JWT_TOKEN);
  }
   getRefreshToken() {
    return this.Storage.get(this.REFRESH_TOKEN);
  }
   storeJwtToken(jwt: string) {
    this.Storage.set(this.JWT_TOKEN, jwt);
  }

   storeTokens(tokens: Tokens) {
    this.Storage.set(this.JWT_TOKEN, tokens.token);
    this.Storage.set(this.REFRESH_TOKEN, tokens.refreshToken);
  }

   removeTokens() {
    this.Storage.removeStorgeByKey(this.JWT_TOKEN);
    this.Storage.removeStorgeByKey(this.REFRESH_TOKEN);
  }
  

 
}

export class Tokens{
  token?:string;
  refreshToken?:string;
  message?:string;
  errorType?: number;
}


