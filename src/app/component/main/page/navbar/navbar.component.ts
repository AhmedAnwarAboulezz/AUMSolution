import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Shell } from 'src/app/component/shell';
import { AuthService } from 'src/app/services/auth.service';
import { LocalizationService } from 'src/app/services/localization/localization.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  profileModel: any = {};
  userBranches: any[];
  selectedBranch:any;
  disableBranches:boolean=false;
  lang;
  get Localize(): LocalizationService { return Shell.Injector.get(LocalizationService); }
  get Storage(): StorageService { return Shell.Injector.get(StorageService); }
  get Router(): Router { return Shell.Injector.get(Router); }
  get AuthService(): AuthService { return Shell.Injector.get(AuthService); }
  
  constructor() { 

  }

  ngOnInit(): void {
    this.selectedBranch= Number(this.Storage.get("currentBrach"));
    if(this.AuthService.currentUser.IsSuperAdmin == "False")
    {
      this.GetUserBranches();

    }
  }


  toggleSidebar(): void {
    const item = document.querySelector('.sidebar');
    item.classList.toggle('collapsed');
  }


  setLanguage(lang: string): void {
    this.lang = lang;
    this.Localize.changeLang(lang);
    this.Storage.set('language', lang);
    this.Storage.removeStorgeByKey('TheTree');

  }
  goToProfile(): void {
    //window.location.href = this.Config.getAppUrl('MY-PROFILE');
  }

  async logout() {
    // this.Service.setUserIsLogedOut().subscribe(async (res: any) => {
    //   await this.authService.logout();
    // }, async error => {
    //   await this.authService.logout();
    // });
    await this.AuthService.logout();
    this.Storage.removeStorgeByKey('cardsLastUpdate');
    this.Storage.removeStorgeByKey('homeData');
    this.Storage.removeStorgeByKey('TheTree');
    let organization = JSON.parse(this.Storage.get('Organizations_data'));
    organization !== null ? await this.Router.navigate(['/login'], { queryParams: { code: organization.code } }) :
    await this.Router.navigate(['/login']);
  }
  GetUserBranches(){
    //console.log("currentBrach",this.Storage.get("currentBrach") )
    this.AuthService.GetUserBranches()
      .subscribe(result => {
        this.userBranches = result;
        if (this.userBranches.length > 0  ){
       if( this.userBranches.map(x=>x.id).indexOf( Number(this.Storage.get("currentBrach"))) == -1)
          this.selectedBranch=this.userBranches[0].id;
          this.Storage.set("currentBrach", this.selectedBranch);
        }
        if (this.userBranches.length == 1)
        this.disableBranches=true;
        else
        this.disableBranches=false;
      });
  }
  changeBranch(event){
    this.Storage.set("currentBrach", this.selectedBranch);
     this.Router.navigateByUrl('/login', { skipLocationChange: true }).then(() => {
      this.Router.navigate(['main']);
  }); 
  }
}


