import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InitialModule } from './initial/initial.module';
import { InfotableComponent } from './upcoming/infotable/infotable.component';

@NgModule({
  declarations: [
    AppComponent,
    InfotableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InitialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
