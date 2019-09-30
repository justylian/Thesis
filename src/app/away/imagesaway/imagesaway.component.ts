import { UpcomingService } from './../../services/upcoming.service';
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
  images ;
  once1=true;
  allfound=false;
  constructor(private mapawayComponent:MapawayComponent, private upcomingService: UpcomingService) {
    this.upcomingService.images$.subscribe(i => {
      //alert('(Component2) Method called!'+i);
      if (this.once1 === true) {
        this.images = i;
        //console.log(this.images);

        this.once1 = false;
      }
    });
    this.upcomingService.found$.subscribe(allfound => {
      //alert('(Component2) Method called!'+i);
      //console.log(l);
      this.allfound = allfound;
    });
  }
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
