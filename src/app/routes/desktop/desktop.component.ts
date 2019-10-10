import { Component, OnInit } from '@angular/core';
import timelinejson from "../../../assets/json/timeline.json";
import { ChoiceService } from "./../../services/choice.service";
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
  constructor(private choiceService: ChoiceService) {

  }
 //peer;
 anotherid;
mypeerid;
peer
loadedAway=false;
  ngOnInit() {
    var that=this;

    this.peer = new Peer([1],{key: 'lwjd5qra8257b9'});
    setTimeout(()=>{
      this.mypeerid=this.peer.id;
      console.log(this.peer.id);

  },1000)
    this.peer.on('connection',function(conn){
      conn.on('data',function(data){
        console.log(data);
        that.citiesFuture[0].cityName=data.city;
        that.citiesFuture[0].countryName=data.country;
        this.loadedAway=true;
      });
    });

  }




  connect(){
    console.log("conn");

    var conn=this.peer.connect(this.anotherid)
    conn.on('open', function() {
      console.log('My peer ID is: ' );
      conn.send('hi')
    });

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
