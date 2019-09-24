import { Component, OnInit } from '@angular/core';
import timelinejson from '../../../assets/json/timeline.json';
import upcomingjson from '../../../assets/json/upcoming.json';  
declare var require: any

declare var Load: any;
declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-mapaway',
  templateUrl: './mapaway.component.html',
  styleUrls: ['./mapaway.component.scss']
})
export class MapawayComponent implements OnInit {
  citiesFuture=timelinejson.citiesFuture;
  arrivaldiff=false;
  remainingDays:number;
  upcoming=upcomingjson;
  dist:number;

  constructor() {
    this.dist=this.mapboxDistance();
    this.remainingDays=this.getRemainingdays(this.remainingDays);


   }

  ngOnInit() {
  }




  public mapboxDistance(){

    var coordinates=[12.486, 41.89]; //Rome as start
    var MapboxClient = require('mapbox');
    var client = new MapboxClient('pk.eyJ1IjoieGVuYWtpcyIsImEiOiJjanczdDBpMHAwZWgzM3lrbW9xaDVpNnlzIn0.9O8d2q7A_DUaGbswoygSTA');
    
    client.geocodeForward(this.citiesFuture[0].cityName, function(err, data, res) {
      coordinates = data.features[0].center;
      console.log(coordinates);

    });
    
        // tslint:disable-next-line: align

    this.dist=this.distance(coordinates[0],coordinates[1], 35.337211, 25.124940, "K")
    var distsub=this.dist;
    distsub=parseInt(distsub.toPrecision(8));
    //console.log(distsub);

    return distsub;
  }
   



  public distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    }
    else {
      var radlat1 = Math.PI * lat1/180;
      var radlat2 = Math.PI * lat2/180;
      var theta = lon1-lon2;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit=="K") { dist = dist * 1.609344 }
      if (unit=="N") { dist = dist * 0.8684 }
      return dist;
    }
  }


/* -------------- Remaining days --------------- */ 
public getRemainingdays(remainingDays){
  var today = new Date();
  var dd = today.getDate();
  var mm =today.getMonth()+1;
  var yyyy = today.getFullYear();

  var todaystring = mm + '/' + dd + '/' + yyyy;

  var str=this.upcoming.flight.arrival.arrivalmonth
  var strsub=str.substring(0, 3);
  var monthno=( "JanFebMarAprMayJunJulAugSepOctNovDec".indexOf(strsub) / 3 + 1 )
  //console.log(monthno)

  var arrivaldate= monthno+ '/' +  this.upcoming.flight.arrival.arrivaldate+ '/' + this.upcoming.flight.arrival.arrivalyear;


  const date1 = +new Date(todaystring);
  const date2 = +new Date(arrivaldate);
  const diffTime = Math.abs(date2 - date1);
  remainingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  return remainingDays;
}

/* ---------Minimize map ---------*/
public mapMinify() {

  $("#away .city-map-name-inner").fadeOut( 400, function() {});
  $('#away #next-city').fadeOut( 400, function() {});

  $("#away #pin-images").fadeOut(400, function() {});

  setTimeout(function() {
    $("#away .stage").animate({ width: 180, height: 170, borderRadius: '50%' }, 800);
    $("#away #ball-out").animate({ left: 10, top: 0 }, 800);
    $("#away .ball-in").animate({ borderRadius: '50%' }, 800);
    $("#away #ballshadow").show(1000);
  }, 400);
  setTimeout(function() {
    $("#away .ball-in").css("animation", "move-map-globe 60s infinite linear");

  }, 800);
};

/* ---------Maximize map ---------*/

public mapMaximize() {
setTimeout(function() {
  $("#away .city-map-name-inner").fadeTo( 500,1, function() {});
  $("#away #pin-images").fadeTo( 800,1,function() {});
  $('#away #next-city').fadeIn( 400, function() {});

}, 800);

$("#away .stage").animate({ width: 1395, height: 750, borderRadius: '0%' }, 1000);
$("#away #ball-out").animate({ left: 165, top: 170 }, 1000);
$("#away .ball-in").animate({ borderRadius: '0%' }, 200);
$("#away .ball-in").css("animation", "none");
$("#away #ballshadow").hide(500);
};
}
