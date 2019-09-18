import { MusicComponent } from './../music/music.component';
import { ImagesComponent } from './../images/images.component';
import { Component, OnInit } from '@angular/core';
import { Timelineinfo } from './../../models/timelineinfo';
import timelinejson from '../../../assets/json/timeline.json';
import { InitialService } from './../../services/initial.service';
declare var require: any
declare var $: any;
declare var jQuery: any;
/*

interface Serializable<T> {
  deserialize(input: Object): T;
}

class Member implements Serializable<Member> {
  cityName: String;

  deserialize(input) {
      this.cityName = input.cityName;
      return this;
  }
}

class ExampleClass implements Serializable<ExampleClass> {
  cities: Member;
  //secondCity: Member;

  deserialize(input) {


      this.cities[0] = new Member().deserialize(input.cities[0]);
      this.cities[1] = new Member().deserialize(input.cities[1]);

      //this.secondCity = new Member().deserialize(input.secondCity);
      console.log(this.cities);
      return this;
  }
}*/


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})

export class TimelineComponent implements OnInit {
  //public Timelineinfo: Timelineinfo[] = [];

  //public Timelineinfo: Timelineinfo[];

  //var instance = deserialize("../../assets/json/InputDeviceInfo.json", Timelineinfo);



   citiesPast=timelinejson.citiesPast;
   citiesFuture=timelinejson.citiesFuture;


  constructor(private compMusic: MusicComponent,private compImages: ImagesComponent,private initialService: InitialService) {
    //var instance = new ExampleClass().deserialize(timelinejson);
    this.initialService.timelineFocus$.subscribe(
      (i) => {
        //alert('(Component2) Method called!'+i);
        cityFocus(i);

      }
    );

  }
  public CitySlideshow(): void {
    this.compImages.slideShow();
    //this.compMap.futureCitySlideshowMap(1);

  }
  public nextCitySlideshow(): void {
    this.compImages.nextCity();
    //this.compMap.futureCitySlideshowMap(1);

  }

  public previousCitySlideshow(): void {
    this.compImages.previousCity();
    //this.compMap.futureCitySlideshowMap(1);

  }


  /* ----- Leap ----- */


  public manageLeap(): void {
    var compImages=this.compImages;
    var compMusic=this.compMusic;
    var leapjs      = require('leapjs');
    var controller  = new leapjs.Controller({enableGestures: true});

    if($('#initial').css('display')==='block'){
      controller.on('deviceFrame', function(frame) {
        // loop through available gestures
        for(var i = 0; i < frame.gestures.length; i++){
          var gesture = frame.gestures[i];
          var type    = gesture.type;

          switch( type ){

            case "circle":
              if (gesture.state == "stop") {
                console.log('circle');
                compMusic.playerManage();
              }
              break;

            case "swipe":
              if (gesture.state == "stop") {
                console.log('swipe');
                compImages.nextCity();
              }
              break;

            case "screenTap":
              if (gesture.state == "stop") {
                console.log('screenTap');
                compImages.slideShow();

              }
              break;

            case "keyTap":
              if (gesture.state == "stop") {
                console.log('keyTap');
            }
              break;

            }
          }
      });
    }

    controller.connect();
  }
  ngOnInit() {
    this.manageLeap();

    //color();
  }



}


function cityFocus(timelineno){
  //$('#timeline-city-1 h1').animate({scale: '+=0.33'},100);
 // $('#timeline-city-1 h1').addClass('animate');

    $('#timeline-city-'+timelineno).fadeTo(200,1, function() {});
    if(timelineno===1){
      $('#timeline-city-2').fadeOut(200, function() {});
      $('#timeline-city-3').fadeOut(200, function() {});
      $('#timeline-city-4').fadeOut(200, function() {});
      $('#timeline-city-5').fadeOut(200, function() {});
      $('#timeline-city-6').fadeOut(200, function() {});
    }
    else if(timelineno===2){
      $('#timeline-city-1').fadeOut(200, function() {});
      $('#timeline-city-3').fadeOut(200, function() {});
      $('#timeline-city-4').fadeOut(200, function() {});
      $('#timeline-city-5').fadeOut(200, function() {});
      $('#timeline-city-6').fadeOut(200, function() {});
    }
    else if(timelineno===3){
      $('#timeline-city-2').fadeOut(200, function() {});
      $('#timeline-city-1').fadeOut(200, function() {});
      $('#timeline-city-4').fadeOut(200, function() {});
      $('#timeline-city-5').fadeOut(200, function() {});
      $('#timeline-city-6').fadeOut(200, function() {});
    }
    else if(timelineno===4){
      $('#timeline-city-2').fadeOut(200, function() {});
      $('#timeline-city-3').fadeOut(200, function() {});
      $('#timeline-city-1').fadeOut(200, function() {});
      $('#timeline-city-5').fadeOut(200, function() {});
      $('#timeline-city-6').fadeOut(200, function() {});
    }
    else if(timelineno===5){
      $('#timeline-city-2').fadeOut(200, function() {});
      $('#timeline-city-3').fadeOut(200, function() {});
      $('#timeline-city-4').fadeOut(200, function() {});
      $('#timeline-city-1').fadeOut(200, function() {});
      $('#timeline-city-6').fadeOut(200, function() {});
    }
    else {
      $('#timeline-city-2').fadeOut(200, function() {});
      $('#timeline-city-3').fadeOut(200, function() {});
      $('#timeline-city-4').fadeOut(200, function() {});
      $('#timeline-city-5').fadeOut(200, function() {});
      $('#timeline-city-1').fadeOut(200, function() {});
    }


  }

