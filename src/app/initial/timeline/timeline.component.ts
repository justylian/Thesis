import { ImagesComponent } from './../images/images.component';
import { Component, OnInit } from '@angular/core';
import { Timelineinfo } from './../../models/timelineinfo';
import timelinejson from '../../../assets/json/timeline.json';
declare var require: any
declare var $: any;
declare var jQuery: any;
/*

interface Serializable<T> {
  deserialize(input: Object): T;
}

class Member implements Serializable<Member> {
  cityName: String;

  deserialize(input) {
      this.cityName = input.cityName;
      return this;
  }
}

class ExampleClass implements Serializable<ExampleClass> {
  cities: Member;
  //secondCity: Member;

  deserialize(input) {


      this.cities[0] = new Member().deserialize(input.cities[0]);
      this.cities[1] = new Member().deserialize(input.cities[1]);

      //this.secondCity = new Member().deserialize(input.secondCity);
      console.log(this.cities);
      return this;
  }
}*/


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})

export class TimelineComponent implements OnInit {
  //public Timelineinfo: Timelineinfo[] = [];

  //public Timelineinfo: Timelineinfo[];

  //var instance = deserialize("../../assets/json/InputDeviceInfo.json", Timelineinfo);



   citiesPast=timelinejson.citiesPast;
   citiesFuture=timelinejson.citiesFuture;


  constructor(private compImages: ImagesComponent) {
    //var instance = new ExampleClass().deserialize(timelinejson);

  }
  public CitySlideshow(): void {
    this.compImages.slideShow();
    //this.compMap.futureCitySlideshowMap(1);

  }
  public nextCitySlideshow(): void {
    this.compImages.nextCity();
    //this.compMap.futureCitySlideshowMap(1);

  }

  public previousCitySlideshow(): void {
    this.compImages.previousCity();
    //this.compMap.futureCitySlideshowMap(1);

  }

  public cityFocus(timelineno){
    if(timelineno===1){
     // $('#timeline-bubble').animate({});

    }
  }

  ngOnInit() {

    //color();
  }


}


