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

    //this.futureCityState();
    //initialImagesFunc(this.timePerCity,this.timePerPhoto,this.delay);
  }

  public  futureCityState(): void {
    setTimeout(function() {

    },this.delay)
  }

  public slideShow(){
    var timePerCity=this.timePerCity;
    var timePerPhoto=this.timePerPhoto;
    var timelineno=1;
    var timePerCityLocal=0;
    var compMap=this.compMap;
    var compBubble=this.compBubble;

    this.continueSlideShow(1);


    // ------------CITY 2
    /*setTimeout(function() {
      manageImagesHide(timePerCity,timePerPhoto,0);//hide prev
      compMap.manageInitialMax(0);
    }, timePerCityLocal+=timePerCity);
    setTimeout(function() {
      compMap.manageInitialMin(2);
    }, timePerCityLocal+=3000);
    setTimeout(function() {
      manageImagesShow(timePerCity,timePerPhoto,2);//
    }, timePerCityLocal+=3000);*/
  }


  public nextCity(){
    var nextCity=currentCity;
    nextCity++;
    if(nextCity===6){
      nextCity=0;
    }
    //manageImagesHide(this.timePerCity,this.timePerPhoto,currentCity)
    $('#cityImages'+currentCity).hide( "slow", function() {
    });

    clearTimeouts();

    currentCity=nextCity;

    //manageImagesShow(this.timePerCity,this.timePerPhoto,nextCity);
    this.continueSlideShow(3);
/*
    var timePerCity=this.timePerCity;
    var timePerPhoto=this.timePerPhoto;
    var timePerCityLocal=0;
    var compMap=this.compMap;

    setTimeout(function() {
      manageImagesHide(timePerCity,timePerPhoto,0);//hide prev
      compMap.manageInitialMax(0);
    }, timePerCityLocal);
    setTimeout(function() {
      compMap.manageInitialMin(nextCity);
    }, timePerCityLocal+=3000);
    setTimeout(function() {
      manageImagesShow(timePerCity,timePerPhoto,nextCity);//
    }, timePerCityLocal+=3000);*/

  }
  public continueSlideShow(startingCity){
    var timePerCity=this.timePerCity;
    var timePerPhoto=this.timePerPhoto;
    var compMap=this.compMap;
    var compBubble=this.compBubble;
    var timePerCity=this.timePerCity;
    var timePerCityLocal=0;
    //console.log(upcomingCity);

    for (var i = startingCity; i <= 3; ++i){
      //setTimeout(function() {
        console.log(i);
        continueSlideShowInner(timePerCity,timePerPhoto,compMap,compBubble,timePerCityLocal,startingCity,i);
        if(i===7){ //loop
          i=1;
        }
    //}, timePerCityLocal+=timePerCity);
    }

  }


}
function continueSlideShowInner(timePerCity,timePerPhoto,compMap,compBubble,timePerCityLocal,startingCity,i){

  var time2=3000;
  var time1=timePerCity;
  var multiplier=0;
  if(startingCity!==1){
    multiplier=0;
    clearTimeouts();
    console.log("clear");
    timePerCityLocal=0;

  }

  if(i===1){
      // ------------CITY 1
      console.log("he"+i);

      compMap.manageInitialMin(1);// minify
      compBubble.hideBubble();
      setTimeout(function() {
        manageImagesShow(timePerCity,timePerPhoto,1);//city1
        //continueSlideShowInner(timePerCity,timePerPhoto,compMap,compBubble,timePerCityLocal,upcomingCity,2);
      }, timePerCityLocal+=time2);
  }
  //console.log(i);
  multiplier++;

  if(i===2){
    console.log("multi"+multiplier);

    if(startingCity===2){

      setTimeout(function() {
        multiplier=1;

        console.log("n"+i);
        manageImagesHide(timePerCity,timePerPhoto,0);//hide prev
        compMap.manageInitialMax(0);
      },timePerCityLocal+=0);
    }
    else{
      setTimeout(function() {
        console.log("n"+i);
        manageImagesHide(timePerCity,timePerPhoto,0);//hide prev
        compMap.manageInitialMax(0);
      },timePerCityLocal+=time1*multiplier);
    }
    setTimeout(function() {
      compMap.manageInitialMin(i);

    },timePerCityLocal+=time2*multiplier);
    setTimeout(function() {
      manageImagesShow(timePerCity,timePerPhoto,i);//


    },timePerCityLocal+=time2*multiplier);
  }
  multiplier++;

  if(i==3){
    console.log("multi"+multiplier);

    if(startingCity===3){
      setTimeout(function() {
        multiplier=1;
        console.log("n"+i);
        manageImagesHide(timePerCity,timePerPhoto,0);//hide prev
        compMap.manageInitialMax(0);
      },timePerCityLocal+=0);
    }
    else{
      setTimeout(function() {
        console.log("n"+i);
        manageImagesHide(timePerCity,timePerPhoto,0);//hide prev
        compMap.manageInitialMax(0);
      },timePerCityLocal+=time1*multiplier);
    }

    setTimeout(function() {
      compMap.manageInitialMin(i);

    },timePerCityLocal+=time2*multiplier);
    setTimeout(function() {
      manageImagesShow(timePerCity,timePerPhoto,i);//

    },timePerCityLocal+=time2*multiplier);
  }


/*
  setTimeout(function() {
    console.log(upcomingCity);

    manageImagesHide(timePerCity,timePerPhoto,0);//hide prev
    compMap.manageInitialMax(0);
  }, timePerCityLocal+=timePerCity);
  setTimeout(function() {
    compMap.manageInitialMin(upcomingCity);
  }, timePerCityLocal+=3000);
  setTimeout(function() {
    manageImagesShow(timePerCity,timePerPhoto,upcomingCity);//
  }, timePerCityLocal+=3000);*/
}

function clearTimeouts(){
  var id = window.setTimeout(function() {}, 0);

  while (id--) {
      window.clearTimeout(id); // will do nothing if no timeout with id is present
  }
}

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

function initialImagesFunc(timePerCity,timePerPhoto,delay){
  setTimeout(function() {
    //manageImages(timePerCity,timePerPhoto);
  },delay)
};


function innerImagesFuncHide(){
  $('#image-main').fadeOut( 250, function() {});
}



function manageImagesHide(timePerCity,timePerPhoto,timelineno){
    $('#image-main').fadeOut( 250, function() {});

};



function manageImagesShow(timePerCity,timePerPhoto,timelineno){

      $('#image-main').fadeIn( 250, function() {});

      //Show group of photos of city
      var cityno="cityImages"+timelineno;
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

function imagePlay(i,timePerCity,timePerPhoto,timelineno) {
  setTimeout(function() {
    console.log(i,timelineno);

    if(i===1){
      $('#image'+timelineno+'-five').fadeOut( "slow", function() {
      });
      handleDominantColor(timelineno,"four");

      $('#image'+timelineno+'-five-inner').hide();//hide prev desc
      $('#image'+timelineno+'-four-inner').show();//show current desc

    }
    else if(i===2){

      $('#image'+timelineno+'-four').fadeOut( "slow", function() {
      });
      handleDominantColor(timelineno,"three");

      $('#image'+timelineno+'-four-inner').hide();
      $('#image'+timelineno+'-three-inner').show();


    }
    else if(i===3){

      $('#image'+timelineno+'-three').fadeOut( "slow", function() {
      });
      handleDominantColor(timelineno,"two");

      $('#image'+timelineno+'-three-inner').hide();
      $('#image'+timelineno+'-two-inner').show();



    }
    else if(i===4){

      $('#image'+timelineno+'-two').fadeOut( "slow", function() {
      });
      handleDominantColor(timelineno,"one");
      $('#image'+timelineno+'-two-inner').hide();
      $('#image'+timelineno+'-one-inner').show();



    }
    else if(i===5){

      $('#image'+timelineno+'-one').fadeOut( "slow", function() {
      });
      $('#image'+timelineno+'-one-inner').hide();


    }
    }, i*timePerPhoto);
}



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
