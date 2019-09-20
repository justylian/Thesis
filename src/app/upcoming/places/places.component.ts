import { DominantcolorService } from './../../services/dominantcolor.service';
import { DescplacingService } from './../../services/descplacing.service';
import { Component, OnInit } from '@angular/core';
import timelinejson from '../../../assets/json/timeline.json';
import timesjson from '../../../assets/json/times.json';


declare var Load: any;
declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit {
  citiesFuture=timelinejson.citiesFuture;
  timePerPhoto=timesjson.timePerPhoto;
  timePerCity=this.timePerPhoto*5;


  constructor(private descplacingService: DescplacingService,private dominantcolorService:DominantcolorService) { }

  ngOnInit() {
  }




  /* ----- Photos manage main ----- */

  public manageImagesShow(timePerCity,timePerPhoto){
    var dominantcolorService=this.dominantcolorService;
    var descplacingService=this.descplacingService
    $('#image-main').fadeIn( 250, function() {});


    $('#cityImages6').show();
    $('#cityImages6 #image6-five-inner').show();//show desc

    descplacingService.placeDescs(6);
    dominantcolorService.handleDominantColor(6,"five");

    for (var i = 1; i <= 5; ++i){//5 images each city
      imagePlay(i,timePerCity,timePerPhoto,dominantcolorService);
    }
  };
}






/* ----- Photos manage inner ----- */

function imagePlay(i,timePerCity,timePerPhoto,dominantcolorService) {

// tslint:disable-next-line: align
setTimeout(function() {
  //if(isPaused===false){

      //console.log("inpause"+timelineno+i);
    //console.log(i,timelineno);

    if(i===1){
      $('#cityImages6 #image6-four-inner').show( "fast", function() {});
      dominantcolorService.handleDominantColor(6,"four");
      $('#image6-five-inner').fadeOut( "slow", function() {
      });//hide prev desc
      $( '#image6-five-img').fadeOut("slow", function()
      {
        $( '#image6-five').fadeOut( 'fast');
      });
    }
    else if(i===2){
      $('#image6-three-inner').show( "fast", function() {});

      dominantcolorService.handleDominantColor(6,"three");
      $('#image6-four-inner').hide( "slow", function() {});//hide prev desc
      $( '#image6-four-img').fadeOut("slow", function()
      {
        $( '#image6-four').fadeOut( 'fast');

      });
    }
    else if(i===3){
      $('#image6-two-inner').show( "fast", function() {});

      dominantcolorService.handleDominantColor(6,"two");
      $('#image6-three-inner').hide( "slow", function() {});//hide prev desc
      $( '#image6-three-img').fadeOut("slow", function()
      {
        $( '#image6-three').fadeOut( 'fast');

      });
    }
    else if(i===4){
      $('#image6-one-inner').show( "fast", function() {});

      dominantcolorService.handleDominantColor(6,"one");
      $('#image6-two-inner').hide( "slow", function() {});//hide prev desc
      $( '#image6-two-img').fadeOut("slow", function()
      {
        $( '#image6-two').fadeOut( 'fast');
      });
    }
    else if(i===5){
      $('#image6-one-inner').hide( "slow", function() {});//hide prev desc
      $( '#image6-one-img').fadeOut("slow", function()
      {
        $( '#image6-one').fadeOut( 'fast', function()
        {
          $('#cityImages6').hide();
          $( '#image6-one-img').show();
          $( '#image6-two-img').show();
          $( '#image6-three-img').show();
          $( '#image6-four-img').show();
          $( '#image6-five-img').show();

          $( '#image6-one').show();
          $( '#image6-two').show();
          $( '#image6-three').show();
          $( '#image6-four').show();
          $( '#image6-five').show();
        });
      });
    }
  //}

  }, i*timePerPhoto);

}
