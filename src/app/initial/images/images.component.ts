import { MusicComponent } from './../music/music.component';
import { InitialService } from './../../services/initial.service';
import { InfobubbleComponent } from './../infobubble/infobubble.component';
import { MapComponent } from './../map/map.component';
import { Component, OnInit } from '@angular/core';
import timesjson from '../../../assets/json/times.json';
import timelinejson from '../../../assets/json/timeline.json';
const { getColorFromURL } = require('color-thief-node');
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
  timePerPhoto=timesjson.timePerPhoto;
  timePerCity=timesjson.timePerCity;
  delay=timesjson.delay;


  constructor(private compMap: MapComponent,private compBubble: InfobubbleComponent,private initialService: InitialService,private compMusic: MusicComponent ) { }

  //public currentCity:number;
  ngOnInit() {
    Load.allTheThings();
    //descPlacing();
    //this.compMusic.manageMusic(6)
  }

  public  futureCityState(): void {
    setTimeout(function() {

    },this.delay)
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
    var compBubble=this.compBubble;
    var compMusic=this.compMusic;
    var timePerCity=this.timePerCity;
    //var timer=0;
    //console.log(upcomingCity);

    for (var i = startingCity; i <= 6; ++i){
      //setTimeout(function() {
        console.log(i);
        continueSlideShowInner(timePerCity,timePerPhoto,compMusic,compMap,compBubble,initialService,startingCity,i);
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
/* ----- Desc placing  ----- */

function getColors(i){
  for(var j=5;j>=1;j--){
    var length=0;
    var templength=0;
    var lessx=300;
    var lessy=800;
    length=extractColors('myCanvas',300,800,j,i);
    colorList={};
    templength=extractColors('myCanvas1',600,800,j,i);
    colorList={};

    if(length>templength){
      length=templength;
      lessx=600;
      lessy=800;
    }
       // console.log(length);
    //console.log(templength);
    templength=extractColors('myCanvas2',400,100,j,i);
    colorList={};

    //console.log(templength);
    if(length>templength){
      length=templength;
      lessx=400;
      lessy=100;
    }

    templength=extractColors('myCanvas3',300,600,j,i);
    colorList={};

    //console.log(templength);
    if(length>templength){
      length=templength;
      lessx=300;
      lessy=600;
    }
    templength=extractColors('myCanvas4',1300,100,j,i);
    colorList={};

    //console.log(templength);
    if(length>templength){
      length=templength;
      lessx=1300;
      lessy=100;
    }
    templength=extractColors('myCanvas5',700,50,j,i);
    colorList={};

    //console.log(templength);
    if(length>templength){
      length=templength;
      lessx=700;
      lessy=50;
    }    
    console.log(length,lessx,lessy);


    if(j===5){
      $('#image'+i+'-five-inner').css({ "top": lessy, "left": lessx });
    }
    else  if(j===4){
      $('#image'+i+'-four-inner').css({ "top": lessy, "left": lessx });
    }else  if(j===3){
      $('#image'+i+'-three-inner').css({ "top": lessy, "left": lessx  });
    }else  if(j===2){
      $('#image'+i+'-two-inner').css({ "top": lessy, "left": lessx  });
    }else{
      $('#image'+i+'-one-inner').css({ "top": lessy, "left": lessx  });
    }

  }


}





var colorList = {};

function extractColors(cnv,x,y,j,i){
        var canvas : any = document.getElementById(cnv);
        var context = canvas.getContext('2d');
        if(j===5){
          var img = document.getElementById("image"+i+"-five-img");
        }
        else if(j===4){
          var img = document.getElementById("image"+i+"-four-img");
        }
        else if(j===3){
          var img = document.getElementById("image"+i+"-three-img");
        }
        else if(j===2){
          var img = document.getElementById("image"+i+"-two-img");
        }
        else {
          var img = document.getElementById("image"+i+"-one-img");
        }
        context.drawImage(img,x,y,250,200,0, 0,250,200);

        var imageData = context.getImageData(0, 0, 250, 200);
        var data = imageData.data;
        var i, n;

        // quickly iterate over all pixels
        for(i = 0, n = data.length; i < n; i += 4) {
           var r  = data[i];
           var g  = data[i + 1];
           var b  = data[i + 2];
           var hex = "rgb("+r+","+g+","+b+")";
            if (!(hex in colorList)){
                colorList[hex]=1;
            } else {
                colorList[hex]++;
            }
        }
        var keys = Object.keys(colorList);
        return keys.length;
}

/*
function rgb2hex(rgb) {
  rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  function hex(x) {
      return ("0" + parseInt(x).toString(16)).slice(-2);
  }
  return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}
*/



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


function continueSlideShowInner(timePerCity,timePerPhoto,compMusic,compMap,compBubble,initialService,startingCity,i){

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
          getColors(i);

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
          manageImagesShow(timePerCity,timePerPhoto,i);//
        },timer+=time2);
      }
      else{
        getColors(i);

        console.log("ELSE");

        firstTime=false;
        currentCity=i;
        compMusic.manageMusic(i);
        initialService.timelineFocus(i);
        compMap.manageInitialMin(1);// minify
        compBubble.hideBubble();
        setTimeout(function() {

          //getColors(i);
          manageImagesShow(timePerCity,timePerPhoto,1);//city1
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
        getColors(i);

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
        getColors(i);

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
      //getColors(i);

      manageImagesShow(timePerCity,timePerPhoto,i);//
    },timer+=time2);
    if(i===6){
      setTimeout(function() {
        //getColors(i);
        compMap.manageInitialMax(0);
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


      handleDominantColor(timelineno,"five");
      currentCity=timelineno;

      for (var i = 1; i <= 5; ++i){//5 images each city
        imagePlay(i,timePerCity,timePerPhoto,timelineno);
      }
};


/* ----- Photos manage inner ----- */

function imagePlay(i,timePerCity,timePerPhoto,timelineno) {
  console.log("outpause"+timelineno+i);

    setTimeout(function() {
      if(isPaused===false){

          //console.log("inpause"+timelineno+i);
        //console.log(i,timelineno);

        if(i===1){
          $('#image'+timelineno+'-four-inner').show( "slow", function() {});
          handleDominantColor(timelineno,"four");
          $('#image'+timelineno+'-five-inner').fadeOut( "slow", function() {
          });//hide prev desc
          $( '#image'+timelineno+'-five-img').fadeOut("slow", function()
          {
            $( '#image'+timelineno+'-five').fadeOut( 'fast');
          });
        }
        else if(i===2){
          $('#image'+timelineno+'-three-inner').show( "slow", function() {});

          handleDominantColor(timelineno,"three");
          $('#image'+timelineno+'-four-inner').hide( "slow", function() {});//hide prev desc
          $( '#image'+timelineno+'-four-img').fadeOut("slow", function()
          {
            $( '#image'+timelineno+'-four').fadeOut( 'fast');

          });
        }
        else if(i===3){
          $('#image'+timelineno+'-two-inner').show( "slow", function() {});

          handleDominantColor(timelineno,"two");
          $('#image'+timelineno+'-three-inner').hide( "slow", function() {});//hide prev desc
          $( '#image'+timelineno+'-three-img').fadeOut("slow", function()
          {
            $( '#image'+timelineno+'-three').fadeOut( 'fast');

          });
        }
        else if(i===4){
          $('#image'+timelineno+'-one-inner').show( "slow", function() {});

          handleDominantColor(timelineno,"one");
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
            $( '#image'+timelineno+'-one').fadeOut( 'fast');
          });
        }
      }
      else{

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
