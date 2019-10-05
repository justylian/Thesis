import { WeatherService } from './../../services/weather.service';
import { SocketService } from './../../services/socket.service';
import { CountryinfoService } from './../../services/countryinfo.service';
import { TimelineComponent } from './../timeline/timeline.component';
import { Component, OnInit } from '@angular/core';
import timelinejson from '../../../assets/json/timeline.json';
import phrasesjson from '../../../assets/json/phrases.json';

import timesjson from '../../../assets/json/times.json';
declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-infobubble',
  templateUrl: './infobubble.component.html',
  styleUrls: ['./infobubble.component.scss']
})
export class InfobubbleComponent implements OnInit {
  citiesPast=timelinejson.citiesPast;
  citiesPastCount=Object.keys(timelinejson.citiesPast).length;

  citiesFuture=timelinejson.citiesFuture;
  phrases=phrasesjson;

  infobubbletime=timesjson.infobubbletime;
  searchingInfo=false;
  infoFound=false;
  infoFoundWeather=false;
  searchingInfoWeather=false;
  phraseFound=false;
  constructor(private weatherService:WeatherService,private socketService:SocketService,private countryinfoService:CountryinfoService) {


   }

  ngOnInit() {
    this.socketService.getCountry().subscribe(country => {
      this.citiesFuture[0].countryName= country;
      this.searchCountryInfo(this.citiesFuture[0].countryName);
    });
    this.searchCountryInfo(this.citiesFuture[0].countryName);

    //infoBubbleShow(this.infobubbletime); //run first

  }

  searchPhrases(data){
    for(var i=0;i<this.phrases.length;i++){
      if(this.phrases[i].country.toUpperCase()===data.languages[0].name.toUpperCase()){
        //console.log(this.phrases[i].string);
        this.citiesFuture[0].lingo=this.phrases[i].string;
        this.phraseFound=true;
      }

    }
  }


  /* ----- Info Bubble API ----- */

  handleSuccess(data) {
    console.log(data)
    this.citiesFuture[0].language=data[0].languages[0].name;
    //this.citiesFuture[0].lingo=
    this.citiesFuture[0].countrycode=data[0].callingCodes[0];
    this.citiesFuture[0].currency=data[0].currencies[0].code;
    this.citiesFuture[0].timezone=data[0].timezones[0];
    this.infoFound = true;
    infoBubbleShow(this.infobubbletime);
    this.searchWeather(data[0].latlng[0],data[0].latlng[1],1)
    this.searchPhrases(data[0]);

    this.infoFound = true;
    //this.citiesFuture[0].weather.temphigh
   // this.citiesFuture[0].weather.templow
    //this.citiesFuture[0].weather.rainydays
  }

  handleError(error) {
    console.log(error);
  }

  searchCountryInfo(query: string) {
    this.searchingInfo = true;

    return this.countryinfoService
      .getCountryInfo(query)
      .subscribe(
        data => this.handleSuccess(data),
        error => this.handleError(error),
        () => (this.searchingInfo = false)
      );
  }



  /* ----- Info Bubble Weather API ----- */



  handleSuccessWeather(data,parameter) {
    if(parameter===1){
      console.log(data.data[0].id)
      var stationid=data.data[0].id
      this.searchWeather(1,1,stationid)
    }
    else{
      var month=this.citiesFuture[0].dateMonth.substring(0, 3).toUpperCase();
    this.citiesFuture[0].weather.temphigh=data.data.temperature_max[month];
    this.citiesFuture[0].weather.templow=data.data.temperature_min[month]
    this.citiesFuture[0].weather.rainydays=data.data.precipitation[month];
    }
    this.infoFoundWeather = true;



  }

  handleErrorWeather(error) {
    console.log(error);
  }

  searchWeather(lat,lang,parameter) {
    this.searchingInfoWeather = true;

    return this.weatherService
      .getWeather(lat,lang,parameter)
      .subscribe(
        data => this.handleSuccessWeather(data,parameter),
        error => this.handleErrorWeather(error),
        () => (this.searchingInfoWeather = false)
      );
  }






  public hideBubble(){
    $('#info-bubble').fadeOut( 400, function() {

    });
  }
  public showBubble(){
    //this.hideBubble();


    $('#info-bubble-1').fadeOut(400);
    $('#info-bubble-2').fadeOut(400);
    $('#info-bubble-3').fadeOut(400);
    $('#info-bubble-4').fadeOut(400);
    $('#info-bubble-5').fadeOut(400);
    $('#info-bubble').fadeTo( 600, 1 , function() {
    });
    infoBubbleShow(this.infobubbletime);

    //infoBubbleShow(this.infobubbletime);
  }

}

function repeatBubble(infobubbletime){
  infoBubbleShow(infobubbletime);
}
function infoBubbleShow(infobubbletime) {
  var infobubbletimecurrent=0;


  setTimeout(function() {
    $('#info-bubble-1').fadeOut( 400, function() {
      $('#info-bubble-2').fadeTo( 600, 1 , function() {
      });
    });
  },infobubbletimecurrent+=infobubbletime)
  setTimeout(function() {
    $('#info-bubble-2').fadeOut( 400, function() {
      $('#info-bubble-3').fadeTo( 600, 1 , function() {
      });
    });
  },infobubbletimecurrent+=infobubbletime)
  setTimeout(function() {
    $('#info-bubble-3').fadeOut( 400, function() {
      $('#info-bubble-4').fadeTo( 600, 1 , function() {
      });
    });
  },infobubbletimecurrent+=infobubbletime)
  setTimeout(function() {
    $('#info-bubble-4').fadeOut( 400, function() {
      $('#info-bubble-5').fadeTo( 600, 1 , function() {
      });
    });
  },infobubbletimecurrent+=infobubbletime)
  setTimeout(function() {
    $('#info-bubble-5').fadeOut( 400, function() {
      $('#info-bubble-1').fadeTo( 900, 1 , function() {
      });
    });
  },infobubbletimecurrent+=infobubbletime)
  setTimeout(function() {
    repeatBubble(infobubbletime);
  },infobubbletimecurrent+=infobubbletime)
}






