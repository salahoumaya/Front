import {Component, OnInit} from '@angular/core';
import {CommonService} from 'src/app/shared/service/common/common.service';
import {routes} from 'src/app/shared/service/routes/routes';
import {AuthService} from "../../../../shared/service/Auth/auth.service";

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.scss',
})
export class AdminSidebarComponent implements OnInit {
  public routes = routes;
  public base = '';
  public page = '';
  public last = '';
  public userProfile: any = {}

  constructor(private common: CommonService, private authService: AuthService) {
    this.common.base.subscribe((base: string) => {
      this.base = base;
    });
    this.common.page.subscribe((page: string) => {
      this.page = page;
    });
    this.common.last.subscribe((last: string) => {
      this.last = last;
    });
  }

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile() {
    this.authService.getProfile().subscribe({
      next: (response) => {
        console.log('📥 Détails de ourUsers :', response.ourUsers);

        this.userProfile = response.ourUsers;

      },
      error: (error) => {
        console.log('❌ Erreur lors de la récupération des données utilisateur :', error);

      }
    });
  }
}
