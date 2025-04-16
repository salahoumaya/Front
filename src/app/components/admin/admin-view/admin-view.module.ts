import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from 'src/app/shared/module/shared.module';
import {AdminViewComponent} from "./admin-view.component";
import {AdminGridComponent} from "./admin-grid/admin-grid.component";
import {AdminRoutingModule} from "../admin-routing.module";


@NgModule({
  declarations: [
    AdminViewComponent,
    AdminGridComponent,
    // InstructorListComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminViewModule {
}
