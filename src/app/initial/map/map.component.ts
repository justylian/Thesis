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
      showCities(this.timePerCity,this.timePerPhoto,this.delay);

  }

}



function showCities(timePerCity,timePerPhoto,delay) {

  setTimeout(function() {
    for (var i = 1; i <= 6; ++i){
      mapMinify();
      showCitiesTimeout(i,timePerCity,timePerPhoto);
    }
  },delay)




}


var city="city0";
function showCitiesTimeout(i,timePerCity,timePerPhoto) {

  var cityprev;
  var time;


  setTimeout(function() {
    cityprev=city;
    city="city"+i;

    time=i*timePerCity;

    console.log(i);
    console.log(time);
    console.log(cityprev);
    $('#'+cityprev).fadeOut( 400, function() {
    });
    $('#'+city).fadeTo( 600,1, function() {

    }); }, i*timePerCity);
}







function cityNameMinify(timePerCity) {
  //$('#text').html('cda');
  setTimeout(function() {
    $('#text').html('cda');
  },timePerCity)
}



function mapMinify() {
    $(".stage").animate({ width: 260, height: 250, borderRadius: '50%' }, 1000);
    $("#ball-out").animate({ left: 100, top: 50 }, 1000);
    $(".ball-in").animate({ borderRadius: '50%' }, 1000);
    $(".ball-in").css("animation", "move-map-globe 60s infinite linear");
    $("#ballshadow").show(500);

    $("#info-bubble").fadeOut( 600, function() {
    });
    $("#pin-images").fadeOut( 400, function() {
    });

    $(".city-map-name-inner").animate({ left: 0, top: 0 }, 1000);
};

function mapMaximize() {

    $(".stage").animate({ width: 1395, height: 750, borderRadius: '50%' }, 1000);
    $("#ball-out").animate({ left: 165, top: 170 }, 1000);
    $(".ball-in").animate({ borderRadius: '0%' }, 1000);
    $(".ball-in").css("animation", "none");
    $("#ballshadow").hide(500);

};

