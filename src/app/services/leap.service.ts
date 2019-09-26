import { AppComponent } from './../app.component';
import {  ImagesawayComponent } from './../away/imagesaway/imagesaway.component';
import { MusicComponent } from './../initial/music/music.component';
import { ImagesComponent} from './../initial/images/images.component';
import { PlacesComponent}from './../upcoming/places/places.component';
import { InfotableComponent } from './../upcoming/infotable/infotable.component';
import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
declare var $: any;
declare var jQuery: any;
declare var require: any

@Injectable({
  providedIn: 'root'
})
export class LeapService {

  constructor(private infotableComponent:InfotableComponent,private imagesawayComponent:ImagesawayComponent,private appComponent:AppComponent,private imagesComponent:ImagesComponent,private musicComponent:MusicComponent,private placesComponent:PlacesComponent) {
    this.manageLeap();
  }
  ngOnInit() {
  }



  /* ----- Leap function ----- */


    public manageLeap(): void {

      var imagesawayComponent=this.imagesawayComponent;
      var musicComponent=this.musicComponent;
      var imagesComponent=this.imagesComponent;
      var appComponent=this.appComponent;
      var placesComponent=this.placesComponent;
      var infotableComponent=this.infotableComponent;
      var onceFlag=true;

      var leapjs      = require('leapjs');
      var options = {
        enableGestures: true,
        frameEventName: "animationFrame"
      };
      var controller = leapjs.loop({enableGestures: true}, function(frame){
        if(frame.valid && frame.gestures.length > 0){
          frame.gestures.forEach(function(gesture){
              switch (gesture.type){
                case "circle":
                    if (gesture.state == "stop") {

                      if($('#initial').css('display')==='block'){
                        console.log("Circle Gesture");

                        musicComponent.playerManage();

                      }
                    }
                    break;
                case "keyTap":
                    if (gesture.state == "stop") {

                      if($('#upcoming').css('display')==='block'){

                          if($('#places').css('display')==='block'){
                            console.log("Key Tap Gesture");

                            placesComponent.savePlace();
                            infotableComponent.savePlace();

                          }

                      }
                      else if($('#choice').css('display')==='block'){
                        console.log("Key Tap Gesture");

                        appComponent.activeChoose();

                      }
                    }
                    break;
                case "screenTap":
                    if (gesture.state == "stop") {


                        if($('#initial').css('display')==='block'){
                          console.log("Screen Tap Gesture");

                          if(onceFlag===true){
                            imagesComponent.slideShow();

                            onceFlag=false;
                          }
                          else{
                            imagesComponent.pause();
                          }
                        }
                        else if($('#upcoming').css('display')==='block'){
                          console.log("Screen Tap Gesture");

                          infotableComponent.showHideImages();
                        }
                        else if($('#choice').css('display')==='block'){
                          console.log("Screen Tap Gesture");
                          appComponent.activeChoose();
                        }
                    }
                    break;
                case "swipe":
                    if (gesture.state == "stop") {

                      if($('#initial').css('display')==='block'){
                        if (gesture.direction[0] > 0){
                          console.log("Swipe left Gesture");
                          imagesComponent.previousCity();
                        }
                        else{
                          console.log("Swipe right Gesture");
                          imagesComponent.nextCity();
                        }
                      }
                      else if($('#upcoming').css('display')==='block'){
                        if($('#map').css('display')==='block'){

                          if (gesture.direction[0] > 0){
                            console.log("Swipe left Gesture");
                            infotableComponent.previousScroll();
                          }
                          else{
                            console.log("Swipe right Gesture");
                            infotableComponent.nextScroll();
                          }
                        }
                        else if($('#places').css('display')==='block'){
                          console.log("Swipe Gesture");
                          placesComponent.nextImageUpcoming();

                        }
                     }
                     else if($('#choice').css('display')==='block'){
                      console.log("Swipe Gesture");
                      appComponent.activeChange();

                    }
                    else if($('#away').css('display')==='block'){
                      console.log('swipe');

                      imagesawayComponent.showImage();

                    }
                    }
                    break;


              }
            });

        }

      });


   /*   var controller = leapjs.loop({enableGestures: true}, function(frame){
        if(frame.valid && frame.gestures.length > 0){

        frame.gestures.forEach(function(gesture) {

          //var gesture = frame.gestures[i];
          var type    = gesture.type;

          switch( type ){

            case "circle":
              if (gesture.state == "stop") {

                if($('#initial').css('display')==='block'){
                  console.log('circle');

                  musicComponent.playerManage();

                }
              }
              break;

            case "swipe":
              if (gesture.state == "stop") {
                if($('#initial').css('display')==='block'){
                  console.log('swipe');
                  if (gesture.direction[0] > 0){
                    imagesComponent.nextCity();

                  }
                  else{
                    imagesComponent.previousCity();


                  }
                }
                else if($('#upcoming').css('display')==='block'){
                  if($('#map').css('display')==='block'){
                    console.log('swipe');

                    if (gesture.direction[0] > 0){
                      infotableComponent.nextScroll();

                    }
                    else{
                      infotableComponent.previousScroll();

                    }
                  }
                  else if($('#places').css('display')==='block'){
                    console.log('swipe');

                    infotableComponent.nextImageUpcoming();

                  }
                }
                else if($('#away').css('display')==='block'){
                  console.log('swipe');

                  imagesawayComponent.showImage();

                }
                else if($('#choice').css('display')==='block'){
                  console.log('swipe');

                  appComponent.activeChange();

                }

              }
              break;

            case "screenTap":

              if (gesture.state == "stop") {
                if($('#initial').css('display')==='block'){
                  console.log('screenTap');

                  if(onceFlag===true){
                    imagesComponent.slideShow();

                    onceFlag=false;
                  }
                }
                else if($('#upcoming').css('display')==='block'){
                  console.log('screenTap');

                  infotableComponent.showHideImages();

                }
                else if($('#choice').css('display')==='block'){
                  console.log('screenTap');

                  appComponent.activeChoose();

                }
            }
              break;

            case "keyTap":

                if (gesture.state == "stop") {
                   if($('#upcoming').css('display')==='block'){
                    console.log('keyTap');

                      if($('#places').css('display')==='block'){
                        placesComponent.savePlace();
                        infotableComponent.savePlace();

                      }

                  }
                  else if($('#choice').css('display')==='block'){
                    console.log('keyTap');

                    appComponent.activeChoose();

                  }
              }
              break;
// tslint:disable-next-line: no-trailing-whitespace

            }


            demo();
        });
        demo();
      }
      });

      /*
      var leapjs      = require('leapjs');
      var controller  = new leapjs.Controller({enableGestures: true});
      console.log('LEAP OK');

      controller.on('deviceFrame', function(frame) {
          // loop through available gestures
          //console.log('NEXTTTLEAP OK');

          //leapjs.loop(controller, function(frame) {

          for(var i = 0; i < frame.gestures.length; i++){
            demo();

            var gesture = frame.gestures[i];
            var type    = gesture.type;

            switch( type ){

              case "circle":
                if (gesture.state == "stop") {

                  if($('#initial').css('display')==='block'){
                    console.log('circle');

                    musicComponent.playerManage();

                  }
                }
                break;

              case "swipe":
                if (gesture.state == "stop") {
                  if($('#initial').css('display')==='block'){
                    console.log('swipe');
                    if (gesture.direction[0] > 0){
                      imagesComponent.nextCity();

                    }
                    else{
                      imagesComponent.previousCity();


                    }
                  }
                  else if($('#upcoming').css('display')==='block'){
                    if($('#map').css('display')==='block'){
                      console.log('swipe');

                      if (gesture.direction[0] > 0){
                        infotableComponent.nextScroll();

                      }
                      else{
                        infotableComponent.previousScroll();

                      }
                    }
                    else if($('#places').css('display')==='block'){
                      console.log('swipe');

                      infotableComponent.nextImageUpcoming();

                    }
                  }
                  else if($('#away').css('display')==='block'){
                    console.log('swipe');

                    imagesawayComponent.showImage();

                  }
                  else if($('#choice').css('display')==='block'){
                    console.log('swipe');

                    appComponent.activeChange();

                  }

                }
                break;

              case "screenTap":

                if (gesture.state == "stop") {
                  if($('#initial').css('display')==='block'){
                    console.log('screenTap');

                    if(onceFlag===true){
                      imagesComponent.slideShow();

                      onceFlag=false;
                    }
                  }
                  else if($('#upcoming').css('display')==='block'){
                    console.log('screenTap');

                    infotableComponent.showHideImages();

                  }
                  else if($('#choice').css('display')==='block'){
                    console.log('screenTap');

                    appComponent.activeChoose();

                  }
              }
                break;

              case "keyTap":

                  if (gesture.state == "stop") {
                     if($('#upcoming').css('display')==='block'){
                      console.log('keyTap');

                        if($('#places').css('display')==='block'){
                          placesComponent.savePlace();
                          infotableComponent.savePlace();

                        }

                    }
                    else if($('#choice').css('display')==='block'){
                      console.log('keyTap');

                      appComponent.activeChoose();

                    }
                }
                break;
  // tslint:disable-next-line: no-trailing-whitespace

              }
          }


        });


      controller.connect();
    */
    }

  }




    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    async function demo() {
    //console.log('Taking a break...');
    await sleep(20000);
    //console.log('Two seconds later, showing sleep in a loop...');

    // Sleep in loop
    for (let i = 0; i < 5; i++) {
      if (i === 3)
        await sleep(20000);
      //console.log(i);
    }
  }


  var i = 0, howManyTimes = 10;
      function f() {
          //alert( "hi" );
          i++;
          if( i < howManyTimes ){
              setTimeout( f, 3000 );
          }
      }
