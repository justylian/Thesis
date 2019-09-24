import { Component, OnInit } from '@angular/core';
import timelinejson from '../../../assets/json/timeline.json';
import upcomingjson from '../../../assets/json/upcoming.json';  

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

  constructor() {
    this.remainingDays=this.getRemainingdays(this.remainingDays);

   }

  ngOnInit() {
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
