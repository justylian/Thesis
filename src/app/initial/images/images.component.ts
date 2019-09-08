import { InfobubbleComponent } from './../infobubble/infobubble.component';
import { MapComponent } from './../map/map.component';
import { Component, OnInit } from '@angular/core';
import timesjson from '../../../assets/json/times.json';
import timelinejson from '../../../assets/json/timeline.json';
declare var $: any;
declare var jQuery: any;

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


    // ------------CITY 1
    compMap.manageInitialMin(1);// minify
    compBubble.hideBubble();
    setTimeout(function() {
      manageImagesShow(timePerCity,timePerPhoto,1);//city1
    }, timePerCityLocal+=3000);

    // ------------CITY 2
    setTimeout(function() {
      manageImagesHide(timePerCity,timePerPhoto,0);//hide prev
      compMap.manageInitialMax(0);
    }, timePerCityLocal+=timePerCity);
    setTimeout(function() {
      compMap.manageInitialMin(2);
    }, timePerCityLocal+=3000);
    setTimeout(function() {
      manageImagesShow(timePerCity,timePerPhoto,2);//
    }, timePerCityLocal+=3000);

    // ------------CITY 3
    setTimeout(function() {
      manageImagesHide(timePerCity,timePerPhoto,0);//hide prev
      compMap.manageInitialMax(0);
    }, timePerCityLocal+=timePerCity);
    setTimeout(function() {
      compMap.manageInitialMin(3);
    }, timePerCityLocal+=3000);
    setTimeout(function() {
      manageImagesShow(timePerCity,timePerPhoto,3);//
    }, timePerCityLocal+=3000);


  }
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
      $('#image'+timelineno+'-five-inner').hide();//hide prev desc
      $('#image'+timelineno+'-four-inner').show();//show current desc
    }
    else if(i===2){

      $('#image'+timelineno+'-four').fadeOut( "slow", function() {
      });
      $('#image'+timelineno+'-four-inner').hide();
      $('#image'+timelineno+'-three-inner').show();

    }
    else if(i===3){

      $('#image'+timelineno+'-three').fadeOut( "slow", function() {
      });
      $('#image'+timelineno+'-three-inner').hide();
      $('#image'+timelineno+'-two-inner').show();


    }
    else if(i===4){

      $('#image'+timelineno+'-two').fadeOut( "slow", function() {
      });
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
