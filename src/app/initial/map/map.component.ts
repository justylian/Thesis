import { InfobubbleComponent } from './../infobubble/infobubble.component';
import { Component, OnInit } from '@angular/core';
declare var $: any;
declare var jQuery: any;
import timelinejson from '../../../assets/json/timeline.json';
import timesjson from '../../../assets/json/times.json';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  citiesPast=timelinejson.citiesPast;
  citiesFuture=timelinejson.citiesFuture;
  timePerCity=timesjson.timePerCity;
  timePerPhoto=timesjson.timePerPhoto;
  delay=timesjson.delay;


  constructor() { }

  ngOnInit() {
    //initialCitiesFunc(this.timePerCity,this.timePerPhoto,this.delay);

  }


  public futureCitySlideshowMap(){
    mapMinify();

  }
}

function initialCitiesFunc(timePerCity,timePerPhoto,delay){
  setTimeout(function() {
    showCities(timePerCity,timePerPhoto,delay);
  },delay)
}


function showCities(timePerCity,timePerPhoto,delay) {

  mapMinify();

    for (var i = 1; i <= 6; ++i){
      //console.log("minifying");
      showCitiesTimeout(i,timePerCity,timePerPhoto,delay);

    }
}


var city="city0";
function showCitiesTimeout(i,timePerCity,timePerPhoto,delay) {

  var cityprev;
  var time;
  setTimeout(function() {
       mapMaximize();



    cityprev=city;
    city="city"+i;

    //time=i*timePerCity;

    console.log(i*timePerCity);
    //console.log(time);
    //console.log(cityprev);
    $('#'+cityprev).fadeOut( 400, function() {
      $('#'+city).fadeTo( 600,1, function() {
      });
    });

    mapMinify();

   }, i*timePerCity);
}





/*

function cityNameMinify(timePerCity) {
  //$('#text').html('cda');
  setTimeout(function() {
    $('#text').html('cda');
  },timePerCity)
}*/



function mapMinify() {

    $(".stage").animate({ width: 210, height: 200, borderRadius: '50%' }, 1000);
    $("#ball-out").animate({ left: 50, top: 20 }, 1000);
    $(".ball-in").animate({ borderRadius: '50%' }, 1000);
    $(".ball-in").css("animation", "move-map-globe 60s infinite linear");


    $("#info-bubble").fadeOut( 600, function() {
    });
    $("#pin-images").fadeOut( 400, function() {
    });
    $("#ballshadow").show(500);
    setTimeout(function() {
      $(".city-map-name-inner").animate({  top: -400 }, 600);
      //$(".city-map-name-inner").animate({fontSize:90}, 200);
    },200)

};

function mapMaximize() {

    $(".stage").animate({ width: 1395, height: 750, borderRadius: '0%' }, 1000);
    $("#ball-out").animate({ left: 165, top: 170 }, 1000);
    $(".ball-in").animate({ borderRadius: '0%' }, 1000);
    $(".ball-in").css("animation", "none");

    $("#info-bubble").fadeTo( 600,1, function() {
    });
    $("#pin-images").fadeTo( 400,1,function() {
    });
    $("#ballshadow").hide(500);
    setTimeout(function() {
      $(".city-map-name-inner").animate({  top: 0 }, 600);
      //$(".city-map-name-inner").animate({fontSize:90}, 200);
    },200)

};

