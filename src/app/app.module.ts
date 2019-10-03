import { SocketService } from './services/socket.service';

import { AwayModule } from './away/away.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InitialModule } from './initial/initial.module';
import { UpcomingModule } from './upcoming/upcoming.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InitialModule,
    UpcomingModule,
    AwayModule,
    HttpClientModule
  ],
  providers: [AppComponent,SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
