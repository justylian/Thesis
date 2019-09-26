import { POIService } from './services/poi.service';
import { PlacesService } from './services/places.service';
import { ImagesService } from './services/images.service';
import { AwayModule } from './away/away.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChoiceService }from './services/choice.service';
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
  providers: [AppComponent,ChoiceService,ImagesService,PlacesService,POIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
