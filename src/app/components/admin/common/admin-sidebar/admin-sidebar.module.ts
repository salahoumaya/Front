import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSidebarComponent } from './admin-sidebar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AdminSidebarComponent],
  imports: [CommonModule, RouterModule],
  exports: [AdminSidebarComponent],
})
export class AdminSidebarModule {}
