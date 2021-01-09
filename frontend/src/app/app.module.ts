import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatInputModule, MatButtonModule, MatCheckboxModule } from '@angular/material'
import { FormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component'
import { ApiService } from './api.service'

@NgModule({
  declarations: [
    AppComponent],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    HttpClientModule
  ],
  providers: [ApiService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
