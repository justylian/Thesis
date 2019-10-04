import { MapboxComponent } from "./../upcoming/mapbox/mapbox.component";
import { AppComponent } from "./../app.component";
import { ImagesawayComponent } from "./../away/imagesaway/imagesaway.component";
import { MusicComponent } from "./../initial/music/music.component";
import { ImagesComponent } from "./../initial/images/images.component";
import { PlacesComponent } from "./../upcoming/places/places.component";
import { InfotableComponent } from "./../upcoming/infotable/infotable.component";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
declare var $: any;
declare var jQuery: any;
declare var require: any;

@Injectable({
  providedIn: "root"
})
export class LeapService {
  constructor(
    private infotableComponent: InfotableComponent,
    private imagesawayComponent: ImagesawayComponent,
    private appComponent: AppComponent,
    private imagesComponent: ImagesComponent,
    private musicComponent: MusicComponent,
    private placesComponent: PlacesComponent,
    private mapboxComponent: MapboxComponent
  ) {
    this.manageLeap();
  }
  ngOnInit() {}

  /* ----- Leap function ----- */

  async manageLeap(){
    var imagesawayComponent = this.imagesawayComponent;
    var musicComponent = this.musicComponent;
    var imagesComponent = this.imagesComponent;
    var appComponent = this.appComponent;
    var placesComponent = this.placesComponent;
    var infotableComponent = this.infotableComponent;
    var mapboxComponent = this.mapboxComponent;
    var onceFlag = true;

    var leapjs = require("leapjs");
    var options = {
      enableGestures: true,
      frameEventName: "animationFrame"
    };
    var current1=0;
    var current2=0;
    var current3=0;

    var controller = leapjs.loop(function(frame) {




      var handString = "";
     if (frame.hands.length > 0) {
         var hand = frame.hands[0];
          var yawRadians = hand.yaw();

          var previousFrame = controller.frame(1);
          var movement = hand.translation(previousFrame);
          console.table(movement[2]);
         if(movement[2]<=(-12)){
            if(current3!==3 ){
            console.log("ompros");
            current3=3;
            }

          }
          if(movement[0]<=(-12)){

            if(current1!==1  ){
              console.log("Left");
              appComponent.activeChange();
              current1=1;

            }

          }
          else if (movement[0]>12){

            if(current2!==2 ){
              console.log("right");
              appComponent.activeChangePrev();
              current2=2;

            }
          }
          setTimeout(function() { current1 = 0;current2 = 0;current3 = 0; }, 800);



          // And so on...
 /*
      }
      for(var i = 0; i < frame.hands.length; i++){
        var hand = frame.hands[i];
        if(hand.pinchStrength===1.0){
          mapboxComponent.zoom("in");
          console.log( hand.pinchStrength);
        }
        if(hand.pinchStrength===0){
          mapboxComponent.zoom("out");

          console.log( hand.pinchStrength);
        }

      }
      if (frame.valid && frame.hands.length > 0) {
        frame.hands.forEach(function(gesture) {
          var direction = gesture.direction;
          //console.table(direction);

          switch (gesture.type) {
            case "circle":
              if (gesture.state == "stop") {
                if ($("#initial").css("display") === "block") {
                  console.log("Circle Gesture");

                  musicComponent.playerManage();
                }
              }
              break;
            case "keyTap":
              if (gesture.state == "stop") {
                if ($("#upcoming").css("display") === "block") {
                  if ($("#places").css("display") === "block") {
                    console.log("Key Tap Gesture");

                    placesComponent.savePlace();
                    infotableComponent.savePlace();
                  }
                } else if ($("#choice").css("display") === "block") {
                  console.log("Key Tap Gesture");

                  appComponent.activeChoose();
                }
              }
              break;
            case "screenTap":
              if (gesture.state == "stop") {
                if ($("#initial").css("display") === "block") {
                  console.log("Screen Tap Gesture");

                  if (onceFlag === true) {
                    imagesComponent.slideShow();

                    onceFlag = false;
                  } else {
                    imagesComponent.pause();
                  }
                } else if ($("#upcoming").css("display") === "block") {
                  console.log("Screen Tap Gesture");

                  infotableComponent.showHideImages();
                } else if ($("#choice").css("display") === "block") {
                  console.log("Screen Tap Gesture");
                  appComponent.activeChoose();
                }
              }
              break;
            case "swipe":
              if (gesture.state == "stop") {
                var xMov = Math.abs(gesture.direction[0]);
                var yMov = Math.abs(gesture.direction[1]);

                if ($("#initial").css("display") === "block") {
                  if (xMov > 0.3) {
                    if (gesture.direction[0] < 0) {
                      console.log("Swipe LEFT Gesture");
                      imagesComponent.previousCity();
                    } else {
                      console.log("Swipe right Gesture");
                      imagesComponent.nextCity();
                    }
                  } else if (yMov > 0.3) {
                    if (gesture.direction[1] < 0) {
                      console.log("Swipe DOWN Gesture");

                      imagesComponent.previousCity();
                    } else {
                      console.log("Swipe UP Gesture");
                      imagesComponent.nextCity();
                    }
                  }

                } else if ($("#upcoming").css("display") === "block") {
                  if ($("#map").css("display") === "block") {
                    if (xMov > 0.3) {
                      if (gesture.direction[0] < 0) {
                        console.log("Swipe LEFT Gesture");
                        infotableComponent.previousScroll();
                      } else {
                        console.log("Swipe right Gesture");
                        infotableComponent.nextScroll();
                      }
                    } else if (yMov > 0.3) {
                      if (gesture.direction[1] < 0) {
                        console.log("Swipe DOWN Gesture");
                        infotableComponent.previousScroll();
                      } else {
                        console.log("Swipe UP Gesture");
                        infotableComponent.nextScroll();
                      }
                    }

                  } else if ($("#places").css("display") === "block") {
                    console.log("Swipe Gesture");
                    placesComponent.nextImageUpcoming();
                  }
                } else if ($("#choice").css("display") === "block") {
                  if (gesture.direction[0] > 0) {
                    console.log("Swipe left Gesture");
                    appComponent.activeChangePrev();
                  } else {
                    console.log("Swipe right Gesture");
                    appComponent.activeChange();
                  }
                } else if ($("#away").css("display") === "block") {
                  console.log("swipe");

                  imagesawayComponent.showImage();
                }
              }
              break;
          }

        });*/
      }
    });
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
    if (i === 3) await sleep(20000);
    //console.log(i);
  }
}

var i = 0,
  howManyTimes = 10;
function f() {
  //alert( "hi" );
  i++;
  if (i < howManyTimes) {
    setTimeout(f, 3000);
  }
}
