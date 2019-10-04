import { UpcomingService } from "./../../services/upcoming.service";
import { DominantcolorService } from "./../../services/dominantcolor.service";
import { ChoiceService } from "./../../services/choice.service";
import { Component, OnInit } from "@angular/core";
declare var require: any;
import timelinejson from "../../../assets/json/timeline.json";
declare var $: any;
declare var jQuery: any;
var oncemap = false;
//import 'mapbox-gl/dist/mapbox-gl.css';

@Component({
  selector: "app-mapbox",
  templateUrl: "./mapbox.component.html",
  styleUrls: ["./mapbox.component.scss"]
})
export class MapboxComponent implements OnInit {
  citiesFuture = timelinejson.citiesFuture;
  pois;
  allfound = false;
  mymap;
  coordinates;
  inside = false;
  outside = false;
  once = false;
  oncemap = false;
  constructor(
    private choiceService: ChoiceService,
    private upcomingService: UpcomingService
  ) {
    this.choiceService.upcoming$.subscribe(() => {
      //alert('(Component2) Method called!'+i);
      if (this.once === false) {
        //this.mapBox();
        this.once = true;
      }
    });

    this.upcomingService.pois$.subscribe(i => {
      //alert('(Component2) Method called!'+i);
      this.pois = i;
    });
    this.upcomingService.found$.subscribe(allfound => {
      //alert('(Component2) Method called!'+i);
      //console.log(l);
      this.allfound = allfound;
    });
  }

  ngOnInit() {}

  public mapBox() {
    //if(this.mapboxflag===true){

    var mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
    mapboxgl.accessToken =
      "pk.eyJ1IjoieGVuYWtpcyIsImEiOiJjanczdDBpMHAwZWgzM3lrbW9xaDVpNnlzIn0.9O8d2q7A_DUaGbswoygSTA";
    this.coordinates = [12.486, 41.89]; //Rome as start
    var MapboxClient = require("mapbox");
    var client = new MapboxClient(
      "pk.eyJ1IjoieGVuYWtpcyIsImEiOiJjanczdDBpMHAwZWgzM3lrbW9xaDVpNnlzIn0.9O8d2q7A_DUaGbswoygSTA"
    );
    if (oncemap === false) {
      oncemap = true;
      this.mymap = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/xenakis/cjw3t12b71b0f1coggwaltmwy",
        center: this.coordinates,
        //pitch: 60,
        minZoom: 0,
        maxZoom: 13,
        zoom: 3
      });
      var that = this;
      var searchLoc=this.citiesFuture[0].cityName+" "+this.citiesFuture[0].countryName
      client.geocodeForward(searchLoc, function(
        err,
        data,
        res
      ) {
        that.coordinates = data.features[0].center;
        //console.log( that.mymap);
      });

      var mymap = this.mymap;
      setTimeout(function() {
        mymap.flyTo({
          center: that.coordinates,
          zoom: 12
        });
      }, 7000);

      /*  JSON
    var ad1=this.citiesFuture[0].cityName+" "+this.citiesFuture[0].photos.one.title;
    var ad1title=this.citiesFuture[0].photos.one.title;
    var ad2=this.citiesFuture[0].cityName+" "+this.citiesFuture[0].photos.two.title;
    var ad2title=this.citiesFuture[0].photos.two.title;
    var ad3=this.citiesFuture[0].cityName+" "+this.citiesFuture[0].photos.three.title;
    var ad3title=this.citiesFuture[0].photos.three.title;
    var ad4=this.citiesFuture[0].cityName+" "+this.citiesFuture[0].photos.four.title;
    var ad4title=this.citiesFuture[0].photos.four.title;
    var ad5=this.citiesFuture[0].cityName+" "+this.citiesFuture[0].photos.five.title;
    var ad5title=this.citiesFuture[0].photos.five.title;

*/
      var ad1 = this.citiesFuture[0].cityName + " " + this.pois[0].name;
      var ad1title = this.pois[0].name;
      var ad2 = this.citiesFuture[0].cityName + " " + this.pois[1].name;
      var ad2title = this.pois[1].name;
      var ad3 = this.citiesFuture[0].cityName + " " + this.pois[2].name;
      var ad3title = this.pois[2].name;
      var ad4 = this.citiesFuture[0].cityName + " " + this.pois[3].name;
      var ad4title = this.pois[3].name;
      var ad5 = this.citiesFuture[0].cityName + " " + this.pois[4].name;
      var ad5title = this.pois[4].name;

      var test = client.geocodeForward(ad1, function(err, data, res) {
        //console.log(data);

        var coor = data.features[0].center;
        // console.log(coordinates);

        var el = stylePin(1, ad1title);

        new mapboxgl.Marker(el).setLngLat(coor).addTo(mymap);
      });

      var test = client.geocodeForward(ad2, function(err, data, res) {
        //console.log(data);

        var coor = data.features[0].center;
        // console.log(coordinates);

        var el = stylePin(2, ad2title);

        new mapboxgl.Marker(el).setLngLat(coor).addTo(mymap);
      });

      var test = client.geocodeForward(ad3, function(err, data, res) {
        // console.log(data);

        var coor = data.features[0].center;
        // console.log(coordinates);

        var el = stylePin(3, ad3title);

        new mapboxgl.Marker(el).setLngLat(coor).addTo(mymap);
      });

      var test = client.geocodeForward(ad4, function(err, data, res) {
        // console.log(data);

        var coor = data.features[0].center;
        //console.log(coordinates);

        var el = stylePin(4, ad4title);

        new mapboxgl.Marker(el).setLngLat(coor).addTo(mymap);
      });

      var test = client.geocodeForward(ad5, function(err, data, res) {
        //console.log(data);

        var coor = data.features[0].center;
        // console.log(coordinates);

        var el = stylePin(5, ad5title);

        new mapboxgl.Marker(el).setLngLat(coor).addTo(mymap);
      });

      // jQuery(window).resize(function(){map.resize()});
    }
  }
  public zoom(parameter) {
    var zoom = this.mymap.getZoom();
    //console.log(zoom);
    if (parameter === "in" && this.inside === false) {
      console.log("in");
      //this.outside = false;
      this.inside = true;
    } else if (parameter === "out" && this.outside === false) {
      //this.inside = false;
      console.log("false");

      this.outside = true;
      //this.mymap.setZoom(3);
      //this.mymap.setView([0, 0]);
    }
    console.log(this.mymap);

    var that = this;
    this.mymap.setZoom(5);
    this.mymap.setCenter([0, 50]);

    setInterval(function() {
      that.mymap.setZoom(0);
      setTimeout(function() {
        that.mymap.setZoom(1);
      }, 2000);
    }, 4000);
  }

  public focusPin(no) {
    //console.log('#markerbubble'+no);
    $("#map #markerbubble" + no).animate(
      {
        height: "20px",
        width: "20px",
        borderWidth: "13px"
      },
      500
    );
    $("#map #marker" + no).animate({
      "z-index": "5"
    },
    500);
    for (var i = 1; i <= 5; i++) {
      if (i !== no) {
        $("#map #markerbubble" + i).animate(
          {
            height: "15px",
            width: "15px",
            borderWidth: "9px"
          },
          500
        );
        $("#map #marker" + i).animate({
          "z-index": "2"
        },
        500);
      }
    }
  }

  public hideMap() {
    $("#map").fadeOut(200);
  }

  public showMap() {
    $("#map").fadeIn(200);
  }
}

function stylePin(i, adtitle) {
  var el = document.createElement("div");
  el.id = "marker" + i;
  el.textContent = adtitle;
  //el.textContent=data.query[0]+' '+data.query[1]+' '+data.query[2];
  el.style.background = "white";
  el.style.borderRadius = "15px 50px 30px";
  el.style.filter = "drop-shadow(#00000063 0px 0px 5px)";
  //el.style.width = '200px';
  //el.style.height = '50px';
  el.style.padding = "8px";
  el.style.fontSize = "1vw";
  el.style.zIndex = "2px";
  el.style.position = "absolute";
  // console.log(el.className);
  // console.log(el);

  var elbubble = document.createElement("div");
  el.appendChild(elbubble);
  elbubble.style.width = "15px";
  elbubble.style.height = "15px";
  elbubble.style.backgroundColor = "white";
  elbubble.style.position = "absolute";
  elbubble.style.zIndex = "1";

  elbubble.style.borderColor = "var(--main-timeline-color-" + i + ")";
  elbubble.style.borderWidth = "9px";
  elbubble.style.borderStyle = "solid";

  elbubble.style.top = "26px";
  elbubble.style.right = "-25px";
  elbubble.style.borderRadius = "50%";
  elbubble.id = "markerbubble" + i;

  return el;
}
