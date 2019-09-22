import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
declare var $: any;
declare var jQuery: any;
declare var require: any

@Injectable({
  providedIn: 'root'
})
export class LeapService {

  constructor() {

  }


  /* ----- Upcoming ----- */

  private manageImageSource = new Subject<any>();
  manageImage$ = this.manageImageSource.asObservable();


  private nextImageSource = new Subject<any>();
  nextImage$ = this.nextImageSource.asObservable();



  manageImage(i){
    this.manageImageSource.next(i);
  }

  nextImage(i){
    this.nextImageSource.next(i);
  }


  /* ----- Initial ----- */


  private manageMusicSource = new Subject<any>();
  manageMusic$ = this.manageMusicSource.asObservable();


  manageMusic(){
    this.manageMusicSource.next();
  }


  private nextCitySource = new Subject<any>();
  nextCity$ = this.nextCitySource.asObservable();

  nextCity(){
    this.nextCitySource.next();
  }



  private slideShowSource = new Subject<any>();
  slideShow$ = this.slideShowSource.asObservable();

  slideShow(){
    this.slideShowSource.next();
  }


  /* ----- Away ----- */

  /* ----- Leap function ----- */


    public manageLeap(): void {
      var leapjs      = require('leapjs');
      var controller  = new leapjs.Controller({enableGestures: true});

      controller.on('deviceFrame', function(frame) {
          // loop through available gestures
          for(var i = 0; i < frame.gestures.length; i++){
            var gesture = frame.gestures[i];
            var type    = gesture.type;

            switch( type ){

              case "circle":
                if (gesture.state == "stop") {
                  console.log('circle');
                  if($('#initial').css('display')==='block'){
                    this.manageMusic();
                  }
                  if($('#upcoming').css('display')==='block'){
                  }
                }
                break;

              case "swipe":
                if (gesture.state == "stop") {
                  console.log('swipe');
                  if($('#initial').css('display')==='block'){
                    this.nextCity();
                  }
                  if($('#upcoming').css('display')==='block'){
                    if($('#map').css('display')==='block'){

                    }
                    else if($('#places').css('display')==='block'){

                    }
                  }
                }
                break;

              case "screenTap":
                if($('#initial').css('display')==='block'){
                  this.slideShow();
                }
                if($('#upcoming').css('display')==='block'){
                }
                break;

              case "keyTap":
                if (gesture.state == "stop") {
                  console.log('keyTap');
              }
                break;
  // tslint:disable-next-line: no-trailing-whitespace

              }
            }
        });


      controller.connect();
    }
    ngOnInit() {
      this.manageLeap();

    }
  }




