import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidatureListComponent } from './candidature-list.component';
import { CandidatureListRoutingModule } from './candidature-list-routing.module'; 


@NgModule({
  declarations: [CandidatureListComponent],
  imports: [
    CommonModule,
    CandidatureListRoutingModule // Importez le module de routage
  ]
})
export class CandidatureListModule {}