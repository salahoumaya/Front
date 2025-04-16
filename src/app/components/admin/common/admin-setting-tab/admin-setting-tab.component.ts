import { Component } from '@angular/core';
import { routes } from 'src/app/shared/service/routes/routes';

@Component({
  selector: 'app-instructor-setting-tab',
  templateUrl: './admin-setting-tab.component.html',
  styleUrl: './admin-setting-tab.component.scss'
})
export class AdminSettingTabComponent {
  public routes = routes;
}
