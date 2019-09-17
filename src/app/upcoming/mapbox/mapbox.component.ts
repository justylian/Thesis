import { Component, OnInit } from '@angular/core';
declare var require: any

@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.scss']
})
export class MapboxComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

    mapboxgl.accessToken = 'pk.eyJ1IjoieGVuYWtpcyIsImEiOiJjanczdDBpMHAwZWgzM3lrbW9xaDVpNnlzIn0.9O8d2q7A_DUaGbswoygSTA';

    const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/xenakis/cjw3t12b71b0f1coggwaltmwy',
    //center: [12.486, 41.89],
    center: [12.585791540330206, 55.69010470068136],
    //pitch: 60,
    zoom: 13,


    });
  }

}
