import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormationComponent } from './formation.component';
import { FormationsRoutingModule } from './formations-routing.module';
import { SharedModule } from 'primeng/api';
import { FeatherIconModule } from 'src/app/shared/module/feather.module';



@NgModule({
  declarations: [
    FormationComponent
  ],
  imports: [
    CommonModule,
    FormationsRoutingModule,
    FormsModule,
      FeatherIconModule,
        SharedModule,
  ]
})
export class FormationModule { }
