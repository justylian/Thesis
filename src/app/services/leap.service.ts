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
        /*---------------- TAP ON LEAP ----------------*/
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
              else if ($("#map").css("display") === "block") {
                console.log("zoom")
                mapboxComponent.zoom()
              }
            }
            push = -1;
            setTimeout(function() {
              push = 0;
            }, 300);
          }
        }
        /*---------------- TAP ON SCREEN ----------------*/

        if (extendedFingers <= 1) {
          if (finger.type === 1) {
            if (finger.extended) {
              if (finger.tipPosition[2] < -100) {
                if (tap === 0) {
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


      /*---------------- SLIDE ----------------*/

      var extendedFingers = 0;
      for (var i = 0; i < frame.hands.length; i++) {
        var hand = frame.hands[i];
        var previousFrame = controller.frame(1);
        var movement = hand.translation(previousFrame);


        for (var i = 0; i < frame.fingers.length; i++) {
          var finger = frame.fingers[i];

          if (finger.extended) extendedFingers++;

          /*---------------- SLIDE LEFT----------------*/

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

            /*---------------- SLIDE RIGHT----------------*/

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

    });
  }
}
