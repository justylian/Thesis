import { DominantcolorService } from './../../services/dominantcolor.service';
import { DescplacingService } from './../../services/descplacing.service';
import { MusicComponent } from './../music/music.component';
import { InitialService } from './../../services/initial.service';
import { InfobubbleComponent } from './../infobubble/infobubble.component';
import { MapComponent } from './../map/map.component';
import { Component, OnInit } from '@angular/core';
import timesjson from '../../../assets/json/times.json';
import timelinejson from '../../../assets/json/timeline.json';
declare var require: any

declare var Load: any;
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
  citiesPastCount=Object.keys(timelinejson.citiesPast).length;

  timePerPhoto=timesjson.timePerPhoto;
  timePerCity=this.timePerPhoto*5;


  constructor(private compMap: MapComponent,private compBubble: InfobubbleComponent,private initialService: InitialService,private compMusic: MusicComponent,private descplacingService: DescplacingService ,private dominantcolorService:DominantcolorService) { }

  //public currentCity:number;
  ngOnInit() {

    Load.allTheThings();
    //descPlacing();
    //this.compMusic.manageMusic(6)
  }



  public slideShow(){
    firstTime=true;
    this.continueSlideShow(1);
  }



  /* ----- Next city in slideshow ----- */

  public nextCity(){
    var nextCity=currentCity;
    nextCity++;
    if(nextCity===7){
      nextCity=1;
    }
    if(nextCity>this.citiesPastCount)
    {
      nextCity=6;
    }
console.log(nextCity);
    $('#cityImages'+currentCity).hide( "slow", function() {
    });

    clearTimeouts();

    currentCity=nextCity;

    this.continueSlideShow(nextCity);

  }

    /* ----- Future city in slideshow ----- */

  public futureCity(){

    $('#cityImages'+currentCity).hide( "slow", function() {
    });

    clearTimeouts();

    currentCity=6;

    this.continueSlideShow(6);

  }

  /* ----- Previous city in slideshow ----- */

  public previousCity(){
    var previousCity=currentCity;
    previousCity--;
    if(previousCity===0){
      previousCity=6;
    }
    if(previousCity>this.citiesPastCount)
    {
      previousCity=this.citiesPastCount;
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
    var initialService=this.initialService;
    var descplacingService=this.descplacingService;
    var dominantcolorService=this.dominantcolorService;

    var compBubble=this.compBubble;
    var compMusic=this.compMusic;
    var timePerCity=this.timePerCity;
    var loop=this.citiesPastCount+1;
    //var timer=0;
    console.log(loop,startingCity);

    for (var i = startingCity; i <= 6; ++i){
      //setTimeout(function() {
        if(i<=this.citiesPastCount || i===6){
          console.log(i);
          continueSlideShowInner(timePerCity,timePerPhoto,compMusic,compMap,compBubble,initialService,startingCity,descplacingService,dominantcolorService,i);
        }

        /*if(i===6){ //loop
          i=1;
        }*/
    //}, timer+=timePerCity);
    }

  }


  public pause(){
    console.log("pause");
    playPause();


  }

}






/* ----- Play/Pause Slideshow  ----- */

var isPaused=false;

function playPause(){
  if(isPaused===false){
    isPaused=true;
  }
  else if(isPaused===true){
    isPaused=false;
  }
}



/* ----- Slideshow inner ----- */

var timer=0;
var firstTime=true;


function continueSlideShowInner(timePerCity,timePerPhoto,compMusic,compMap,compBubble,initialService,startingCity,descplacingService,dominantcolorService,i){

  var time2=3000;
  var time1=timePerCity;
  var multiplier=0;


  if( startingCity===i){
    multiplier=0;
    //clearTimeouts();
    console.log("clear timer 0");
    timer=0;

  }

  if(i===1){
      // ------------CITY 1
     // if(isPaused===false){

      if(startingCity===1 && firstTime===false){

        console.log("IFFFFF");

        setTimeout(function() {
          descplacingService.placeDescs(i);

          currentCity=i;
          multiplier=1;


          $('#image-main').fadeOut( 250, function() {});
          //hide prev
          compMusic.manageMusic(i);

          initialService.timelineFocus(i);

          compMap.manageInitialMax(0);
        },timer+=0);
        setTimeout(function() {

          compMap.manageInitialMin(1);

        },timer+=time2);
        setTimeout(function() {
          manageImagesShow(timePerCity,timePerPhoto,i,dominantcolorService);//
        },timer+=time2);
      }
      else{
        descplacingService.placeDescs(i);

        console.log("ELSE");

        firstTime=false;
        currentCity=i;
        compMusic.manageMusic(i);
        initialService.timelineFocus(i);
        compMap.manageInitialMin(1);// minify
        compBubble.hideBubble();
        setTimeout(function() {

          //descplacingService.placeDescs(i);
          manageImagesShow(timePerCity,timePerPhoto,1,dominantcolorService);//city1
          //continueSlideShowInner(timePerCity,timePerPhoto,compMap,compBubble,timer,upcomingCity,2);
        }, timer+=time2);
     // }
    }
  }
  else if(i!==1){

    //if(isPaused===false){

    console.log("multi 2"+multiplier);

    if(startingCity===i){

      setTimeout(function() {

        descplacingService.placeDescs(i);

        currentCity=i;
        multiplier=1;

        console.log("n"+i);
        console.log("n"+timer);
        console.log("changed city");

        $('#image-main').fadeOut( 250, function() {});
        //hide prev

        compMap.manageInitialMax(0);
      },timer+=0);
    }
    else{
      setTimeout(function() {
        descplacingService.placeDescs(i);

        currentCity=i;
        console.log("n"+i);
        console.log("n"+timer);

        $('#image-main').fadeOut( 250, function() {});
        //hide prev

        compMap.manageInitialMax(0);
      },timer+=time1);
    }
    setTimeout(function() {
      compMusic.manageMusic(i);

      initialService.timelineFocus(i);

      compMap.manageInitialMin(i);

    },timer+=time2);
    setTimeout(function() {
      //descplacingService.placeDescs(i);

      manageImagesShow(timePerCity,timePerPhoto,i,dominantcolorService);//
    },timer+=time2);
    if(i===6){
      setTimeout(function() {
        //descplacingService.placeDescs(i);
        compMap.manageInitialMax(0);
        compBubble.showBubble();
        compMap.showNextCity();
        firstTime=true;



      },timer+=time1);

    }

  //}
}
  multiplier++;

}

/* ----- Timeouts to zero ----- */

function clearTimeouts(){
  var id = window.setTimeout(function() {}, 0);
  while (id--) {
      window.clearTimeout(id); // will do nothing if no timeout with id is present
  }
}







/* ----- Photos manage main ----- */

function manageImagesShow(timePerCity,timePerPhoto,timelineno,dominantcolorService){
      $('#image-main').fadeIn( 250, function() {});

      //Show group of photos of city
      var cityno="cityImages"+timelineno;
     // var timelineprev=timelineno-1;
     // $('#cityImages'+timelineprev).hide();
      $('#cityImages'+timelineno).show();
      $('#cityImages'+timelineno+' #image'+timelineno+'-five-inner').show();//show desc


      dominantcolorService.handleDominantColor(timelineno,"five");
      currentCity=timelineno;

      for (var i = 1; i <= 5; ++i){//5 images each city
        imagePlay(i,timePerCity,timePerPhoto,timelineno,dominantcolorService);
      }
};


/* ----- Photos manage inner ----- */

function imagePlay(i,timePerCity,timePerPhoto,timelineno,dominantcolorService) {
  console.log("outpause"+timelineno+i);

    // tslint:disable-next-line: align
    setTimeout(function() {
      //if(isPaused===false){

          //console.log("inpause"+timelineno+i);
        //console.log(i,timelineno);

        if(i===1){
          $('#cityImages'+timelineno+' #image'+timelineno+'-four-inner').show( "fast", function() {});
          dominantcolorService.handleDominantColor(timelineno,"four");
          $('#image'+timelineno+'-five-inner').fadeOut( "slow", function() {
          });//hide prev desc
          $( '#image'+timelineno+'-five-img').fadeOut("slow", function()
          {
            $( '#image'+timelineno+'-five').fadeOut( 'fast');
          });
        }
        else if(i===2){
          $('#image'+timelineno+'-three-inner').show( "fast", function() {});

          dominantcolorService.handleDominantColor(timelineno,"three");
          $('#image'+timelineno+'-four-inner').hide( "slow", function() {});//hide prev desc
          $( '#image'+timelineno+'-four-img').fadeOut("slow", function()
          {
            $( '#image'+timelineno+'-four').fadeOut( 'fast');

          });
        }
        else if(i===3){
          $('#image'+timelineno+'-two-inner').show( "fast", function() {});

          dominantcolorService.handleDominantColor(timelineno,"two");
          $('#image'+timelineno+'-three-inner').hide( "slow", function() {});//hide prev desc
          $( '#image'+timelineno+'-three-img').fadeOut("slow", function()
          {
            $( '#image'+timelineno+'-three').fadeOut( 'fast');

          });
        }
        else if(i===4){
          $('#image'+timelineno+'-one-inner').show( "fast", function() {});

          dominantcolorService.handleDominantColor(timelineno,"one");
          $('#image'+timelineno+'-two-inner').hide( "slow", function() {});//hide prev desc
          $( '#image'+timelineno+'-two-img').fadeOut("slow", function()
          {
            $( '#image'+timelineno+'-two').fadeOut( 'fast');
          });
        }
        else if(i===5){
          $('#image'+timelineno+'-one-inner').hide( "slow", function() {});//hide prev desc
          $( '#image'+timelineno+'-one-img').fadeOut("slow", function()
          {
            $( '#image'+timelineno+'-one').fadeOut( 'fast', function()
            {
              $('#cityImages'+timelineno).hide();
              $( '#image'+timelineno+'-one-img').show();
              $( '#image'+timelineno+'-two-img').show();
              $( '#image'+timelineno+'-three-img').show();
              $( '#image'+timelineno+'-four-img').show();
              $( '#image'+timelineno+'-five-img').show();

              $( '#image'+timelineno+'-one').show();
              $( '#image'+timelineno+'-two').show();
              $( '#image'+timelineno+'-three').show();
              $( '#image'+timelineno+'-four').show();
              $( '#image'+timelineno+'-five').show();
            });
          });
        }
      //}

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
