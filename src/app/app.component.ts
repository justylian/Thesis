import { SocketService } from './services/socket.service';
import { Component } from "@angular/core";
import { ChoiceService } from "./services/choice.service";
import timelinejson from "../assets/json/timeline.json";
import {  OnInit, OnDestroy } from '@angular/core';

declare var Load: any;
declare var $: any;
declare var jQuery: any;


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit{
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
    var country=$('#mobile #form-country option:selected').text();
    //alert(country);
    this.country=country;

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

  public activeChange() {
    if ($("#choice-1").hasClass("active")) {
      $("#choice-1").removeClass("active");
      $("#choice-2").addClass("active");
    } else if ($("#choice-2").hasClass("active")) {
      $("#choice-2").removeClass("active");
      $("#choice-3").addClass("active");
    } else if ($("#choice-3").hasClass("active")) {
      $("#choice-3").removeClass("active");
      $("#choice-1").addClass("active");
    }
  }

  public activeChangePrev() {
    if ($("#choice-1").hasClass("active")) {
      $("#choice-1").removeClass("active");
      $("#choice-3").addClass("active");
    } else if ($("#choice-2").hasClass("active")) {
      $("#choice-2").removeClass("active");
      $("#choice-1").addClass("active");
    } else if ($("#choice-3").hasClass("active")) {
      $("#choice-3").removeClass("active");
      $("#choice-2").addClass("active");
    }
  }

  public activeChoose() {
    if ($("#choice-1").hasClass("active")) {
      $("#choice").hide();
      $("#initial").show();
      //this.choiceService.initial();
    } else if ($("#choice-2").hasClass("active")) {
      $("#choice").hide();
      $("#upcoming").show();
      this.choiceService.upcoming();
    } else if ($("#choice-3").hasClass("active")) {
      $("#choice").hide();
      $("#away").show();
      this.choiceService.away();
    }
  }

  public initialClicked() {
    $("#choice").hide();
    $("#initial").show();
    //this.choiceonclickService.initial();
  }
  public upcomingClicked() {
    $("#choice").hide();
    $("#upcoming").show();
    this.choiceService.upcoming();
  }
  public awayClicked() {
    $("#choice").hide();
    $("#away").show();
    this.choiceService.away();
  }
}
