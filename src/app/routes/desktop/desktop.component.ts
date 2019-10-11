import { SocketService } from './../../services/socket.service';
import { Component, OnInit } from '@angular/core';
import timelinejson from "../../../assets/json/timeline.json";
import { ChoiceService } from "./../../services/choice.service";
import { HttpClient } from '@angular/common/http'

declare var $: any;
declare var jQuery: any;
declare var require: any;
declare var Peer: any;

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss']
})
export class DesktopComponent implements OnInit {
  citiesFuture = timelinejson.citiesFuture;
  mobile = false;
  citySelect=false;
  countrySelect=false;
  city;
  country;
  constructor(private socketService:SocketService,private choiceService: ChoiceService,private http: HttpClient) {

  }
 //peer;
 anotherid;
mypeerid;
peer
loadedAway=false;
   ngOnInit() {
    var that=this;
    var refreshIntervalId =setInterval(async function(){
      that.http.get('http://localhost:3000/getNextDestination').subscribe(res => {
        console.log("Waiting");

        if(res!==null ){
          console.log("Destination Found");

          clearInterval(refreshIntervalId);
          that.socketService.resetInfo();
          that.socketService.p2p(res);
        }
      });

     }, 1000);



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
