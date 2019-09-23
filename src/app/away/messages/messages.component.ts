import { LeapService } from './../../services/leap.service';
import timelinejson from '../../../assets/json/timeline.json';

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

  constructor(private leapService:LeapService) { }

  ngOnInit() {
      this.showMessages();
  }


  public showMessages(){
    setTimeout(function() {
      $("#away #info-bubble-1").fadeIn( 400, function() {});

    },10000);

    setTimeout(function() {
      $("#away #info-bubble-2").fadeIn( 400, function() {});

    },14000);
  }

}
