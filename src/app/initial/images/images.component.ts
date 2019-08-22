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
    initialImagesFunc(this.timePerCity,this.timePerPhoto,this.delay);
  }

}


function initialImagesFunc(timePerCity,timePerPhoto,delay){
  setTimeout(function() {
    innerImagesFunc(timePerCity,timePerPhoto);
  },delay)
};



function innerImagesFunc(timePerCity,timePerPhoto){
  $('#image-main').fadeIn( 250, function() {
  });
  for (var i = 1; i <= 6; ++i){
    imagePlay(i,timePerCity,timePerPhoto);
}
};





function imagePlay(i,timePerCity,timePerPhoto) {



  setTimeout(function() {
    if(i===1){
      setTimeout(function() {
      $('#image-five').fadeOut( "slow", function() {
      });
    },timePerPhoto)
    }
    else if(i===2){
      setTimeout(function() {

      $('#image-four').fadeOut( "slow", function() {
      });
    },timePerPhoto)
    }
    else if(i===3){
      $('#image-three').fadeOut( "slow", function() {
      });
    }
    else if(i===4){
      $('#image-two').fadeOut( "slow", function() {
      });
    }
    else if(i===5){
      $('#image-one').fadeOut( "slow", function() {
      });
    }

    }, i*timePerCity);
}
