import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './timeline/timeline.component';
import { MusicComponent } from './music/music.component';
import { MapComponent } from './map/map.component';
import { ImagesComponent } from './images/images.component';
import { InfobubbleComponent } from './infobubble/infobubble.component';



@NgModule({
  declarations: [TimelineComponent, MusicComponent, MapComponent, ImagesComponent, InfobubbleComponent],
  exports:[TimelineComponent, MusicComponent, MapComponent, ImagesComponent,InfobubbleComponent],
  imports: [
    CommonModule
  ],
  providers: [TimelineComponent, MusicComponent, MapComponent, ImagesComponent,InfobubbleComponent],


})
export class InitialModule { }
