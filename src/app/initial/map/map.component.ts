import { Component, OnInit } from '@angular/core';
declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    mapTransition();
  }

}


function mapTransition() {
  setTimeout(function() {
  $(".stage").animate({ width: 260, height: 250, borderRadius: '50%' }, 1000);
  $("#globe").animate({ right: 100, top: 100 }, 1000);
  $(".ball").animate({ borderRadius: '50%' }, 1000);
  //$(".ball").css("background-position", " calc(100% - 200px) calc(100% - 10px)");



  //$(".ball").css("background-position", " calc(100% - 200px) calc(100% - 10px)");
  //$(".ball").css("animation", "move-map 190s infinite linear");


  $("#ballshadow").show(500);
  },100)
};

