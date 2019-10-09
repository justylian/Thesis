import { DesktopComponent } from './../routes/desktop/desktop.component';
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
    private desktopComponent: DesktopComponent,
    private imagesComponent: ImagesComponent,
    private musicComponent: MusicComponent,
    private placesComponent: PlacesComponent,
    private mapboxComponent: MapboxComponent
  ) {
    this.manageLeap();
  }
  ngOnInit() {}

  /* ----- Leap function ----- */

  async manageLeap() {
    var imagesawayComponent = this.imagesawayComponent;
    var musicComponent = this.musicComponent;
    var imagesComponent = this.imagesComponent;
    var desktopComponent = this.desktopComponent;
    var placesComponent = this.placesComponent;
    var infotableComponent = this.infotableComponent;
    var mapboxComponent = this.mapboxComponent;
    var onceFlag = true;

    var leapjs = require("leapjs");
    var options = {
      enableGestures: true,
      frameEventName: "animationFrame"
    };
    var left = 0;
    var tap = 0;
    var push=0;
    var right=0;
    var controllerOptions = { enableGestures: true };

    var controller = leapjs.loop(controllerOptions, function(frame) {
      var extendedFingers = 0;
      for (var i = 0; i < frame.fingers.length; i++) {
        var finger = frame.fingers[i];
        if (finger.extended) extendedFingers++;
        //console.log(finger.tipPosition[1]);
        if(finger.tipPosition[1]<=30){
          if (push === 0) {
            if ($("#initial").css("display") === "block") {
              console.log("music")
              musicComponent.playerManage();
            }
            else  if ($("#upcoming").css("display") === "block") {
              if ($("#places").css("display") === "block") {
                console.log("save/unsave")
                placesComponent.savePlace();
                infotableComponent.savePlace();
              }
            }
            push = -1;
            setTimeout(function() {
              push = 0;
            }, 300);
          }
        }
        if (extendedFingers <= 1) {
          if (finger.type === 1) {
            //index
            //console.log(finger.id);
            if (finger.extended) {
              if (finger.tipPosition[2] < -100) {
                if (tap === 0) {
                  //console.log(finger.tipPosition[2]);
                  //console.log(finger.type);
                  if ($("#initial").css("display") === "block") {
                    console.log("tap"); //mprosta(z) me <5 daxtylia

                    if (onceFlag === true) {
                      imagesComponent.slideShow();

                      onceFlag = false;
                    } else {
                      imagesComponent.pause();
                    }
                  } else if ($("#upcoming").css("display") === "block") {
                    console.log("tap"); //mprosta(z) me <5 daxtylia

                    infotableComponent.showHideImages();
                  } else if ($("#choice").css("display") === "block") {
                    console.log("tap"); //mprosta(z) me <5 daxtylia
                    desktopComponent.activeChoose();
                  }
                  tap = -1;
                  setTimeout(function() {
                    tap = 0;
                  }, 500);
                }
              }
            }
          }
        }
      }
      var extendedFingers = 0;
      for (var i = 0; i < frame.hands.length; i++) {
        var hand = frame.hands[i];
        var previousFrame = controller.frame(1);
        var movement = hand.translation(previousFrame);


        for (var i = 0; i < frame.fingers.length; i++) {
          var finger = frame.fingers[i];

          if (finger.extended) extendedFingers++;

          if (extendedFingers >= 5) {
            if (movement[0] < -7 && movement[0] > -50) {
              if (left === 0 && right === 0 ) {
                console.log("Left");
                if ($("#initial").css("display") === "block") {
                  imagesComponent.nextCity();

                }
                else if ($("#upcoming").css("display") === "block") {
                  if ($("#map").css("display") === "block") {
                    infotableComponent.nextScroll();
                  }
                  else if ($("#places").css("display") === "block") {
                    console.log("Swipe Gesture");
                    placesComponent.nextImageUpcoming();
                  }
                }
                else if ($("#choice").css("display") === "block") {
                  desktopComponent.activeChange();
                }
                else if ($("#away").css("display") === "block") {
                  imagesawayComponent.showImage();
                }
                left = -1;
                setTimeout(function() {
                  left = 0;
                  right = 0;

                }, 500);
              }
            }
            if (movement[0] > 7 && movement[0] < 50) {
              if (right === 0 && left === 0) {
                console.log("right");
                if ($("#initial").css("display") === "block") {
                  imagesComponent.previousCity();
                }
                else if ($("#upcoming").css("display") === "block") {
                  if ($("#map").css("display") === "block") {
                    infotableComponent.previousScroll();
                  }
                  else if ($("#places").css("display") === "block") {
                    placesComponent.nextImageUpcoming();
                  }
                } else if ($("#choice").css("display") === "block") {
                  desktopComponent.activeChangePrev();
                }
                else if ($("#away").css("display") === "block") {
                  imagesawayComponent.showImage();
                }
                right = -1;
                setTimeout(function() {
                  right = 0;
                  left = 0;

                }, 500);
              }
            }
          }
        }
      }
      // Array containing all the fingers

      /* var handString = "";
      if (frame.hands.length > 0) {
         var hand = frame.hands[0];
          var yawRadians = hand.yaw();

          var previousFrame = controller.frame(1);
          var movement = hand.translation(previousFrame);
        console.log(movement[0]);
          if(movement[0]<(-7)){
            if(current!==1  ){
              console.log("Left");
              appComponent.activeChange();
              current=1;
            }
          }
          else if (movement[0]>7){
            if(current!==2 ){
              console.log("right");
              appComponent.activeChangePrev();
              current=2;
            }
          }
          if(current===2 || current===1){
            setTimeout(function() {
              console.log("NULL");
              current = 0;
            }, 500);
          }

        }


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
