import { ChoiceService } from './../../services/choice.service';
import { SocketService } from './../../services/socket.service';
import { Component, OnInit } from '@angular/core';
import timelinejson from "../../../assets/json/timeline.json";
declare var $: any;
declare var SimplePeer: any;

declare var jQuery: any;
declare var require: any;
@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.scss']
})
export class MobileComponent implements OnInit {
  citiesFuture = timelinejson.citiesFuture;
  mobile = false;
  citySelect=false;
  countrySelect=false;
  city;
  country;
  constructor(private choiceService: ChoiceService,private socketService: SocketService) {
    if (window.screen.width < 1920) {
      this.mobile = true;

    }
  }

  messages = [];
  connection;
  message;


  ngOnInit(): void {


  }





  sendMessage() {
    this.socketService.sendCity(this.city);
    this.socketService.sendCountry(this.country);
    window.location.reload(false);

  }

  title = "thesis-app";
  public citySelected(){
    this.citySelect=true;
    var city=$('#mobile #form-city').val();
    //alert(city);
    this.city=city;
    if(this.citySelect===true && this.countrySelect===true)
    {
      this.changeUpcomingJSON();
    }
  }
  public countrySelected(country){
    this.countrySelect=true;
    var countrysel=$('#mobile #form-country option:selected').val();
    //alert(country);
    this.country=countrysel;

    if(this.citySelect===true && this.countrySelect===true)
    {
      this.changeUpcomingJSON();
    }
  }
  public changeUpcomingJSON(){
    this.citiesFuture[0].cityName=this.city;
    this.citiesFuture[0].countryName=this.country;
    this.choiceService.mobile();
    this.sendMessage();


  }


}
