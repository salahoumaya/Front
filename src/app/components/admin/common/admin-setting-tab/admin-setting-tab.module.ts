import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSettingTabComponent } from '././admin-setting-tab.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AdminSettingTabComponent],
  imports: [CommonModule, RouterModule],
  exports: [AdminSettingTabComponent],
})
export class AdminSettingTabModule {}
