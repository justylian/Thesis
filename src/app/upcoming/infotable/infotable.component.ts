import { ChoiceService } from "./../../services/choice.service";
import { UpcomingService } from "./../../services/upcoming.service";
import { MapawayComponent } from "./../../away/mapaway/mapaway.component";
import { POIService } from "../../services/poi.service";
import { PlacesService } from "./../../services/places.service";
import { ImagesService } from "./../../services/images.service";
import { ImageslocationService } from "./../../services/imageslocation.service";
import { MapboxComponent } from "./../mapbox/mapbox.component";
import { PlacesComponent } from "./../places/places.component";
import timelinejson from "../../../assets/json/timeline.json";
import upcomingjson from "../../../assets/json/upcoming.json";
import { SocketService } from "./../../services/socket.service";

import { Message } from "@angular/compiler/src/i18n/i18n_ast";
import { Component, OnInit } from "@angular/core";
const { getColorFromURL } = require("color-thief-node");
declare var require: any;
declare var $: any;
declare var jQuery: any;
import { of } from "rxjs/observable/of";
import { Observable } from "rxjs";
import { ignoreElements } from "rxjs-compat/operator/ignoreElements";

@Component({
  selector: "app-infotable",
  templateUrl: "./infotable.component.html",
  styleUrls: ["./infotable.component.scss"]
})
export class InfotableComponent implements OnInit {
  citiesFuture = timelinejson.citiesFuture;
  upcoming = upcomingjson;
  arrivaldiff = false;
  remainingDays: number;
  images = [];
  imagesFound: boolean = false;
  imagesPlace: any[];
  searchingPOI: boolean = false;
  searchingImage: boolean = false;
  searchingPlace: boolean = false;
  searchingLoc: boolean = false;
  placesNums = [];
  places = [];
  placesOrdered = [];
  placesFound: boolean = false;
  pois = [];
  allFound = false;
  imagesLoc = new Array();
  coors: number[];
  coor = false;
  mobile = false;
  once = false;
  cityFound = false;
  countryFound = false;
  city;
  country;
  searchEnd = true;
  loadedUpcoming = false;
  public day1 =
    "../../../assets/images/weather/" +
    this.upcoming.weather.day1.state +
    ".png";
  public day2 =
    "../../../assets/images/weather/" +
    this.upcoming.weather.day2.state +
    ".png";
  public day3 =
    "../../../assets/images/weather/" +
    this.upcoming.weather.day3.state +
    ".png";
  public day4 =
    "../../../assets/images/weather/" +
    this.upcoming.weather.day4.state +
    ".png";
  public day5 =
    "../../../assets/images/weather/" +
    this.upcoming.weather.day5.state +
    ".png";
  public Todaymessage = JSON.parse(
    JSON.stringify(this.upcoming.weather.day1.state)
  );

  constructor(
    private choiceService: ChoiceService,
    private upcomingService: UpcomingService,
    private mapawayComponent: MapawayComponent,
    private placesComponent: PlacesComponent,
    private mapboxComponent: MapboxComponent,
    private imagesService: ImagesService,
    private placesService: PlacesService,
    private poiService: POIService,
    private imageslocationService: ImageslocationService,
    private socketService: SocketService
  ) {}

  ngOnInit() {
    this.socketService.getCity().subscribe(city => {
      //console.log(city);
      this.citiesFuture[0].cityName = city;
      this.cityFound = true;

      if (this.countryFound === true && this.cityFound == true) {
        this.searchPOI(
          this.citiesFuture[0].cityName + " " + this.citiesFuture[0].countryName
        );

        $("#choice #choice-loader #loader-text").fadeIn();

        this.remainingDays = this.getRemainingdays(this.remainingDays);

        this.mapboxComponent.focusPin(1);

        this.checkMonthDepArr();

        this.weatherMessage();
        this.loadedUpcoming = true;
      }
    });
    this.socketService.getCountry().subscribe(country => {
      //console.log(country);
      this.citiesFuture[0].countryName = country;
      this.countryFound = true;
      if (this.countryFound === true && this.cityFound == true) {
        this.searchPOI(
          this.citiesFuture[0].cityName + " " + this.citiesFuture[0].countryName
        );
        $("#choice #choice-loader #loader-text").fadeIn();

        this.remainingDays = this.getRemainingdays(this.remainingDays);

        this.mapboxComponent.focusPin(1);

        this.checkMonthDepArr();

        this.weatherMessage();
        this.loadedUpcoming = true;
      }
    });

    // this.coors=this.mapawayComponent.mapboxDistance("upcoming",this.citiesFuture[0].cityName);
    //console.log(this.coors);
    if (window.screen.width < 1920) {
      // 768px portrait
      this.mobile = true;
    } else {
      this.searchPOI(
        this.citiesFuture[0].cityName + " " + this.citiesFuture[0].countryName
      );
      this.remainingDays = this.getRemainingdays(this.remainingDays);

      this.mapboxComponent.focusPin(1);

      this.checkMonthDepArr();

      this.weatherMessage();
      this.loadedUpcoming = true;
    }
  }

  /* -------------- Check if Months different --------------- */

  checkMonthDepArr() {
    if (
      this.upcoming.flight.arrival.arrivalmonth ===
      this.upcoming.flight.departure.departuremonth
    ) {
      this.arrivaldiff = true;
    }
  }
  /* -------------- Get messages --------------- */

  sendpoisVar() {
    this.upcomingService.pois(this.pois);
  }
  sendimagesVar() {
    this.upcomingService.images(this.images);
  }
  sendplacesVar() {
    this.upcomingService.places(this.places);
  }
  sendfoundVar(allFound) {
    this.upcomingService.found(allFound);
  }
  /* -------------- Weather messages --------------- */

  public weatherMessage() {
    if (this.Todaymessage === "Showers") {
      this.Todaymessage = "Don't forget your umbrella. It's pouring out there!";
    } else if (this.Todaymessage === "Sunny") {
      this.Todaymessage = "Sun will shine. Don't forget your sunscreen!";
    } else if (this.Todaymessage === "Cloudysunny") {
      this.Todaymessage = "Who cares about the clouds when we're together!";
    } else {
      this.Todaymessage = "Who cares about the clouds when we're together!";
    }
  }

  public fixPlaces() {
    for (var i = 0; i < this.pois.length; i++) {
    //  console.log(this.pois[i].adminCode1);
      if (this.pois[i].adminCode1 !== 2) {
        this.pois[i] = undefined;
        this.places[i] = undefined;
        this.images[i] = undefined;
      }
    }
    this.pois = this.pois.filter(function(el) {
      return el != null;
    });
    this.images = this.images.filter(function(el) {
      return el != null;
    });
    this.places = this.places.filter(function(el) {
      return el != null;
    });
    console.log("PLACES:");
    console.log(this.places);
    console.log("IMAGES:");
    console.log(this.images);
    console.log("POIS:");
    console.log(this.pois);
    if (this.pois.length < 5) {
      alert("Not enough places found!");
    }

    $("#loader-text").fadeOut("slow");
    $("#choice-loader").fadeOut("slow");

    this.imagesFound = true;
    this.placesFound = true;
    this.allFound = true;
    this.coor = true;
    this.sendplacesVar();
    this.sendimagesVar();
    this.sendpoisVar();
    this.sendfoundVar(this.allFound);
  }

  /* -------------- POI API --------------- */
i=0;
j=0;
  public handleSuccessPOI(data) {
    // console.log(data+"POOI");
    //console.log(data.geonames);
    //this.places=data.geonames;
    //console.log(this.places);
    //console.log(this.pois);
    this.pois = data.geonames;

    for ( this.j = 0; this.j < this.pois.length; this.j++) {
      this.searchPlace(this.pois[this.j].name, this.j);

      //console.log("SEARCHING..." + this.pois[i].name);
    }
    for (this.i = 0; this.i < this.pois.length; this.i++) {
      //console.log("SEARCHING..." + this.pois[i].name);
      //this.searchPlace(this.pois[i].name,i);
      this.searchImages(this.pois[this.i].name + " " + this.citiesFuture[0].cityName,this.i);


    }
    // console.log("PLACES:");
    // console.log(this.places);
    // console.log("IMAGES:");
    // console.log(this.images);
    // console.log("POIS:");
    // console.log(this.pois);
    var that=this;
    setTimeout(function() {
      that.fixPlaces();
    }, 4000);
  }

  handleErrorPOI(error) {
    console.log(error);
  }

  public searchPOI(query: string) {
    //var coordinates=await this.mapawayComponent.mapboxDistance("upcoming",query);
    this.searchingPOI = true;
    //return this.placesService.getInfo(query);
    return this.poiService
      .getPOI(query)
      .subscribe(
        data => this.handleSuccessPOI(data),
        error => this.handleErrorPOI(error),
        () => (this.searchingPOI = false)
      );
  }

  /* -------------- Places API --------------- */

  placecount = 0;
  temp;
  handleSuccessPlace(data, i) {
    this.places[i] = data;

    //console.log(data.extract);
    //console.log("in loop place");
    //console.log("FOUND" + this.places[i]);
   // console.log(this.places[i]);
    if (typeof this.places[i] !== undefined  ) {
     // console.log(this.pois[i]);
      this.temp = this.pois[i].adminCode1;
      if (this.temp !== 1) {
        this.pois[i].adminCode1 = 1;
      } else if (this.temp === 1) {
        // console.log("BOTH");
        // console.log(this.places[i]);
        // console.log(this.images[i]);

        this.pois[i].adminCode1 = 2;
      }
    }
    //console.log(i+" "+this.pois.length);
    if (i === this.pois.length-1) {
      // console.log("OK END");
      // console.log(this.places);
      // console.log(this.images);
      // console.log(this.pois);
     // this.fixPlaces();
    }

    /* if (
      this.placecount === this.pois.length &&
      this.imagecount === this.pois.length &&
      this.searchEnd === true
    ) {
      this.searchEnd = false;
      console.log(this.images);
      console.log(this.places);
      this.placecount = 0;
      this.imagecount = 0;

      //this.fixPlaces();

       this.allFound = true;

      this.sendplacesVar();
      this.sendimagesVar();
      this.sendimagesLocVar();
      this.sendfoundVar(this.allFound);
    }*/
    //console.log(data);
  }

  handleErrorPlace(error, i) {
    this.places[i] = undefined;
    this.placecount = this.placecount + 1;
    // console.log(i+" "+this.pois.length);
    if (i === this.pois.length-1) {
      // console.log("OK END");
      // console.log(this.places);
      // console.log(this.images);
      // console.log(this.pois);
    //  this.fixPlaces();
    }
    //console.log(error);
  }

  public searchPlace(query: string, i) {
    this.searchingPlace = true;
    //console.log(query);

    return this.placesService
      .getInfo(query)
      .subscribe(
        data => this.handleSuccessPlace(data, i),
        error => this.handleErrorPlace(error, i),
        () => (this.searchingPlace = false)
      );
  }

  /* -------------- Images API --------------- */
  handleSuccess(data, i) {
    this.images[i] = data.hits[0];
    //console.log("FOUND" + this.images[i]);
    if (typeof this.images[i] !== undefined && typeof this.images[i] !== "undefined") {
      this.temp = this.pois[i].adminCode1;
      if (this.temp !== 1) {
        this.pois[i].adminCode1 = 1;
      } else if (this.temp === 1) {
        // console.log("BOTH");
        // console.log(this.places[i]);
        // console.log(this.images[i]);

        this.pois[i].adminCode1 = 2;
      }
    }

    //console.log(this.images);
    //console.log("in loop img");

    /*  if (
      this.placecount === this.pois.length &&
      this.imagecount === this.pois.length &&
      this.searchEnd === true
    ) {
      this.searchEnd = false;
      //console.log(this.images);
      //console.log(this.places);
      this.placecount = 0;
      this.imagecount = 0;
      this.fixPlaces();

      /* this.allFound = true;

      this.sendplacesVar();
      this.sendimagesVar();
      this.sendimagesLocVar();
      this.sendfoundVar(this.allFound);
    }*/
  }

  handleError(error, i) {
    this.images[i] = undefined;
    console.log(error);
  }

  searchImages(query: string, i) {
    this.searchingImage = true;

    return this.imagesService
      .getImage(query)
      .subscribe(
        data => this.handleSuccess(data, i),
        error => this.handleError(error, i),
        () => (this.searchingImage = false)
      );
  }

  /* -------------- Remaining days --------------- */

  public getRemainingdays(remainingDays) {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    var todaystring = mm + "/" + dd + "/" + yyyy;

    var str = this.upcoming.flight.departure.departuremonth;
    var strsub = str.substring(0, 3);
    var monthno =
      "JanFebMarAprMayJunJulAugSepOctNovDec".indexOf(strsub) / 3 + 1;
    //console.log(monthno)

    var departuredate =
      monthno +
      "/" +
      this.upcoming.flight.departure.departuredate +
      "/" +
      this.upcoming.flight.departure.departureyear;

    const date1 = +new Date(todaystring);
    const date2 = +new Date(departuredate);
    const diffTime = Math.abs(date2 - date1);
    remainingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return remainingDays;
  }

  turn = true;
  public showHideImages(): void {
    if (this.turn === true) {
      $("#info-frame").fadeOut("slow");
      this.mapboxComponent.hideMap();
      this.placesComponent.showImagesUpcoming(this.currentImage);
      $("#city-name").css({
        filter: "drop-shadow(-50px 0px 50px var(--main-timeline-shadow))"
      });
      this.turn = false;
    } else {
      $("#info-frame").fadeIn("slow");
      this.mapboxComponent.showMap();
      this.placesComponent.hideImagesUpcoming();
      $("#city-name").css({
        filter: "drop-shadow(-50px 0px 50px #fff)"
      });

      this.turn = true;
    }
  }

  public nextImageUpcoming() {
    this.placesComponent.nextImageUpcoming();
  }

  public savePlace() {
    if (this.currentImage != 0) {
      if (
        $("#scroll-places-" + this.currentImage + " #places-desc").hasClass(
          "saved"
        )
      ) {
        $("#scroll-places-" + this.currentImage + " #places-desc").removeClass(
          "saved"
        );
        $("#scroll-places-" + this.currentImage + " #places-desc").addClass(
          "unsaved"
        );
      } else {
        $("#scroll-places-" + this.currentImage + " #places-desc").removeClass(
          "unsaved"
        );
        $("#scroll-places-" + this.currentImage + " #places-desc").addClass(
          "saved"
        );
      }
    }
  }

  currentImage = 0;
  onceColors=false;
  public nextScroll(): void {
    var prevImage = this.currentImage;
    this.currentImage = ++this.currentImage;
    if (this.currentImage === 6) {
      this.currentImage = 1;
    }

    if (this.onceColors === false) {
      this.placesComponent.getColors(6);
      this.onceColors = true;
    }

    this.mapboxComponent.focusPin(this.currentImage);
    var element = document.getElementById("scroll-places-" + this.currentImage);
    $("#scroll-places-" + prevImage)
      .addClass("deactive")
      .removeClass("active");

    $("#scroll-places-" + this.currentImage)
      .addClass("active")
      .removeClass("deactive");
    //console.log(element);
    element.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start"
    });
  }
  onceColorsPrev=false;
  public previousScroll(): void {
    var prevImage = this.currentImage;
    this.currentImage = --this.currentImage;
    if (this.currentImage <= 0) {
      this.currentImage = 5;
    }
    if (this.onceColorsPrev === false) {
      this.placesComponent.getColors(6);
      this.onceColorsPrev = true;
    }
    this.mapboxComponent.focusPin(this.currentImage);
    var element = document.getElementById("scroll-places-" + this.currentImage);
    $("#scroll-places-" + prevImage)
      .addClass("deactive")
      .removeClass("active");

    $("#scroll-places-" + this.currentImage)
      .addClass("active")
      .removeClass("deactive");
    //console.log(element);
    element.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start"
    });
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
  var fontSize = 120 + "px";
  if (1130 / parseInt($("#city-name").text().length) < 120) {
    fontSize = 1130 / parseInt($("#city-name").text().length) + "px";
  }

  //alert(fontSize);

  $("#city-name").css("font-size", fontSize);
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
