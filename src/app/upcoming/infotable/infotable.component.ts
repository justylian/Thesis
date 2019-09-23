import { LeapService } from './../../services/leap.service';
import { MapboxComponent } from './../mapbox/mapbox.component';
import { PlacesComponent } from './../places/places.component';
import timelinejson from '../../../assets/json/timeline.json';
import upcomingjson from '../../../assets/json/upcoming.json';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
const { getColorFromURL } = require('color-thief-node');
declare var require: any

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-infotable',
  templateUrl: './infotable.component.html',
  styleUrls: ['./infotable.component.scss']
})
export class InfotableComponent implements OnInit {
  citiesFuture=timelinejson.citiesFuture;
  upcoming=upcomingjson;
  arrivaldiff=false;
  public day1="../../../assets/images/weather/"+this.upcoming.weather.day1.state+".png";
  public day2="../../../assets/images/weather/"+this.upcoming.weather.day2.state+".png";
  public day3="../../../assets/images/weather/"+this.upcoming.weather.day3.state+".png";
  public day4="../../../assets/images/weather/"+this.upcoming.weather.day4.state+".png";
  public day5="../../../assets/images/weather/"+this.upcoming.weather.day5.state+".png";

  public Todaymessage=JSON.parse(JSON.stringify(this.upcoming.weather.day1.state));

  constructor(private placesComponent: PlacesComponent,private mapboxComponent:MapboxComponent) {

   /* this.leapService.manageLeap$.subscribe(
      () => {
        //alert('(Component2) Method called!'+i);
        this.nextScroll();
      }
    );



    this.leapService.showHideImages$.subscribe(
      () => {
        //alert('(Component2) Method called!'+i);
        this.showHideImages();
      }
    );*/
  }

  ngOnInit() {
    this.mapboxComponent.focusPin(1);

    if(this.upcoming.flight.arrival.arrivalmonth=== this.upcoming.flight.departure.departuremonth){
      this.arrivaldiff=true;
    }


    if(this.Todaymessage==="Showers"){
      this.Todaymessage="Don't forget your umbrella. It's pouring out there!";
    }
    else if(this.Todaymessage==="Sunny"){
      this.Todaymessage="Sun will shine. Don't forget your sunscreen!";
    }
    else if(this.Todaymessage==="Cloudysunny"){
      this.Todaymessage="Who cares about the clouds when we're together!";
    }
    else{
      this.Todaymessage="Who cares about the clouds when we're together!";
    }
  }


  turn=true;
  public showHideImages():void{
    if(this.turn===true){
      $('#info-frame').fadeOut('slow');
      this.mapboxComponent.hideMap();
      this.placesComponent.manageImagesUpcoming(this.currentImage);
      this.turn=false;
    }
    else{
      $('#info-frame').fadeIn('slow');
      this.mapboxComponent.showMap();
      this.turn=true;

    }


  }

  public nextImageUpcoming(){
    this.placesComponent.nextImageUpcoming();
  }



  currentImage=0;

  public nextScroll():void{
      var prevImage=this.currentImage;
      this.currentImage=++this.currentImage;
      if(this.currentImage===6){
        this.currentImage=1;
      }
      this.mapboxComponent.focusPin(this.currentImage);
      var element = document.getElementById('scroll-places-'+this.currentImage);
      $('#scroll-places-'+prevImage).addClass('deactive').removeClass('active');

      $('#scroll-places-'+this.currentImage).addClass('active').removeClass('deactive');
      console.log(element);
      element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});

  }

  public previousScroll():void{
    var prevImage=this.currentImage;
    this.currentImage=--this.currentImage;
    if(this.currentImage<=0){
      this.currentImage=5;
    }
    this.mapboxComponent.focusPin(this.currentImage);
    var element = document.getElementById('scroll-places-'+this.currentImage);
    $('#scroll-places-'+prevImage).addClass('deactive').removeClass('active');

    $('#scroll-places-'+this.currentImage).addClass('active').removeClass('deactive');
    console.log(element);
    element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});

}

/*
    public getDominantColor(no,imgno):void{
      //var imageURL= document.getElementById('places-image-one');
     // var imageURL=$('#places #places-inner #places-image-one').attr('src');//get img color
      console.log(imageURL);
      (async () => {
        const dominantColor = await getColorFromURL(imageURL);
        var rgb='rgb('+dominantColor[0]+','+dominantColor[1]+','+dominantColor[2]+')';
        $("body").css("--main-timeline-color-"+no+'', 'rgb('+dominantColor[0]+','+dominantColor[1]+','+dominantColor[2]+')');
      })();

    }*/


}



//AUTO RESIZE CITY NAME
$(document).ready(function() {
  var fontSize = 1130/parseInt($("#city-name").text().length)+"px";

  //alert(fontSize);
  $("#city-name").css('font-size', fontSize);


});
/*
$(document).ready(function(){

  var currentheight=0;
  $('#places-inner').on('scroll', function(){
    var height1=$('#places-inner li:nth-child(1) img').height();
    var height2=$('#places-inner li:nth-child(2) img').height();
    var height3=$('#places-inner li:nth-child(3) img').height();
    var height4=$('#places-inner li:nth-child(4) img').height();
    var height5=$('#places-inner li:nth-child(5) img').height();

    //console.log($('#places-inner').scrollTop());
    console.log('scrolling');
    //console.log($('#places-inner li:nth-child(1) img').height());
    //console.log($('#places-inner li:nth-child(2) img').height());
    currentheight=$('#places-inner').scrollTop();
    console.log(currentheight+'vdw'+height1);

    if(currentheight<height1){

      $('#places-inner li').removeClass("active");
      $('#places-inner li:nth-child(1)').addClass("active");
    }
    if(currentheight>=height1 && currentheight<(height1+height2)){
      $('#places-inner li').removeClass("active");
      $('#places-inner li:nth-child(2)').addClass("active");


    }
    if(currentheight>=height1+height2 && currentheight<height1+height2+height3){
      $('#places-inner li').removeClass("active");
      $('#places-inner li:nth-child(3)').addClass("active");
    }
    if(currentheight>=(height1+height2+height3) && currentheight<(height1+height2+height3+height4)){
      $('#places-inner li').removeClass("active");
      $('#places-inner li:nth-child(4)').addClass("active");
    }
    if(currentheight>=(height1+height2+height3+height4) && currentheight<(height1+height2+height3+height4+height5)){
      $('#places-inner li').removeClass("active");
      $('#places-inner li:nth-child(5)').addClass("active");
    }
});
 });*/
