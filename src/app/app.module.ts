import { AppstateService } from './services/appstate.service';
import { AwayModule } from './away/away.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InitialModule } from './initial/initial.module';
import { UpcomingModule } from './upcoming/upcoming.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MobileComponent } from './routes/mobile/mobile.component';
import { DesktopComponent } from './routes/desktop/desktop.component';
@NgModule({
  declarations: [
    AppComponent,
    MobileComponent,
    DesktopComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InitialModule,
    UpcomingModule,
    AwayModule,
    HttpClientModule
  ],
  entryComponents: [DesktopComponent,MobileComponent],

  providers: [AppComponent,DesktopComponent,MobileComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
