import { Component } from '@angular/core';
import { Shell } from 'src/app/component/shell';
import { AuthService } from 'src/app/services/auth.service';
import { LocalizationService } from 'src/app/services/localization/localization.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  lang;
  get Localize(): LocalizationService { return Shell.Injector.get(LocalizationService); }
  get Storage(): StorageService { return Shell.Injector.get(StorageService); }
  activeTab;
  get AuthService(): AuthService { return Shell.Injector.get(AuthService); }

  constructor(public authService: AuthService) 
  {
    this.getScreenAuthorities();

  }


  getScreenAuthorities() {
    this.authService.loadScreenAuthorities();
  }
  setLanguage(lang: string): void {
    this.lang = lang;
    this.Localize.changeLang(lang);
    this.Storage.set('language', lang);
    console.log('language', this.Localize.lang);
  }

  setActive(tabTab) {
    this.activeTab = this.activeTab === tabTab ? '' : tabTab;
    this.showCollapsed();
  }

  showCollapsed() {
    setTimeout(() => {
      const itemCollapsed = document.querySelector('.collapsed');
      if(itemCollapsed !== undefined && itemCollapsed !== null){
        this.toggleSidebar();
      }  
      const accordions = document.querySelectorAll(".collapse-wrapper");
      
      const openAccordion = (accordion: any) => {
        console.log("accordions : ", accordions);
        accordion.style.height = accordion.scrollHeight + "px";
      };

      const closeAccordion = (accordion: any) => {
        accordion.style.height = '0';
      };

      accordions.forEach((accordion) => {
        const showContent = accordion.querySelector(".showContent");
        const content = accordion.querySelector(".contentCollapsed");

        if (showContent) {
          openAccordion(content);
        } else {
          closeAccordion(content);
        }
      });
    });
  }

  toggleSidebar(): void {
    const item = document.querySelector('.sidebar');
    item.classList.toggle('collapsed');
  }
  
}
