import { InfobubbleComponent } from './../infobubble/infobubble.component';
import { MapComponent } from './../map/map.component';
import { Component, OnInit } from '@angular/core';
import timesjson from '../../../assets/json/times.json';
import timelinejson from '../../../assets/json/timeline.json';
const { getColorFromURL } = require('color-thief-node');
declare var require: any


declare var $: any;
declare var jQuery: any;
var currentCity;

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
// tslint:disable: comment-format
export class ImagesComponent implements OnInit {
  citiesPast=timelinejson.citiesPast;
  citiesFuture=timelinejson.citiesFuture;
  timePerPhoto=timesjson.timePerPhoto;
  timePerCity=timesjson.timePerCity;
  delay=timesjson.delay;


  constructor(private compMap: MapComponent,private compBubble: InfobubbleComponent) { }

  //public currentCity:number;
  ngOnInit() {
    descPlacing();
  }

  public  futureCityState(): void {
    setTimeout(function() {

    },this.delay)
  }


  public slideShow(){
    this.continueSlideShow(1);
  }




  /* ----- Next city in slideshow ----- */

  public nextCity(){
    var nextCity=currentCity;
    nextCity++;
    if(nextCity===7){
      nextCity=0;
    }

    $('#cityImages'+currentCity).hide( "slow", function() {
    });

    clearTimeouts();

    currentCity=nextCity;

    this.continueSlideShow(nextCity);

  }

  /* ----- Previous city in slideshow ----- */

  public previousCity(){
    var previousCity=currentCity;
    previousCity--;
    if(previousCity===0){
      previousCity=6;
    }

    $('#cityImages'+currentCity).hide( "slow", function() {
    });

    clearTimeouts();
    currentCity=previousCity;
    this.continueSlideShow(previousCity);

  }


  /* ----- Slideshow continue/start ----- */

  public continueSlideShow(startingCity){
    var timePerCity=this.timePerCity;
    var timePerPhoto=this.timePerPhoto;
    var compMap=this.compMap;
    var compBubble=this.compBubble;
    var timePerCity=this.timePerCity;
    //var timer=0;
    //console.log(upcomingCity);

    for (var i = startingCity; i <= 3; ++i){
      //setTimeout(function() {
        console.log(i);
        continueSlideShowInner(timePerCity,timePerPhoto,compMap,compBubble,startingCity,i);
        if(i===7){ //loop
          i=1;
        }
    //}, timer+=timePerCity);
    }

  }


}


/* ----- Slideshow inner ----- */

var timer=0;
function continueSlideShowInner(timePerCity,timePerPhoto,compMap,compBubble,startingCity,i){

  var time2=3000;
  var time1=timePerCity;
  var multiplier=0;


  if(startingCity!==1){
    multiplier=0;
    //clearTimeouts();
    //console.log("clear");
    timer=0;

  }

  if(i===1){
      // ------------CITY 1
      console.log("he"+i);
      console.log("he"+timer);
      currentCity=i;

      compMap.manageInitialMin(1);// minify
      compBubble.hideBubble();
      setTimeout(function() {
        manageImagesShow(timePerCity,timePerPhoto,1);//city1
        //continueSlideShowInner(timePerCity,timePerPhoto,compMap,compBubble,timer,upcomingCity,2);
      }, timer+=time2);
  }
  //console.log(i);
  multiplier++;

  if(i===2){
    console.log("multi"+multiplier);

    if(startingCity===2){

      setTimeout(function() {
        currentCity=i;
        multiplier=1;

        console.log("n"+i);
        console.log("n"+timer);

        $('#image-main').fadeOut( 250, function() {});
        //hide prev
        compMap.manageInitialMax(0);
      },timer+=0);
    }
    else{
      setTimeout(function() {
        currentCity=i;
        console.log("n"+i);
        console.log("n"+timer);

        $('#image-main').fadeOut( 250, function() {});
        //hide prev
        compMap.manageInitialMax(0);
      },timer+=time1);
    }
    setTimeout(function() {
      compMap.manageInitialMin(i);

    },timer+=time2);
    setTimeout(function() {
      manageImagesShow(timePerCity,timePerPhoto,i);//
    },timer+=time2);

  }
  multiplier++;


  if(i==3){
    console.log("multi"+multiplier);

    if(startingCity===3){
      setTimeout(function() {
        currentCity=i;
        multiplier=1;
        console.log("n"+i);
        console.log("n"+timer);

        $('#image-main').fadeOut( 250, function() {});
        compMap.manageInitialMax(0);
      },timer+=0);

    }
    else{


        setTimeout(function() {
          console.log("n"+i);
          $('#image-main').fadeOut( 250, function() {});
          compMap.manageInitialMax(0);
          },timer+=time1);

    }

    setTimeout(function() {
      compMap.manageInitialMin(i);

    },timer+=time2);
    setTimeout(function() {
      manageImagesShow(timePerCity,timePerPhoto,i);//

    },timer+=time2);


  }


}

/* ----- Timeouts to zero ----- */

function clearTimeouts(){
  var id = window.setTimeout(function() {}, 0);
  while (id--) {
      window.clearTimeout(id); // will do nothing if no timeout with id is present
  }
}

/* ----- Dominant colours ----- */


function handleDominantColor(timelineno,no){
  var imageURL=$('#cityImages'+timelineno+' #image'+timelineno+'-'+no+'-img').attr('src');//get img color

  (async () => {
    const dominantColor = await getColorFromURL(imageURL);
    //console.log(dominantColor);
    var rgb='rgb('+dominantColor[0]+','+dominantColor[1]+','+dominantColor[2]+')';

    $("body").css("--main-timeline-color", 'rgb('+dominantColor[0]+','+dominantColor[1]+','+dominantColor[2]+')');

    var hsp = Math.sqrt(
      0.299 * (dominantColor[0] * dominantColor[0]) +
      0.587 * (dominantColor[1] * dominantColor[1]) +
      0.114 * (dominantColor[2] * dominantColor[2])
      );
    if (hsp>127.5) {
      //console.log('light');
      $("body").css("--main-timeline-shadow", '#000');
    }
    else {
      //console.log('dark');
      $("body").css("--main-timeline-shadow", '#fff');
    }

  })();
}




/* ----- Photos manage main ----- */

function manageImagesShow(timePerCity,timePerPhoto,timelineno){
      $('#image-main').fadeIn( 250, function() {});

      //Show group of photos of city
      var cityno="cityImages"+timelineno;
     // var timelineprev=timelineno-1;
     // $('#cityImages'+timelineprev).hide();
      $('#cityImages'+timelineno).show();
      $('#cityImages'+timelineno+' #image'+timelineno+'-five-inner').show();//show desc
      //this.getColor
      handleDominantColor(timelineno,"five");
      currentCity=timelineno;

      //$('#cityImages'+timelineno).
      for (var i = 1; i <= 5; ++i){//5 images each
        imagePlay(i,timePerCity,timePerPhoto,timelineno);
      }
};


/* ----- Photos manage inner ----- */

function imagePlay(i,timePerCity,timePerPhoto,timelineno) {
  setTimeout(function() {
    //console.log(i,timelineno);
    if(i===1){
      handleDominantColor(timelineno,"four");
      $('#image'+timelineno+'-five-inner').fadeOut( "slow", function() {
      });//hide prev desc
      $('#image'+timelineno+'-four-inner').show();
      $( '#image'+timelineno+'-five-img').fadeOut("slow", function()
      {
        $( '#image'+timelineno+'-five').fadeOut( 'fast');
      });
    }
    else if(i===2){
      handleDominantColor(timelineno,"three");
      $('#image'+timelineno+'-four-inner').hide( "slow", function() {});//hide prev desc
      $('#image'+timelineno+'-three-inner').show();//hide prev desc
      $( '#image'+timelineno+'-four-img').fadeOut("slow", function()
      {
        $( '#image'+timelineno+'-four').fadeOut( 'fast');

      });
    }
    else if(i===3){
      handleDominantColor(timelineno,"two");
      $('#image'+timelineno+'-three-inner').hide( "slow", function() {});//hide prev desc
      $('#image'+timelineno+'-two-inner').show();
      $( '#image'+timelineno+'-three-img').fadeOut("slow", function()
      {
        $( '#image'+timelineno+'-three').fadeOut( 'fast');

      });
    }
    else if(i===4){
      handleDominantColor(timelineno,"one");
      $('#image'+timelineno+'-two-inner').hide( "slow", function() {});//hide prev desc
      $('#image'+timelineno+'-one-inner').show();
      $( '#image'+timelineno+'-two-img').fadeOut("slow", function()
      {
        $( '#image'+timelineno+'-two').fadeOut( 'fast');
      });
    }
    else if(i===5){
      $('#image'+timelineno+'-one-inner').hide( "slow", function() {});//hide prev desc
      $( '#image'+timelineno+'-one-img').fadeOut("slow", function()
      {
        $( '#image'+timelineno+'-one').fadeOut( 'fast');
      });
    }
    }, i*timePerPhoto);
}



/* ----- Descriptions placing, on load ----- */

function descPlacing() {
  for(var i=0;i<7;i++)
  {
      $('#image'+i+'-five-inner').css({ "top": "500px", "left": "900px" });
      $('#image'+i+'-four-inner').css({ "top": "200px", "left": "1200px" });
      $('#image'+i+'-three-inner').css({ "top": "300px", "left": "600px" });
      $('#image'+i+'-two-inner').css({ "top": "200px", "left": "200px" });
      $('#image'+i+'-one-inner').css({ "top": "500px", "left": "900px" });
   }
}
