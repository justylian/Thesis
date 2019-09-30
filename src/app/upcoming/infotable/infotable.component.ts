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
import { Message } from "@angular/compiler/src/i18n/i18n_ast";
import { Component, OnInit } from "@angular/core";
const { getColorFromURL } = require("color-thief-node");
declare var require: any;
declare var $: any;
declare var jQuery: any;
import { of } from "rxjs/observable/of";
import { Observable } from "rxjs";

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
    private imageslocationService: ImageslocationService
  ) {}

  async ngOnInit() {
    this.remainingDays = this.getRemainingdays(this.remainingDays);

    this.searchPOI(this.citiesFuture[0].cityName+" "+this.citiesFuture[0].countryName);

    this.mapboxComponent.focusPin(1);

    this.checkMonthDepArr();

    this.weatherMessage();
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

  currPois;
  currPlace;
  public fixPlaces() {
    for (var i = 0; i < this.pois.length; i++) {
      //this.currPois = this.pois[i];
      //console.log(this.pois[i]);
      if (typeof this.images[i] !== "undefined") {
        for (var j = 0; j < this.pois.length; j++) {
          //this.currPlace = this.places[j];
          //console.log(this.places[j]);
          if (typeof this.places[j] !== "undefined") {
            if (
              this.places[j].title
                .toUpperCase()
                .includes(this.pois[i].toponymName.toUpperCase()) ||
              this.pois[i].toponymName
                .toUpperCase()
                .includes(this.places[j].title.toUpperCase())
            ) {
              this.placesOrdered[i] = this.places[j].extract;
              this.placesNums[i] = i;
              this.places[j] = undefined;
              break;
            }
          }
        }
      } else {
        this.placesOrdered[i] = undefined;
      }
    }
    console.log(this.pois);

    for (var i = 0; i < this.pois.length; i++) {
      if (typeof this.placesOrdered[i] === "undefined") {
        this.images[i] = undefined;
        this.pois[i] = undefined;
      }
    }

    this.pois = this.pois.filter(function(el) {
      return el != null;
    });
    this.images = this.images.filter(function(el) {
      return el != null;
    });
    this.places = this.placesOrdered.filter(function(el) {
      return el != null;
    });

    console.log(this.places);
    console.log(this.images);
    console.log(this.pois);
    if(this.pois.length<5){
      alert("Not enough places found!");
    }
    this.imagesFound = true;
    this.placesFound = true;
    this.allFound = true;

    this.sendplacesVar();
    this.sendimagesVar();
    this.sendpoisVar();
    this.sendfoundVar(this.allFound);
  }

  /* -------------- POI API --------------- */

  public handleSuccessPOI(data) {
    // console.log(data+"POOI");
    console.log(data.geonames);

    //this.places=data.geonames;
    //console.log(this.places);
    this.pois = data.geonames;

    console.log(this.pois.length);
    for (var i = 0; i < this.pois.length; i++) {
      this.searchImages(this.pois[i].toponymName);
      this.searchPlace(this.pois[i].toponymName);
    }
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
  handleSuccessPlace(data) {
    this.places[this.placecount] = data;
    //console.log(data.extract);

    this.placecount = this.placecount + 1;
    if (this.placecount === this.pois.length) {
      console.log(this.images);
      console.log(this.places);
      this.fixPlaces();

      /* this.allFound = true;

      this.sendplacesVar();
      this.sendimagesVar();
      this.sendimagesLocVar();
      this.sendfoundVar(this.allFound);*/
    }
    //console.log(data);
  }

  handleErrorPlace(error) {
    this.places[this.placecount] = undefined;
    this.placecount = this.placecount + 1;
    //console.log(error);
  }

  public searchPlace(query: string) {
    this.searchingPlace = true;
    //console.log(query);
    //return this.placesService.getInfo(query);

    return this.placesService
      .getInfo(query)
      .subscribe(
        data => this.handleSuccessPlace(data),
        error => this.handleErrorPlace(error),
        () => (this.searchingPlace = false)
      );
  }

  /* -------------- Images API --------------- */
  counter = 0;
  handleSuccess(data, query) {
    this.images[this.counter] = data.hits[0];
    //console.log(this.images);
    this.counter = this.counter + 1;
    //console.log(this.counter );

    /*
      console.log(
        "FOUND IMAGES:\n" + data.results[0].id,
        data.results[1].id,
        data.results[2].id,
        data.results[3].id,
        data.results[4].id
      );
      this.searchImagesLoc(query);



    var images=this.images;
    var that=this;
    setInterval(function() {
      console.log("n");

      if(typeof images[9] !=='undefined'){
        console.log("in");
        that.searchImagesLoc(that.citiesFuture[0].cityName);

      }
    }, 1000);
        //while(typeof this.images[14]==='undefined'){

    //}

    //geonames
    //




   /*  for(var j=0;j<14;j++){

      var words=this.images[j].description;
      var cityflag=false;
      console.log(words+"  words[0]");
      this.searchPOI(query,words);

     for(var i=0;i<words.length;i++){
        if(words[i].toUpperCase()!==query.toUpperCase() ){
          console.log(words[i]+"words[0]");
          this.searchPOI(query,words[i]);
          cityflag=true;
          break;
        }
      }
      if(cityflag===false){
        //place city
        this.pois.push(query);


      }*/

    //}
    //console.log(data.hits[0].tags);
    /*  for(var j=0;j<5;j++){
      var words=data.hits[j].tags.split(',');

      for(var i=0;i<words.length;i++){

        if(words[i].toUpperCase() !==query.toUpperCase() ){
          //console.log(words[i]);

          for(var k=0;k<pois.length;k++){
            var poissplit=pois[k].split(' ');

            for(var l=0;l<poissplit.length;l++){
              console.log(words[i]);

              if(poissplit[l]===words[i]){
                this.imagesPlace = words[i];
                console.log( "!!!!!!"+this.imagesPlace );
                break;
              }
            }
          }


        }
      }
    }*/
    //console.log(data.hits);
  }

  handleError(error) {
    this.images[this.counter] = undefined;

    this.counter = this.counter + 1;
    console.log(error);
  }

  searchImages(query: string) {
    this.searchingImage = true;

    return this.imagesService
      .getImage(query)
      .subscribe(
        data => this.handleSuccess(data, query),
        error => this.handleError(error),
        () => (this.searchingImage = false)
      );
  }

  /* -------------- Dual Locations Check --------------- */
  checkingLoc;
  checkingInnerLoc;
  checkDuality(i) {
    for (var j = 0; j < 5; j++) {
      this.checkingInnerLoc = this.imagesLoc[j];
      if (i !== j && this.checkingLoc === this.checkingInnerLoc) {
        console.log("FOUND DOUBLE" + j + this.checkingInnerLoc);
        return j;
      }
    }

    return "none";
  }
  /* -------------- ImagesLocation API --------------- */

  //Search for each image

  searchImagesLoc(query) {
    for (var j = 0; j < 5; j++) {
      this.searchLoc(this.images[j].id);
    }
  }

  toChange;
  async handleSuccessLoc(data) {
    // console.log(data);
    //console.log(data.location.name);

    this.imagesLoc[this.counter] = data.location.name
      .split(" ")[0]
      .replace(/,/g, "");
    this.counter = this.counter + 1;
    if (this.counter === 5) {
      /* while (true) {
        for (var i = 0; i < 5; i++) {
          console.log("CHECK FOR" + i + this.checkingLoc);

          this.checkingLoc = this.imagesLoc[i];
          this.toChange = await this.checkDuality(i);
          if (this.toChange === "none") {
            break;
          }
          this.searchImages(this.citiesFuture[0].cityName, this.toChange);
          //NOO
          break;
        }
        break;
        //}
        this.counter--;
      }*/
      //canal museum statue river
      for (var j = 0; j < 5; j++) {
        // this.searchPlace(this.imagesLoc[j]);
      }
      console.log("FOUND IMAGELOCS:" + this.imagesLoc);
    }
    /* for(var j=0;j<5;j++){
      console.log(this.imagesLoc[j]);
      console.log(this.images[j]);
      if(typeof this.images[j] === 'undefined'){
        this.imagesLoc.splice(j, j+1)
        this.images.splice(j, j+1)
        console.log("endef");
      }
      else if((this.imagesLoc[j].toUpperCase()).startsWith(this.citiesFuture[0].cityName.toUpperCase())){
        this.imagesLoc.splice(j, j+1)
        this.images.splice(j, j+1)
        console.log("endis");
      }
    }*/
  }

  handleErrorLoc(error) {
    console.log(error);
  }

  public searchLoc(id) {
    return this.imageslocationService
      .getImageLocation(id)
      .subscribe(
        data => this.handleSuccessLoc(data),
        error => this.handleErrorLoc(error),
        () => (this.searchingLoc = false)
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
      this.placesComponent.manageImagesUpcoming(this.currentImage);
      $("#city-name").css({
        filter: "drop-shadow(-50px 0px 50px var(--main-timeline-shadow))"});
      this.turn = false;
    } else {
      $("#info-frame").fadeIn("slow");
      this.mapboxComponent.showMap();
      this.placesComponent.hideImagesUpcoming();
      $("#city-name").css({
        filter: "drop-shadow(-50px 0px 50px #fff)"});

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

  public nextScroll(): void {
    var prevImage = this.currentImage;
    this.currentImage = ++this.currentImage;
    if (this.currentImage === 6) {
      this.currentImage = 1;
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

  public previousScroll(): void {
    var prevImage = this.currentImage;
    this.currentImage = --this.currentImage;
    if (this.currentImage <= 0) {
      this.currentImage = 5;
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
  var fontSize =120+ "px";
  if(1130 / parseInt($("#city-name").text().length)<120){
     fontSize =1130 / parseInt($("#city-name").text().length)+ "px";
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
