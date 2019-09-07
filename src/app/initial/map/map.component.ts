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



  public manageInitialMax(timelineno){
        //console.log(cityLoc.left);
        mapMaximize();

  }
  public manageInitialMin(timelineno){

      var cityName=findCityName(timelineno,this.citiesPast,this.citiesFuture);//change city name
      findCityLoc(timelineno,this.citiesPast,this.citiesFuture,cityName);//change pin

      setTimeout(function() {

          //console.log(cityLoc.left);
          mapMinify();
      },3000)
  }
}


function changeCityNamePin(cityName,cityLocLeft,cityLocTop){
  $('.city-map-name-inner').fadeOut( 400, function() {
    $('.city-map-name-inner').text(cityName);
    $('.city-map-name-inner').fadeTo( 200,1, function() {

    });
  });

  $('#pin-images').fadeOut( 400, function() {
    $('#pin-images').animate({ left: cityLocLeft, top: cityLocTop}, 0);
    $('#pin-images').fadeTo( 200,1, function() {
    });
  });
}

function findCityName(timelineno,citiesPast,citiesFuture){
  if(timelineno===1){
    return citiesPast[0].cityName;
  }
  else if(timelineno===2){
    return citiesPast[1].cityName;
  }
  else if(timelineno===3){
    return citiesPast[2].cityName;
  }
  else if(timelineno===4){
    return citiesPast[3].cityName;
  }
  else if(timelineno===5){
    return citiesPast[4].cityName;
  }
  else{
    return citiesFuture[0].cityName;
  }
}

function findCityLoc(timelineno,citiesPast,citiesFuture,cityName){
  var cityLocLeft;
  var cityLocTop;
  if(timelineno===1){
    cityLocLeft=citiesPast[0].cityLocation.left;
    cityLocTop=citiesPast[0].cityLocation.top;
  }
  else if(timelineno===2){
    cityLocLeft=citiesPast[1].cityLocation.left;
    cityLocTop=citiesPast[1].cityLocation.top;  }
  else if(timelineno===3){
    cityLocLeft=citiesPast[2].cityLocation.left;
    cityLocTop=citiesPast[2].cityLocation.top;  }
  else if(timelineno===4){
    cityLocLeft=citiesPast[3].cityLocation.left;
    cityLocTop=citiesPast[3].cityLocation.top;  }
  else if(timelineno===5){
    cityLocLeft=citiesPast[4].cityLocation.left;
    cityLocTop=citiesPast[4].cityLocation.top;  }
  else{
    cityLocLeft=citiesFuture[0].cityLocation.left;
    cityLocTop=citiesFuture[0].cityLocation.top;
  }
  changeCityNamePin(cityName,cityLocLeft,cityLocTop);
}









function initialCitiesFunc(timePerCity,timePerPhoto,delay){
  setTimeout(function() {
    showCities(timePerCity,timePerPhoto,delay);
  },delay)
}


function showCities(timePerCity,timePerPhoto,delay) {

  mapMinify();

    for (var i = 1; i <= 6; ++i){
      showCitiesTimeout(i,timePerCity,timePerPhoto,delay);
    }
}


var city="city0";
function showCitiesTimeout(i,timePerCity,timePerPhoto,delay) {

  var cityprev;
  var time;
  setTimeout(function() {
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

var mapState=false;

function mapMinify() {
  //$(".city-map-name-inner").animate({  top: 0 ,left:-50,fontSize:90}, 300);
      //$(".city-map-name-inner").animate({ left: 3000}, 500);
      $(".city-map-name-inner").fadeOut( 400, function() {
      });
      //$(".city-map-name-inner").animate({ top: 20,left:-1700,fontSize:90}, 1500);

      $(".stage").animate({ width: 180, height: 170, borderRadius: '50%' }, 1000);
      $("#ball-out").animate({ left: 10, top: 0 }, 1000);
      $(".ball-in").animate({ borderRadius: '50%' }, 1000);
      $(".ball-in").css("animation", "move-map-globe 60s infinite linear");


      /*$("#info-bubble").fadeOut( 600, function() {
      });*/
      $("#pin-images").fadeOut( 400, function() {
      });
      $("#ballshadow").show(500);

};

function mapMaximize() {

    //$(".city-map-name-inner").animate({ left: -150}, 1000);
    $(".city-map-name-inner").fadeTo( 1500,1, function() {
    });
    //$(".city-map-name-inner").animate({ top: 200,left:-150,fontSize:200}, 1500);

    $(".stage").animate({ width: 1395, height: 750, borderRadius: '0%' }, 1000);
    $("#ball-out").animate({ left: 165, top: 170 }, 1000);
    $(".ball-in").animate({ borderRadius: '0%' }, 1000);
    $(".ball-in").css("animation", "none");

   /* $("#info-bubble").fadeTo( 600,1, function() {
    });*/
    $("#pin-images").fadeTo( 1400,1,function() {
    });
    $("#ballshadow").hide(500);

};

