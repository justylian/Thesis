import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InitialModule } from './initial/initial.module';
import { UpcomingModule } from './upcoming/upcoming.module';


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InitialModule,
    UpcomingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
