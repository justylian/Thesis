import { MapComponent } from './../map/map.component';
import { ImagesComponent } from './../images/images.component';
import { Component, OnInit } from '@angular/core';
import { Timelineinfo } from './../../models/timelineinfo';
import timelinejson from '../../../assets/json/timeline.json';

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

  constructor(private compImages: ImagesComponent,private compMap: MapComponent) {
    //var instance = new ExampleClass().deserialize(timelinejson);

  }
  public futureCitySlideshow(): void {
    this.compImages.slideShow();
    //this.compMap.futureCitySlideshowMap(1);

  }


  ngOnInit() {
   //this.map.mapMinify();

  }

}
