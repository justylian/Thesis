import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from './messages/messages.component';
import { ImagesawayComponent } from './imagesaway/imagesaway.component';
import { MapawayComponent } from './mapaway/mapaway.component';



@NgModule({
  declarations: [ MessagesComponent, ImagesawayComponent, MapawayComponent],
  imports: [
    CommonModule
  ],
  exports:[MapawayComponent, MessagesComponent, ImagesawayComponent],
  providers: [MapawayComponent, MessagesComponent, ImagesawayComponent],

})
export class AwayModule { }
