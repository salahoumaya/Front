import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/shared/service/common/common.service';
import { DataService } from 'src/app/shared/service/data/data.service';
import { SidebarService } from 'src/app/shared/service/sidebar/sidebar.service';
import { routes } from 'src/app/shared/service/routes/routes';
import { SidebarItem } from 'src/app/models/model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public routes = routes;
  @ViewChild('stickyMenu')
  menuElement!: ElementRef;
  headerpage = false;
  sticky = false;
  elementPosition!: number;
  public headerClass = true;
  base = '';
  page = '';
  last = '';
  headerMenuactive = '';
  public showDark = false;

  public white_bg = false;

  sidebar: SidebarItem[];
  constructor(
    private common: CommonService,
    private data: DataService,
    private sidebarService: SidebarService
  ) {
    this.common.base.subscribe((res: string) => {
      this.base = res;
    });
    this.common.page.subscribe((res: string) => {
      this.page = res;
    });
    this.common.last.subscribe((res: string) => {
      this.last = res;
    });
    this.sidebar = this.data.sideBar;
    this.sidebarService.showDark.subscribe((res: string | boolean) => {
      if (res == 'true') {
        this.showDark = true;
      } else {
        this.showDark = false;
      }
    });
  }

  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    const windowScroll = window.pageYOffset;
    if (windowScroll >= this.elementPosition) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
    if (windowScroll == 0) {
      this.white_bg = false;
    } else {
      this.white_bg = true;
    }
  }

  public toggleSidebar(): void {
    this.sidebarService.openSidebar();
  }
  public hideSidebar(): void {
    this.sidebarService.closeSidebar();
  }
  themeMode: string = 'light_mode';
  isDarkMode: boolean = false;
  // toggleMode(isDark: boolean) {
  //   this.isDarkMode = isDark;
  //   this.applyTheme();
  // }

  applyTheme() {
    if (this.isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }
  public themeChange(): void {
    this.sidebarService.themeColor();
    this.applyTheme();
  
  }
 
 
}
