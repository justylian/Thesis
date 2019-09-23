import { MapawayComponent } from './../mapaway/mapaway.component';
import { Component, OnInit } from '@angular/core';
import timelinejson from '../../../assets/json/timeline.json';
declare var Load: any;
declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-imagesaway',
  templateUrl: './imagesaway.component.html',
  styleUrls: ['./imagesaway.component.scss']
})
export class ImagesawayComponent implements OnInit {
  citiesFuture=timelinejson.citiesFuture;

  constructor(private mapawayComponent:MapawayComponent) { }

  ngOnInit() {
  }

  turn=true;
  public showImage(){
    if(this.turn===true){
      this.mapawayComponent.mapMinify();
      $("#away #image-main").show();
      $("#away #image-main #cityImages6").show();
      $("#away #image-main").fadeIn( 400, function() {});
      $("#away #image-main #cityImages6").fadeIn( 400, function() {});
      this.turn=false;
    }
    else{
      this.mapawayComponent.mapMaximize();
      $("#away #image-main").hide();
      $("#away #image-main #cityImages6").hide();
      $("#away #image-main").fadeOut( 400, function() {});
      $("#away #image-main #cityImages6").fadeOut( 400, function() {});
      this.turn=true;

    }


  }
}
