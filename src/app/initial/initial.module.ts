import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './timeline/timeline.component';
import { MusicComponent } from './music/music.component';
import { MapComponent } from './map/map.component';
import { ImagesComponent } from './images/images.component';




@NgModule({
  declarations: [TimelineComponent, MusicComponent, MapComponent, ImagesComponent],
  exports:[TimelineComponent, MusicComponent, MapComponent, ImagesComponent],
  imports: [
    CommonModule
  ]
})
export class InitialModule { }
