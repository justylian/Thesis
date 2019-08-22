import { Component, OnInit } from '@angular/core';
import timelinejson from '../../../assets/json/timeline.json';
declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-infotable',
  templateUrl: './infotable.component.html',
  styleUrls: ['./infotable.component.scss']
})
export class InfotableComponent implements OnInit {
  citiesFuture=timelinejson.citiesFuture;

  constructor() { }

  ngOnInit() {
  }

}



//AUTO RESIZE CITY NAME
$(document).ready(function() {
  var fontSize = 1130/parseInt($("#city-name").text().length)+"px";

  //alert(fontSize);
  $("#city-name").css('font-size', fontSize);
});
