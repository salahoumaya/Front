import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiplomeRoutingModule } from './examen-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeatherIconModule } from 'src/app/shared/module/feather.module';
import { SharedModule } from 'primeng/api';
import { DiplomeComponent } from './diplome.component';



@NgModule({
  declarations: [
    DiplomeComponent
  ],
  imports: [
    CommonModule,
    DiplomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
      FeatherIconModule,
        SharedModule,
  ]
})
export class DiplomeModule { }
