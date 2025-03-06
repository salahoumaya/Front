import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamenComponent } from './examen.component';
import { ExamenRoutingModule } from './examen-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeatherIconModule } from 'src/app/shared/module/feather.module';
import { SharedModule } from 'primeng/api';


@NgModule({
  declarations: [
    ExamenComponent
  ],
  imports: [
    CommonModule,
    ExamenRoutingModule,
    FormsModule,
    ReactiveFormsModule,
      FeatherIconModule,
        SharedModule,
  ]
})
export class ExamenModule { }
