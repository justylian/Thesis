import { LeapService } from './../../services/leap.service';
import { DominantcolorService } from './../../services/dominantcolor.service';
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


  constructor(private dominantcolorService:DominantcolorService) {
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


  currentImage=1;

  /* ----- Next Photos manage main ----- */

  public nextImageUpcoming(){

    var nextImage=this.currentImage;
    nextImage++;
    if(nextImage===6){
      nextImage=1;
    }

    console.log(nextImage);
    this.manageImagesUpcoming(nextImage);

    this.currentImage=nextImage;

  }

  /* ----- Hide manage main ----- */


  public hideImagesUpcoming(){
    $('#places').fadeOut( 250, function() {});
  }

  /* ----- Photos manage main ----- */

  public manageImagesUpcoming(i){
    var timePerCity=this.timePerCity;
    var timePerPhoto=this.timePerPhoto;
    var dominantcolorService=this.dominantcolorService;
    getColors();
    $('#places').fadeIn( 250, function() {});
    console.log(i);

    if(i===5){
      this.currentImage=5;
      //$('#cityImages6 #image6-four').hide();
      $('#cityImages6 #image6-three').hide();
      $('#cityImages6 #image6-one').hide();
      $('#cityImages6 #image6-two').hide();
      $('#cityImages6 #image6-four').fadeIn('fast');
      $('#cityImages6').show();
      $('#cityImages6 #image6-five').fadeIn('slow');
      $('#cityImages6 #image6-four').fadeOut('fast');

      dominantcolorService.handleDominantColor(6,"five");
      $('#cityImages6 #image6-five-inner').show();//show desc
    }
    else if(i===4){
      this.currentImage=4;

      $('#cityImages6 #image6-five').hide();
      //$('#cityImages6 #image6-three').hide();
      $('#cityImages6 #image6-one').hide();
      $('#cityImages6 #image6-two').hide();
      $('#cityImages6 #image6-three').fadeIn('fast');

      $('#cityImages6').show();
      $('#cityImages6 #image6-four').fadeIn('slow');
      $('#cityImages6 #image6-three').fadeOut('fast');

      dominantcolorService.handleDominantColor(6,"four");
      $('#cityImages6 #image6-four-inner').show();//show desc

    }
    else if(i===3){
      this.currentImage=3;

      $('#cityImages6 #image6-five').hide();
      $('#cityImages6 #image6-four').hide();
      $('#cityImages6 #image6-one').hide();
      //$('#cityImages6 #image6-two').hide();
      $('#cityImages6 #image6-two').fadeIn('fast');

      $('#cityImages6').show();
      $('#cityImages6 #image6-three').fadeIn('slow');
      $('#cityImages6 #image6-two').fadeOut('fast');

      dominantcolorService.handleDominantColor(6,"three");
      $('#cityImages6 #image6-three-inner').show();//show desc
    }
    else if(i===2){
      this.currentImage=2;

      $('#cityImages6 #image6-five').hide();
      $('#cityImages6 #image6-four').hide();
      $('#cityImages6 #image6-three').hide();
      //$('#cityImages6 #image6-one').hide();
      $('#cityImages6 #image6-one').fadeIn('fast');
      $('#cityImages6').show();
      $('#cityImages6 #image6-two').fadeIn('slow');
      $('#cityImages6 #image6-one').fadeOut('fast');

      dominantcolorService.handleDominantColor(6,"two");
      $('#cityImages6 #image6-two-inner').show();//show desc
    }
    else if(i===1){
      this.currentImage=1;

      //$('#cityImages6 #image6-five').hide();
      $('#cityImages6 #image6-four').hide();
      $('#cityImages6 #image6-three').hide();
      $('#cityImages6 #image6-two').hide();
      $('#cityImages6 #image6-five').fadeIn('fast');

      $('#cityImages6').show();
      $('#cityImages6 #image6-one').fadeIn('slow');
      $('#cityImages6 #image6-five').fadeOut('fast');


      dominantcolorService.handleDominantColor(6,"one");
      $('#cityImages6 #image6-one-inner').show();//show desc
    }

    //descplacingService.placeDescs(6);




  };




  /* ----- Photos manage main ----- */
   time;
  flag=false;

  public manageImagesShow(startingImage){
    var timePerCity=this.timePerCity;
    var timePerPhoto=this.timePerPhoto;
    var dominantcolorService=this.dominantcolorService;
    getColors();

    $('#places').fadeIn( 250, function() {});
    console.log(startingImage);

    if(startingImage===1){
      $('#cityImages6').show();
      $('#cityImages6 #image6-five-inner').show();//show desc
    }
    else if(startingImage===2){
      $('#cityImages6 #image6-five').hide();
      $('#cityImages6').show();
      $('#cityImages6 #image6-four-inner').show();//show desc

    }
    else if(startingImage===3){
      $('#cityImages6 #image6-five').hide();
      $('#cityImages6 #image6-four').hide();

      $('#cityImages6').show();
      $('#cityImages6 #image6-three-inner').show();//show desc
    }
    else if(startingImage===4){
      $('#cityImages6 #image6-five').hide();
      $('#cityImages6 #image6-four').hide();
      $('#cityImages6 #image6-three').hide();
      $('#cityImages6').show();
      $('#cityImages6 #image6-two-inner').show();//show desc
    }
    else if(startingImage===5){
      $('#cityImages6 #image6-five').hide();
      $('#cityImages6 #image6-four').hide();
      $('#cityImages6 #image6-three').hide();
      $('#cityImages6 #image6-two').hide();
      $('#cityImages6').show();
      $('#cityImages6 #image6-one-inner').show();//show desc
    }

    //descplacingService.placeDescs(6);
    dominantcolorService.handleDominantColor(6,"five");

    for (var i = startingImage; i <= 5; ++i){//5 images each city
      if(this.flag===false){
        this.time=i;
      }
      imagePlay(i,timePerCity,timePerPhoto,dominantcolorService,startingImage,this.flag,this.time);
    }

  };
}






/* ----- Photos manage inner ----- */

function imagePlay(i,timePerCity,timePerPhoto,dominantcolorService,startingImage,flag,time) {

// tslint:disable-next-line: align

if(startingImage!==1){
  if(flag===false){

    time=1;
    flag=true;
  }
}
else{
  time=i;
}

console.log(i);
setTimeout(function() {

  //if(isPaused===false){

      //console.log("inpause"+timelineno+i);
    //console.log(i,timelineno);

    if(i===1){
      $('#cityImages6 #image6-four-inner').show( "fast", function() {});
      dominantcolorService.handleDominantColor(6,"four");
      $(' #cityImages6 #image6-five-inner').fadeOut( "slow", function() {
      });//hide prev desc
      $( '#cityImages6 #image6-five-img').fadeOut("slow", function()
      {
        $( '#cityImages6 #image6-five').fadeOut( 'fast');
      });
    }
    else if(i===2){
      $('#cityImages6 #image6-three-inner').show( "fast", function() {});

      dominantcolorService.handleDominantColor(6,"three");
      $('#cityImages6 #image6-four-inner').hide( "slow", function() {});//hide prev desc
      $( '#cityImages6 #image6-four-img').fadeOut("slow", function()
      {
        $( '#cityImages6 #image6-four').fadeOut( 'fast');

      });
    }
    else if(i===3){
      $('#cityImages6 #image6-two-inner').show( "fast", function() {});

      dominantcolorService.handleDominantColor(6,"two");
      $('#cityImages6 #image6-three-inner').hide( "slow", function() {});//hide prev desc
      $( '#cityImages6 #image6-three-img').fadeOut("slow", function()
      {
        $( '#cityImages6 #image6-three').fadeOut( 'fast');

      });
    }
    else if(i===4){
      $('#cityImages6 #image6-one-inner').show( "fast", function() {});

      dominantcolorService.handleDominantColor(6,"one");
      $('#cityImages6 #image6-two-inner').hide( "slow", function() {});//hide prev desc
      $( '#cityImages6 #image6-two-img').fadeOut("slow", function()
      {
        $( '#cityImages6 #image6-two').fadeOut( 'fast');
      });
    }
    else if(i===5){
      $('#cityImages6 #image6-one-inner').hide( "slow", function() {});//hide prev desc
      $( '#cityImages6 #image6-one-img').fadeOut("slow", function()
      {
        $( '#cityImages6 #image6-one').fadeOut( 'fast', function()
        {
          $('#cityImages6').hide();
          $( '#cityImages6 #image6-one-img').show();
          $( '#cityImages6 #image6-two-img').show();
          $( '#cityImages6 #image6-three-img').show();
          $( '#cityImages6 #image6-four-img').show();
          $( '#cityImages6 #image6-five-img').show();

          $( '#cityImages6 #image6-one').show();
          $( '#cityImages6 #image6-two').show();
          $( '#cityImages6 #image6-three').show();
          $( '#cityImages6 #image6-four').show();
          $( '#cityImages6 #image6-five').show();
          $('#places').fadeOut();

        });
      });

    }
  //}

  }, time*timePerPhoto);

}






/* ----- Desc placing  ----- */

function getColors(){
  var i=6;
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
    templength=extractColors('myCanvas2',400,150,j,i);
    colorList={};

    //console.log(templength);
    if(length>templength){
      length=templength;
      lessx=400;
      lessy=150;
    }

    templength=extractColors('myCanvas3',300,600,j,i);
    colorList={};

    //console.log(templength);
    if(length>templength){
      length=templength;
      lessx=300;
      lessy=600;
    }
    templength=extractColors('myCanvas4',1300,150,j,i);
    colorList={};

    //console.log(templength);
    if(length>templength){
      length=templength;
      lessx=1300;
      lessy=150;
    }
    templength=extractColors('myCanvas5',900,50,j,i);
    colorList={};

    //console.log(templength);
    if(length>templength){
      length=templength;
      lessx=900;
      lessy=50;
    }
    console.log(length,lessx,lessy);


    if(j===5){
      $('#cityImages6 #image6-five-inner').css({ "top": lessy, "left": lessx });
    }
    else  if(j===4){
      $('#cityImages6 #image6-four-inner').css({ "top": lessy, "left": lessx });
    }else  if(j===3){
      $('#cityImages6 #image6-three-inner').css({ "top": lessy, "left": lessx  });
    }else  if(j===2){
      $('#cityImages6 #image6-two-inner').css({ "top": lessy, "left": lessx  });
    }else{
      $('#cityImages6 #image6-one-inner').css({ "top": lessy, "left": lessx  });
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
