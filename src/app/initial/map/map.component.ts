import { SocketService } from './../../services/socket.service';
import { InfobubbleComponent } from './../infobubble/infobubble.component';
import { Component, OnInit } from '@angular/core';
import { UpcomingService } from './../../services/upcoming.service';
declare var $: any;
declare var jQuery: any;
import timelinejson from '../../../assets/json/timeline.json';
import timesjson from '../../../assets/json/times.json';
import citiesonmap from '../../../assets/json/citiesonmap.json';
declare var require: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  citiesPast=timelinejson.citiesPast;
  citiesPastCount=Object.keys(timelinejson.citiesPast).length;

  citiesFuture=timelinejson.citiesFuture;
  timePerPhoto=timesjson.timePerPhoto;
  timePerCity=this.timePerPhoto*5;
  images= new Array(5);
  once2=true;
  allfound=false;


  constructor(private upcomingService:UpcomingService,private socketService:SocketService) {
    this.socketService.getCity().subscribe(city => {
      //console.log(city);
      this.citiesFuture[0].cityName= city;
      findCityLoc(0,this.citiesPast,this.citiesFuture,this.citiesFuture[0].cityName);

      //this.loadedAway=true;

    });
    this.upcomingService.images$.subscribe(
      (k) => {
        if(this.once2===true){
          this.images=k;
          //console.log(this.images);
          this.initPin();
          this.once2=false;
        }

      }
    );
    this.upcomingService.found$.subscribe(
      (allfound) => {
        //alert('(Component2) Method called!'+i);
        //console.log(l);
        this.allfound=allfound;


      }
    );
  }

  ngOnInit() {


  }

  public showNextCity(){
    $('#next-city').fadeIn( 400, function() {});

  }
  public hideNextCity(){
    $('#next-city').fadeOut( 400, function() {});

  }
  public manageInitialMax(timelineno){
        mapMaximize();

  }
  public manageInitialMin(timelineno){
      var cityName=findCityName(timelineno,this.citiesPast,this.images,this.citiesFuture);//change city name
      //cityFocus(timelineno);
      findCityLoc(timelineno,this.citiesPast,this.citiesFuture,cityName);//change pin

      setTimeout(function() {
          mapMinify();
      },3000)
  }

  public initPin(){
    /*$('#image-stack-1').css('background-image', 'url(' + this.citiesFuture[0].photos.one.urlmin + ')');
    $('#image-stack-2').css('background-image', 'url(' + this.citiesFuture[0].photos.two.urlmin + ')');
    $('#image-stack-3').css('background-image', 'url(' + this.citiesFuture[0].photos.three.urlmin + ')');
    $('#image-stack-4').css('background-image', 'url(' + this.citiesFuture[0].photos.four.urlmin + ')');
    $('#image-stack-5').css('background-image', 'url(' + this.citiesFuture[0].photos.five.urlmin + ')');*/
    $('#image-stack-1').css('background-image', 'url(' + this.images[0].previewURL + ')');
    $('#image-stack-2').css('background-image', 'url(' + this.images[1].previewURL + ')');
    $('#image-stack-3').css('background-image', 'url(' + this.images[2].previewURL + ')');
    $('#image-stack-4').css('background-image', 'url(' + this.images[3].previewURL + ')');
    $('#image-stack-5').css('background-image', 'url(' + this.images[4].previewURL + ')');
  }
}



/* --------- Change pin location & city name ---------*/
function changeCityNamePin(timelineno,cityName,cityLocLeft,cityLocTop){
  $('.city-map-name-inner').fadeOut( 400, function() {
    $('.city-map-name-inner').text(cityName);
  });

  $('.city-map-name-inner').fadeIn( 400, function() {});


  if(timelineno===6){
    $('#next-city').fadeIn( 400, function() {});
  }
  if(timelineno===1){
    $('#next-city').fadeOut( 400, function() {});
  }




  $('#pin-images').fadeOut( 400, function() {
    $('#pin-images').animate({ left: cityLocLeft, top: cityLocTop}, 200);
    $('#pin-images').fadeIn( 600, function() {
    });
  });

}

/* --------- Change pin-images ---------*/
function changePinPhotos(timelineno,citiesPast,images){
  if(timelineno===6){
    setTimeout(function() {

      //$('#image-stack-1').attr("data-src",'url(' + citiesFuture[0].photos.one.url + ')');
      $('#image-stack-1').css('background-image', 'url(' + images[0].previewURL + ')');
      $('#image-stack-2').css('background-image', 'url(' + images[1].previewURL + ')');
      $('#image-stack-3').css('background-image', 'url(' + images[2].previewURL + ')');
      $('#image-stack-4').css('background-image', 'url(' + images[3].previewURL + ')');
      $('#image-stack-5').css('background-image', 'url(' + images[4].previewURL + ')');
      /*
      $('#image-stack-1').css('background-image', 'url(' + citiesFuture[0].photos.one.urlmin + ')');
      $('#image-stack-2').css('background-image', 'url(' + citiesFuture[0].photos.two.urlmin + ')');
      $('#image-stack-3').css('background-image', 'url(' + citiesFuture[0].photos.three.urlmin + ')');
      $('#image-stack-4').css('background-image', 'url(' + citiesFuture[0].photos.four.urlmin + ')');
      $('#image-stack-5').css('background-image', 'url(' + citiesFuture[0].photos.five.url + ')');
*/
      },400)
  }
  else {
    setTimeout(function() {
    $('#image-stack-1').css('background-image', 'url(' + citiesPast[timelineno-1].photos.one.urlmin + ')');
    $('#image-stack-2').css('background-image', 'url(' + citiesPast[timelineno-1].photos.two.urlmin + ')');
    $('#image-stack-3').css('background-image', 'url(' + citiesPast[timelineno-1].photos.three.urlmin + ')');
    $('#image-stack-4').css('background-image', 'url(' + citiesPast[timelineno-1].photos.four.urlmin + ')');
    $('#image-stack-5').css('background-image', 'url(' + citiesPast[timelineno-1].photos.five.urlmin + ')');
    },400)
  }
}




/* --------- Find next city ---------*/
function findCityName(timelineno,citiesPast,images,citiesFuture){
  if(timelineno===1){
    changePinPhotos(timelineno,citiesPast,images);
    return citiesPast[0].cityName;
  }
  else if(timelineno===2){
    changePinPhotos(timelineno,citiesPast,images);
    return citiesPast[1].cityName;
  }
  else if(timelineno===3){
    changePinPhotos(timelineno,citiesPast,images);
    return citiesPast[2].cityName;
  }
  else if(timelineno===4){
    changePinPhotos(timelineno,citiesPast,images);
    return citiesPast[3].cityName;
  }
  else if(timelineno===5){
    changePinPhotos(timelineno,citiesPast,images);
    return citiesPast[4].cityName;
  }
  else{
    changePinPhotos(timelineno,citiesPast,images);
    return citiesFuture[0].cityName;
  }
}

/* --------- Find pin location ---------*/
function findCityLoc(timelineno,citiesPast,citiesFuture,cityName){
  var cityLocLeft;
  var cityLocTop;



  for(var i=0;i<citiesonmap.citieslocs.length;i++){
    //console.log(citiesonmap.citieslocs[i]);
    if((citiesonmap.citieslocs[i].city).toUpperCase()===(cityName).toUpperCase()){
      //console.log(cityName);
      cityLocLeft=citiesonmap.citieslocs[i].left
      cityLocTop=citiesonmap.citieslocs[i].top

    }
  }

  /*searchInCitiesJSON(cityLocLeft,cityLocTop);
  if(timelineno===1){
    cityLocLeft=citiesPast[0].cityLocation.left;
    cityLocTop=citiesPast[0].cityLocation.top;
  }
  else if(timelineno===2){
    cityLocLeft=citiesPast[1].cityLocation.left;
    cityLocTop=citiesPast[1].cityLocation.top;  }
  else if(timelineno===3){
    cityLocLeft=citiesPast[2].cityLocation.left;
    cityLocTop=citiesPast[2].cityLocation.top;  }
  else if(timelineno===4){
    cityLocLeft=citiesPast[3].cityLocation.left;
    cityLocTop=citiesPast[3].cityLocation.top;  }
  else if(timelineno===5){
    cityLocLeft=citiesPast[4].cityLocation.left;
    cityLocTop=citiesPast[4].cityLocation.top;  }
  else{
    cityLocLeft=citiesFuture[0].cityLocation.left;
    cityLocTop=citiesFuture[0].cityLocation.top;
  }*/
  changeCityNamePin(timelineno,cityName,cityLocLeft,cityLocTop);
}










/* ---------Minimize map ---------*/
function mapMinify() {
      //scatterImages();

      $(".city-map-name-inner").fadeOut( 400, function() {});
      $('#next-city').fadeOut( 400, function() {});

      $("#pin-images").fadeOut(400, function() {});

      setTimeout(function() {
        $(".stage").animate({ width: 180, height: 170, borderRadius: '50%' }, 800);
        $("#ball-out").animate({ left: 10, top: 0 }, 800);
        $(".ball-in").animate({ borderRadius: '50%' }, 800);
        $("#ballshadow").show(1200);
      }, 400);
      setTimeout(function() {
        $(".ball-in").css("animation", "move-map-globe 60s infinite linear");

      }, 800);
};

/* ---------Maximize map ---------*/

function mapMaximize() {
    setTimeout(function() {
      $(".city-map-name-inner").fadeTo( 500,1, function() {});
      $("#pin-images").fadeTo( 800,1,function() {});
    }, 800);

    $(".stage").animate({ width: 1395, height: 750, borderRadius: '0%' }, 1000);
    $("#ball-out").animate({ left: 165, top: 170 }, 1000);
    $(".ball-in").animate({ borderRadius: '0%' }, 200);
    $(".ball-in").css("animation", "none");
    $("#ballshadow").hide(500);
};



function scatterImages(){
  $("#image-stack-1").animate({width:'400px',height:'200px',left:'10000px'},300);
  $("#image-stack-2").animate({width:'400px',height:'200px',left:'10000px',bottom:'10000px'},300);
  $("#image-stack-3").animate({width:'400px',height:'200px',top:'10000px'},300);
  $("#image-stack-4").animate({width:'400px',height:'200px',bottom:'10000px'},300);
  $("#image-stack-5").animate({width:'400px',height:'200px',right:'10000px'},300);
}
