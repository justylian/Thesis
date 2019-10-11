import { ChoiceService } from "./../../services/choice.service";
import { SocketService } from "./../../services/socket.service";
import { Component, OnInit } from "@angular/core";
import { DesktopComponent } from './../../routes/desktop/desktop.component';

import timelinejson from "../../../assets/json/timeline.json";
declare var $: any;
import { HttpClient } from '@angular/common/http'
declare var jQuery: any;
declare var require: any;
declare var Peer: any;
import * as express from 'express'

@Component({
  selector: "app-mobile",
  templateUrl: "./mobile.component.html",
  styleUrls: ["./mobile.component.scss"]
})
export class MobileComponent implements OnInit {
  title = "thesis-app";
  citiesFuture = timelinejson.citiesFuture;
  mobile = false;
  citySelect = false;
  countrySelect = false;
  city;
  country;
  constructor(
    private choiceService: ChoiceService,
    private socketService: SocketService,
    private http: HttpClient,
    private desktopComponent:DesktopComponent
  ) {
    if (window.screen.width < 1920) {
      this.mobile = true;
    }
  }

  messages = [];
  connection;
  message;

  peer;
  mypeerid;
  ngOnInit() {
    this.socketService.resetInfo();

  }





  public changeUpcomingJSON() {
    this.countrySelect = true;
    var countrysel = $("#mobile #form-country option:selected").val();
    //alert(country);
    this.country = countrysel;
    this.citySelect = true;
    var city = $("#mobile #form-city").val();
    //alert(city);
    this.city = city;
    var  data=[city,countrysel];
    console.log("Connecting with other client..."+data);
    this.socketService.setInfo(data);

    if (this.citySelect === true && this.countrySelect === true) {
      this.citiesFuture[0].cityName = this.city;
      this.citiesFuture[0].countryName = this.country;
      this.choiceService.mobile();



     /* this.connect(
        this.citiesFuture[0].cityName,
        this.citiesFuture[0].countryName
      );
          setTimeout(()=>{
      window.location.reload(false);

    },5000)*/

      //this.sendMessage();
    }
  }
}
