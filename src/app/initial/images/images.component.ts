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


  constructor() { }

  ngOnInit() {
    //this.futureCityState();
    //initialImagesFunc(this.timePerCity,this.timePerPhoto,this.delay);
  }

  public  futureCityState(): void {
    setTimeout(function() {

    },this.delay)
  }

  public futureCitySlideshowImages(){
    var timePerCity=this.timePerCity;
    var timePerPhoto=this.timePerPhoto;
    var timelineno=1;
    var timePerCityLocal=0;

    innerImagesFunc(timePerCity,timePerPhoto,timelineno);//city1
    setTimeout(function() {
      innerImagesFunc(timePerCity,timePerPhoto,2);
    }, timePerCityLocal+=timePerCity);
      setTimeout(function() {
        innerImagesFunc(timePerCity,timePerPhoto,3);
      }, timePerCityLocal+=timePerCity);
      setTimeout(function() {
        innerImagesFunc(timePerCity,timePerPhoto,4);
      }, timePerCityLocal+=timePerCity);
      setTimeout(function() {
        innerImagesFunc(timePerCity,timePerPhoto,5);
      }, timePerCityLocal+=timePerCity);
      setTimeout(function() {
        innerImagesFunc(timePerCity,timePerPhoto,6);
      }, timePerCityLocal+=timePerCity);


  }
}


function initialImagesFunc(timePerCity,timePerPhoto,delay){
  setTimeout(function() {
    //innerImagesFunc(timePerCity,timePerPhoto);
  },delay)
};



function innerImagesFunc(timePerCity,timePerPhoto,timelineno){
  $('#image-main').fadeIn( 250, function() {});

  var cityno="cityImages"+timelineno;
  $('#cityImages'+timelineno).show();

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
    }
    else if(i===2){

      $('#image'+timelineno+'-four').fadeOut( "slow", function() {
      });
    }
    else if(i===3){

      $('#image'+timelineno+'-three').fadeOut( "slow", function() {
      });

    }
    else if(i===4){

      $('#image'+timelineno+'-two').fadeOut( "slow", function() {
      });

    }
    else if(i===5){

      $('#image'+timelineno+'-one').fadeOut( "slow", function() {
      });

    }
    }, i*timePerPhoto);
}
