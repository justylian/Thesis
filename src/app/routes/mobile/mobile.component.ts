import { ChoiceService } from './../../services/choice.service';
import { SocketService } from './../../services/socket.service';
import { Component, OnInit } from '@angular/core';
import timelinejson from "../../../assets/json/timeline.json";
declare var $: any;
declare var SimplePeer: any;

declare var jQuery: any;
declare var require: any;
declare var Peer: any;

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

  peer;
  mypeerid
  ngOnInit() {


    this.peer = new Peer([2],{key: 'lwjd5qra8257b9'});
    setTimeout(()=>{
      this.mypeerid=this.peer.id;
      console.log(this.peer.id);

  },3000)

  }


  connect(city,country){
    console.log("conn");

    var conn=this.peer.connect(1)
    conn.on('open', function() {
      console.log('My peer ID is: ' );
      conn.send({
        city: city,
        country: country,
      })
    });

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
    this.countrySelect=true;
    var countrysel=$('#mobile #form-country option:selected').val();
    //alert(country);
    this.country=countrysel;
    this.citySelect=true;
    var city=$('#mobile #form-city').val();
    //alert(city);
    this.city=city;
    if(this.citySelect===true && this.countrySelect===true)
    {

    this.citiesFuture[0].cityName=this.city;
    this.citiesFuture[0].countryName=this.country;
    this.choiceService.mobile();

    this.connect(this.citiesFuture[0].cityName,this.citiesFuture[0].countryName);
/*    setTimeout(()=>{
      window.location.reload(false);

    },5000)*/

    //this.sendMessage();
  }

  }


}
