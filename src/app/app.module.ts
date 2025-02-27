import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/module/shared.module';

import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,



  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    CommonModule,
    ReactiveFormsModule,

    FormsModule,
    ReactiveFormsModule,  // ✅ Garder seulement une seule importation
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
