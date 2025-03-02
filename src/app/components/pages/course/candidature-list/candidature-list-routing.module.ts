import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatureListComponent } from './candidature-list.component';


const routes: Routes = [
  { path: '', component: CandidatureListComponent }, // Route par défaut
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CandidatureListRoutingModule {}