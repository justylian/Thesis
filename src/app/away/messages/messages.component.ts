import { LeapService } from './../../services/leap.service';
import timelinejson from '../../../assets/json/timeline.json';
import {ChoiceService}from './../../services/choice.service';
declare var Load: any;
declare var $: any;
declare var jQuery: any;
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  citiesFuture=timelinejson.citiesFuture;

  constructor(private leapService:LeapService,private choiceService:  ChoiceService) { 
    this.choiceService.away$.subscribe(
      () => {
        //alert('(Component2) Method called!'+i);
        this.showMessages();

      }
    );
  }
  ngOnInit() {
  }


  public showMessages(){
    setTimeout(function() {
      $("#away #info-bubble-1").fadeIn( 400, function() {});

    },2000);

    setTimeout(function() {
      $("#away #info-bubble-2").fadeIn( 400, function() {});

    },4000);
  }

}
