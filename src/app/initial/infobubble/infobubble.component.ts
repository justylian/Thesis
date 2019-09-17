import { TimelineComponent } from './../timeline/timeline.component';
import { Component, OnInit } from '@angular/core';
import timelinejson from '../../../assets/json/timeline.json';
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
  citiesFuture=timelinejson.citiesFuture;

  infobubbletime=timesjson.infobubbletime;

  constructor() {

   }

  ngOnInit() {
    infoBubbleShow(this.infobubbletime); //run first

  }



  public hideBubble(){
    $('#info-bubble').fadeOut( 400, function() {

    });
  }
  public showBubble(){
    $('#info-bubble').fadeTo( 600, 1 , function() {
    });
  }

}

function repeatBubble(infobubbletime){
  infoBubbleShow(infobubbletime);
}
function infoBubbleShow(infobubbletime) {
  var infobubbletimecurrent=0;

    $('#info-bubble-1').fadeTo( 900, 1 , function() {
    });
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

    });
    repeatBubble(infobubbletime);
  },infobubbletimecurrent+=infobubbletime)
}





