import { InfobubbleComponent } from './../infobubble/infobubble.component';
import { Component, OnInit } from '@angular/core';
declare var $: any;
declare var jQuery: any;
import timelinejson from '../../../assets/json/timeline.json';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  citiesPast=timelinejson.citiesPast;
  citiesFuture=timelinejson.citiesFuture;
  
  constructor() { }

  ngOnInit() {
    //mapMinify();
  }

}


function mapMinify() {
  setTimeout(function() {
    $(".stage").animate({ width: 260, height: 250, borderRadius: '50%' }, 1000);
    $("#ball-out").animate({ left: 100, top: 50 }, 1000);
    $(".ball-in").animate({ borderRadius: '50%' }, 1000);
    $(".ball-in").css("animation", "move-map-globe 60s infinite linear");
    $("#ballshadow").show(500);

    $("#info-bubble").fadeOut( 600, function() {
      // Animation complete.
    });
    $("#pin-images").fadeOut( 400, function() {
      // Animation complete.
    });
  },1000)
};

function mapMaximize() {
  setTimeout(function() {
    $(".stage").animate({ width: 1395, height: 750, borderRadius: '50%' }, 1000);
    $("#ball-out").animate({ left: 165, top: 170 }, 1000);
    $(".ball-in").animate({ borderRadius: '0%' }, 1000);
    $(".ball-in").css("animation", "none");
    $("#ballshadow").hide(500);
  },1000)
};

