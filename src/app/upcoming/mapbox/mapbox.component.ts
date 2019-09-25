import { DominantcolorService } from './../../services/dominantcolor.service';
import { ChoiceService } from './../../services/choice.service';
import { Component, OnInit } from '@angular/core';
declare var require: any
import timelinejson from '../../../assets/json/timeline.json';
declare var $: any;
declare var jQuery: any;
//import 'mapbox-gl/dist/mapbox-gl.css';

@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.scss']
})
export class MapboxComponent implements OnInit {
  citiesFuture=timelinejson.citiesFuture;
  
  constructor(private choiceService:  ChoiceService) { 

    this.choiceService.upcoming$.subscribe(
      () => {
        //alert('(Component2) Method called!'+i);
        this.mapBox();
      }
    );

  
  }

 
  ngOnInit() {

  }

  public mapBox(){
    //if(this.mapboxflag===true){
    var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
    mapboxgl.accessToken = 'pk.eyJ1IjoieGVuYWtpcyIsImEiOiJjanczdDBpMHAwZWgzM3lrbW9xaDVpNnlzIn0.9O8d2q7A_DUaGbswoygSTA';
    var coordinates=[12.486, 41.89]; //Rome as start
    var MapboxClient = require('mapbox');
    var client = new MapboxClient('pk.eyJ1IjoieGVuYWtpcyIsImEiOiJjanczdDBpMHAwZWgzM3lrbW9xaDVpNnlzIn0.9O8d2q7A_DUaGbswoygSTA');

    const mymap = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/xenakis/cjw3t12b71b0f1coggwaltmwy',
      center: coordinates,
      //pitch: 60,
      zoom: 3,
    
      });
    client.geocodeForward(this.citiesFuture[0].cityName, function(err, data, res) {
      coordinates = data.features[0].center;
      //console.log(coordinates);

    });
    
    

    setTimeout(function() {
        mymap.flyTo({
          center: coordinates,
          zoom: 12
          });
    },7000);
        // tslint:disable-next-line: align
  
     
        //mapcanvas.width='1070px';
      //  mapcanvas.height='1080px';


         /* map.on('load', function () {
        map.flyTo({
          center: [12.585791540330206, 55.69010470068136],
          zoom: 13});

      });*/


    var ad1=this.citiesFuture[0].cityName+" "+this.citiesFuture[0].photos.one.title;
    var ad1title=this.citiesFuture[0].photos.one.title;
    var ad2=this.citiesFuture[0].cityName+" "+this.citiesFuture[0].photos.two.title;
    var ad2title=this.citiesFuture[0].photos.two.title;
    var ad3=this.citiesFuture[0].cityName+" "+this.citiesFuture[0].photos.three.title;
    var ad3title=this.citiesFuture[0].photos.three.title;
    var ad4=this.citiesFuture[0].cityName+" "+this.citiesFuture[0].photos.four.title;
    var ad4title=this.citiesFuture[0].photos.four.title;
    var ad5=this.citiesFuture[0].cityName+" "+this.citiesFuture[0].photos.five.title;
    var ad5title=this.citiesFuture[0].photos.five.title;


    /* this.infotableComponent.getDominantColor(1,"one");
   this.infotableComponent.getDominantColor(2,"two");
    this.infotableComponent.getDominantColor(3,"three");
    this.infotableComponent.getDominantColor(4,"four");
    this.infotableComponent.getDominantColor(5,"five");*/




      // tslint:disable-next-line: align
      var test = client.geocodeForward(ad1, function(err, data, res) {
        //console.log(data);

        var coordinates = data.features[0].center;
       // console.log(coordinates);

        var el=stylePin(1,ad1title);

        new mapboxgl.Marker(el)
          .setLngLat(coordinates)
          .addTo(mymap);
      });

      var test = client.geocodeForward(ad2, function(err, data, res) {
      //console.log(data);

        var coordinates = data.features[0].center;
       // console.log(coordinates);

        var el=stylePin(2,ad2title);


        new mapboxgl.Marker(el)
          .setLngLat(coordinates)
          .addTo(mymap);
      });

      var test = client.geocodeForward(ad3, function(err, data, res) {
       // console.log(data);

        var coordinates = data.features[0].center;
       // console.log(coordinates);

        var el=stylePin(3,ad3title);


        new mapboxgl.Marker(el)
          .setLngLat(coordinates)
          .addTo(mymap);
      });


      var test = client.geocodeForward(ad4, function(err, data, res) {
       // console.log(data);

        var coordinates = data.features[0].center;
        //console.log(coordinates);

        var el=stylePin(4,ad4title);


        new mapboxgl.Marker(el)
          .setLngLat(coordinates)
          .addTo(mymap);
      });

      var test = client.geocodeForward(ad5, function(err, data, res) {
        //console.log(data);

        var coordinates = data.features[0].center;
       // console.log(coordinates);

        var el=stylePin(5,ad5title);


        new mapboxgl.Marker(el)
          .setLngLat(coordinates)
          .addTo(mymap);
      });




     // jQuery(window).resize(function(){map.resize()});
   
  }
  
  


  public focusPin(no){
    //console.log(no);
    $('#markerbubble'+no).animate({
      height: '20px',
      width: '20px',
      borderWidth: "13px"
    }, 500);
    for(var i=1;i<=5;i++){
      if(i!==no){
        $('#markerbubble'+i).animate({
          height: '15px',
          width: '15px',
          borderWidth: "9px"
        }, 500);
      }
    }
  }

  public hideMap(){
    $('#map').fadeOut(200);
  }

  public showMap(){
    $('#map').fadeIn(200);
  }

}



function stylePin(i,adtitle){

  var el = document.createElement('div');
  el.id = 'marker'+i;
  el.textContent=adtitle;
  //el.textContent=data.query[0]+' '+data.query[1]+' '+data.query[2];
  el.style.background ='white';
  el.style.borderRadius="15px 50px 30px";
  el.style.filter='drop-shadow(#00000063 0px 0px 5px)';
  //el.style.width = '200px';
  //el.style.height = '50px';
  el.style.padding='8px';
  el.style.fontSize='1vw';
  el.style.position='absolute';
 // console.log(el.className);
 // console.log(el);

  var elbubble = document.createElement('div');
  el.appendChild(elbubble);
  elbubble.style.width = '15px';
  elbubble.style.height = '15px';
  elbubble.style.backgroundColor='white';
  elbubble.style.position='absolute';
  elbubble.style.zIndex="1";

  elbubble.style.borderColor="var(--main-timeline-color-"+i+")";
  elbubble.style.borderWidth="9px";
  elbubble.style.borderStyle="solid";


  elbubble.style.top="26px";
  elbubble.style.right="-25px";
  elbubble.style.borderRadius="50%";
  elbubble.id = 'markerbubble'+i;






  return el;

}
