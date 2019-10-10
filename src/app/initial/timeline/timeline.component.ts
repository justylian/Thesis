import { SocketService } from "./../../services/socket.service";
import { MusicComponent } from "./../music/music.component";
import { ImagesComponent } from "./../images/images.component";
import { Component, OnInit } from "@angular/core";
import timelinejson from "../../../assets/json/timeline.json";
import { InitialService } from "./../../services/initial.service";
import upcomingjson from "../../../assets/json/upcoming.json";
declare var require: any;
declare var $: any;
declare var jQuery: any;

@Component({
  selector: "app-timeline",
  templateUrl: "./timeline.component.html",
  styleUrls: ["./timeline.component.scss"]
})
export class TimelineComponent implements OnInit {
  upcoming = upcomingjson;
  citiesPast = timelinejson.citiesPast;
  citiesPastCount = Object.keys(timelinejson.citiesPast).length;
  citiesFuture = timelinejson.citiesFuture;

  constructor(
    private compMusic: MusicComponent,
    private compImages: ImagesComponent,
    private initialService: InitialService,
    private socketService: SocketService
  ) {
    //var instance = new ExampleClass().deserialize(timelinejson);
    this.socketService.p2p$.subscribe(data => {
      //console.log(city);
      this.citiesFuture[0].cityName = data.city;

      //this.loadedAway=true;
    });
    this.initialService.timelineFocus$.subscribe(i => {
      //alert('(Component2) Method called!'+i);
      cityFocus(i);
    });
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

  ngOnInit() {
    //color();
  }
}

function cityFocus(timelineno) {
  //$('#timeline-city-1 h1').animate({scale: '+=0.33'},100);
  // $('#timeline-city-1 h1').addClass('animate');

  $("#timeline-city-" + timelineno).fadeTo(200, 1, function() {});

  if (timelineno === 1) {
    $("#timeline-city-2").fadeOut(200, function() {});
    $("#timeline-city-3").fadeOut(200, function() {});
    $("#timeline-city-4").fadeOut(200, function() {});
    $("#timeline-city-5").fadeOut(200, function() {});
    $("#timeline-city-6").fadeOut(200, function() {});
  } else if (timelineno === 2) {
    $("#timeline-city-1").fadeOut(200, function() {});
    $("#timeline-city-3").fadeOut(200, function() {});
    $("#timeline-city-4").fadeOut(200, function() {});
    $("#timeline-city-5").fadeOut(200, function() {});
    $("#timeline-city-6").fadeOut(200, function() {});
  } else if (timelineno === 3) {
    $("#timeline-city-2").fadeOut(200, function() {});
    $("#timeline-city-1").fadeOut(200, function() {});
    $("#timeline-city-4").fadeOut(200, function() {});
    $("#timeline-city-5").fadeOut(200, function() {});
    $("#timeline-city-6").fadeOut(200, function() {});
  } else if (timelineno === 4) {
    $("#timeline-city-2").fadeOut(200, function() {});
    $("#timeline-city-3").fadeOut(200, function() {});
    $("#timeline-city-1").fadeOut(200, function() {});
    $("#timeline-city-5").fadeOut(200, function() {});
    $("#timeline-city-6").fadeOut(200, function() {});
  } else if (timelineno === 5) {
    $("#timeline-city-2").fadeOut(200, function() {});
    $("#timeline-city-3").fadeOut(200, function() {});
    $("#timeline-city-4").fadeOut(200, function() {});
    $("#timeline-city-1").fadeOut(200, function() {});
    $("#timeline-city-6").fadeOut(200, function() {});
  } else {
    $("#timeline-city-2").fadeOut(200, function() {});
    $("#timeline-city-3").fadeOut(200, function() {});
    $("#timeline-city-4").fadeOut(200, function() {});
    $("#timeline-city-5").fadeOut(200, function() {});
    $("#timeline-city-1").fadeOut(200, function() {});
  }
}
