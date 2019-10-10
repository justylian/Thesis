import { logging } from "protractor";
import { UpcomingService } from "./../../services/upcoming.service";
import { LeapService } from "./../../services/leap.service";
import { DominantcolorService } from "./../../services/dominantcolor.service";
import { Component, OnInit } from "@angular/core";
import timelinejson from "../../../assets/json/timeline.json";
import timesjson from "../../../assets/json/times.json";
declare var Load: any;
declare var $: any;
declare var jQuery: any;
@Component({
  selector: "app-places",
  templateUrl: "./places.component.html",
  styleUrls: ["./places.component.scss"]
})
export class PlacesComponent implements OnInit {
  citiesFuture = timelinejson.citiesFuture;
  timePerPhoto = timesjson.timePerPhoto;
  timePerCity = this.timePerPhoto * 5;
  images = new Array(5);
  pois = new Array(5);
  places = new Array(5);
  once1 = true;
  once2 = true;
  once3 = true;
  allfound = false;
  constructor(
    private upcomingService: UpcomingService,
    private dominantcolorService: DominantcolorService
  ) {
    this.upcomingService.images$.subscribe(i => {
      //alert('(Component2) Method called!'+i);
      if (this.once1 === true) {
        this.images = i;
        //console.log(this.images);

        this.once1 = false;
      }
    });
    this.upcomingService.pois$.subscribe(k => {
      if (this.once2 === true) {
        this.pois = k;
        //console.log(this.imagesLoc);
        this.once2 = false;
      }
    });
    this.upcomingService.places$.subscribe(l => {
      //alert('(Component2) Method called!'+i);
      //console.log(l);
      if (this.once3 === true) {
        this.places = l;
        //console.log(this.places);
        this.once3 = false;
      }
    });
    this.upcomingService.found$.subscribe(allfound => {
      //alert('(Component2) Method called!'+i);
      //console.log(l);
      this.allfound = allfound;

      //this.getColors(6);

    });
    /*  this.leapService.nextImageUpcoming$.subscribe(
      () => {
        //alert('(Component2) Method called!'+i);
        this.nextImageUpcoming();
      }
    );*/
  }

  ngOnInit() {
    //this.manageImagesShow();
  }


  public return(){
    $("#upcoming").hide();
    $("#choice").show();
  }


  currentImage = 1;
  public savePlace() {
    if ($("#cityImages6 #image6-" + this.currentImage).hasClass("saved")) {
      $("#cityImages6 #image6-" + this.currentImage).removeClass("saved");

      $("#cityImages6 #image6-" + this.currentImage).addClass("unsaved");

      $("#cityImages6 #image6-" + this.currentImage + "-inner").fadeIn(200);
      var currentImage = this.currentImage;
      setTimeout(function() {
        $("#cityImages6 #image6-" + currentImage + "-inner").fadeOut(200);
      }, 500);
    } else {
      $("#cityImages6 #image6-" + this.currentImage).removeClass("unsaved");
      $("#cityImages6 #image6-" + this.currentImage).addClass("saved");
    }
  }
  /* ----- Next Photos manage main ----- */

  public nextImageUpcoming() {
    var nextImage = this.currentImage;
    nextImage++;
    if (nextImage === 6) {
      nextImage = 1;
    }
    //console.log(nextImage);
    this.manageImagesUpcoming(nextImage);

    this.currentImage = nextImage;
  }

  /* ----- Hide manage main ----- */

  public hideImagesUpcoming() {
    $("#places").fadeOut(250, function() {});
  }

  public showImagesUpcoming(i) {

    this.manageImagesUpcoming(i)
  }

  /* ----- Photos manage main ----- */

  public manageImagesUpcoming(i) {
    var timePerCity = this.timePerCity;
    var timePerPhoto = this.timePerPhoto;
    var dominantcolorService = this.dominantcolorService;
    //console.log(i);

    $("#places").fadeIn(250, function() {});

    if (i === 5) {
      this.currentImage = 5;
      //$('#cityImages6 #image6-four').hide();

      $("#cityImages6 #image6-three").hide();
      $("#cityImages6 #image6-one").hide();
      $("#cityImages6 #image6-two").hide();
      $("#cityImages6").show();
      $("#cityImages6 #image6-four").fadeIn(100, function() {
        $("#cityImages6 #image6-five").fadeIn("slow");
      });
      $("#cityImages6 #image6-four").fadeOut("slow");

      dominantcolorService.handleDominantColor(6, "five");
      $("#cityImages6 #image6-five-inner").show(); //show desc
    } else if (i === 4) {
      this.currentImage = 4;

      $("#cityImages6 #image6-five").hide();
      //$('#cityImages6 #image6-three').hide();
      $("#cityImages6 #image6-one").hide();
      $("#cityImages6 #image6-two").hide();

      $("#cityImages6").show();
      $("#cityImages6 #image6-three").fadeIn(100, function() {
        $("#cityImages6 #image6-four").fadeIn("slow");
      });
      $("#cityImages6 #image6-three").fadeOut("slow");

      dominantcolorService.handleDominantColor(6, "four");
      $("#cityImages6 #image6-four-inner").show(); //show desc
    } else if (i === 3) {
      this.currentImage = 3;

      $("#cityImages6 #image6-five").hide();
      $("#cityImages6 #image6-four").hide();
      $("#cityImages6 #image6-one").hide();
      //$('#cityImages6 #image6-two').hide();

      $("#cityImages6").show();
      $("#cityImages6 #image6-two").fadeIn(100, function() {
        $("#cityImages6 #image6-three").fadeIn("slow");
      });
      $("#cityImages6 #image6-two").fadeOut("slow");

      dominantcolorService.handleDominantColor(6, "three");
      $("#cityImages6 #image6-three-inner").show(); //show desc
    } else if (i === 2) {
      this.currentImage = 2;

      $("#cityImages6 #image6-five").hide();
      $("#cityImages6 #image6-four").hide();
      $("#cityImages6 #image6-three").hide();
      //$('#cityImages6 #image6-one').hide();
      $("#cityImages6").show();
      $("#cityImages6 #image6-one").fadeIn(100, function() {
        $("#cityImages6 #image6-two").fadeIn("slow");
      });
      $("#cityImages6 #image6-one").fadeOut("slow");

      dominantcolorService.handleDominantColor(6, "two");
      $("#cityImages6 #image6-two-inner").show(); //show desc
    } else if (i === 1) {
      this.currentImage = 1;

      //$('#cityImages6 #image6-five').hide();
      $("#cityImages6 #image6-four").hide();
      $("#cityImages6 #image6-three").hide();
      $("#cityImages6 #image6-two").hide();

      $("#cityImages6").show();
      $("#cityImages6 #image6-five").fadeIn(100, function() {
        $("#cityImages6 #image6-one").fadeIn("slow");
      });
      $("#cityImages6 #image6-five").fadeOut("slow");

      dominantcolorService.handleDominantColor(6, "one");
      $("#cityImages6 #image6-one-inner").show(); //show desc
    }

    //descplacingService.placeDescs(6);
  }


/* ----- Desc placing  ----- */

public getColors(i) {
  for (var j = 5; j >= 1; j--) {
    var length = 0;
    var templength = 0;
    var lessx = 300;
    var lessy = 300;
    length = extractColors("myCanvas6", 300, 300, j, i);
    //console.log(length);
    colorList = {};
    templength = extractColors("myCanvas7", 1200, 800, j, i);
    colorList = {};

    if (length > templength) {
      length = templength;
      lessx = 1200;
      lessy = 800;
    }

    templength = extractColors("myCanvas8", 750, 100, j, i);

    colorList = {};

    //console.log(templength);
    if (length > templength) {
      length = templength;
      lessx = 750;
      lessy = 100;
    }

    templength = extractColors("myCanvas9", 300, 600, j, i);

    colorList = {};

    //console.log(templength);
    if (length > templength) {
      length = templength;
      lessx = 300;
      lessy = 600;
    }
    templength = extractColors("myCanvas12", 1000, 250, j, i);

    colorList = {};

    //console.log(templength);
    if (length > templength) {
      length = templength;
      lessx = 1000;
      lessy = 850;
    }
    templength = extractColors("myCanvas11", 600, 800, j, i);

    colorList = {};

    //console.log(templength);
    if (length > templength) {
      length = templength;
      lessx = 600;
      lessy = 800;
    }



    templength = extractColors("myCanvas12", 50, 500, j, i);

    colorList = {};

    //console.log(templength);
    if (length > templength) {
      length = templength;
      lessx = 50;
      lessy = 500;
    }


    templength = extractColors("myCanvas13", 1250, 50, j, i);

    colorList = {};

    //console.log(templength);
    if (length > templength) {
      length = templength;
      lessx = 1250;
      lessy = 50;
    }
    console.log(i, j, length, lessx, lessy);

    if (j === 5) {
      $("#cityImages6 #image6-five-inner").css({ top: lessy, left: lessx });
      if (length >= 200) {
        $("#cityImages6 #image6-five-inner h1").css({
          filter: "drop-shadow(0 0 30px #000)",
          "mix-blend-mode": "unset",
          color: "#fff",
          "text-shadow": "0px 0px 5px #000"
        });
        $("#cityImages6 #image6-five-inner  h2").css({
          filter: "drop-shadow(0 0 30px #000)",
          "mix-blend-mode": "unset",
          color: "#fff",
          "text-shadow": "0px 0px 5px #000"
        });
      }
    } else if (j === 4) {
      $("#cityImages6 #image6-four-inner").css({ top: lessy, left: lessx });
      if (length >= 200) {
        $("#cityImages6 #image6-four-inner h1").css({
          filter: "drop-shadow(0 0 30px #000)",
          "mix-blend-mode": "unset",
          color: "#fff",
          "text-shadow": "0px 0px 5px #000"
        });
        $("#cityImages6 #image6-four-inner  h2").css({
          filter: "drop-shadow(0 0 30px #000)",
          "mix-blend-mode": "unset",
          color: "#fff",
          "text-shadow": "0px 0px 5px #000"
        });
      }
    } else if (j === 3) {
      $("#cityImages6 #image6-three-inner").css({ top: lessy, left: lessx });
      if (length >= 200) {
        $("#cityImages6 #image6-three-inner h1").css({
          filter: "drop-shadow(0 0 30px #000)",
          "mix-blend-mode": "unset",
          color: "#fff",
          "text-shadow": "0px 0px 5px #000"
        });
        $("#cityImages6 #image6-three-inner  h2").css({
          filter: "drop-shadow(0 0 30px #000)",
          "mix-blend-mode": "unset",
          color: "#fff",
          "text-shadow": "0px 0px 5px #000"
        });
      }
    } else if (j === 2) {
      $("#cityImages6 #image6-two-inner").css({ top: lessy, left: lessx });
      if (length >= 200) {
        $("#cityImages6 #image6-two-inner h1").css({
          filter: "drop-shadow(0 0 30px #000)",
          "mix-blend-mode": "unset",
          color: "#fff",
          "text-shadow": "0px 0px 5px #000"
        });
        $("#cityImages6 #image6-two-inner  h2").css({
          filter: "drop-shadow(0 0 30px #000)",
          "mix-blend-mode": "unset",
          color: "#fff",
          "text-shadow": "0px 0px 5px #000"
        });
      }
    } else {
      $("#cityImages6 #image6-one-inner").css({ top: lessy, left: lessx });

      if (length >= 200) {
        $("#cityImages6 #image6-one-inner h1").css({
          filter: "drop-shadow(0 0 30px #000)",
          "mix-blend-mode": "unset",
          color: "#fff",
          "text-shadow": "0px 0px 5px #000"
        });
        $("#cityImages6 #image6-one-inner  h2").css({
          filter: "drop-shadow(0 0 30px #000)",
          "mix-blend-mode": "unset",
          color: "#fff",
          "text-shadow": "0px 0px 5px #000"
        });
      }
    }
  }
}
}
var colorList = {};

function extractColors(cnv, x, y, j, i) {
  var canvas: any = document.getElementById(cnv);
  var context = canvas.getContext("2d");
  var img;
  //console.log(j);

  img = document.getElementById("image" + i + "-five-img");
  if (j === 5) {
    img = document.getElementById("image" + i + "-five-img");
  } else if (j === 4) {
    img = document.getElementById("image" + i + "-four-img");
  } else if (j === 3) {
    img = document.getElementById("image" + i + "-three-img");
  } else if (j === 2) {
    img = document.getElementById("image" + i + "-two-img");
  } else {
    img = document.getElementById("image" + i + "-one-img");
  }
  //img.crossOrigin = "Anonymous";
  //console.log(img);
  context.drawImage(img, x, y, 250, 200, 0, 0, 250, 200);

  var imageData = context.getImageData(0, 0, 250, 200);
  var data = imageData.data;
  var i, n;

  // quickly iterate over all pixels
  for (i = 0, n = data.length; i < n; i += 4) {
    var r = data[i];
    var g = data[i + 1];
    var b = data[i + 2];
    var hex = "rgb(" + r + "," + g + "," + b + ")";
    if (!(hex in colorList)) {
      colorList[hex] = 1;
    } else {
      colorList[hex]++;
    }
  }
  //console.log(colorList);
  var keys = Object.keys(colorList);
  //console.log(keys,keys.length);
  return keys.length;
}
