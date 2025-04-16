import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminViewComponent} from "./admin-view.component";
import {AdminGridComponent} from "./admin-grid/admin-grid.component";

const routes: Routes = [
  {
    path: '',
    component: AdminViewComponent,
    children: [
      {
        path: 'admin-grid',
        component: AdminGridComponent,
      }
      // ,
      // {
      //   path: 'instructor-list',
      //   component: InstructorListComponent,
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructorViewRoutingModule {
}
