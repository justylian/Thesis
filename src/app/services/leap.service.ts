import { DesktopComponent } from "./../routes/desktop/desktop.component";
import { MapboxComponent } from "./../upcoming/mapbox/mapbox.component";
import { ImagesawayComponent } from "./../away/imagesaway/imagesaway.component";
import { MusicComponent } from "./../initial/music/music.component";
import { ImagesComponent } from "./../initial/images/images.component";
import { PlacesComponent } from "./../upcoming/places/places.component";
import { InfotableComponent } from "./../upcoming/infotable/infotable.component";
import { Injectable } from "@angular/core";
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
    var push = 0;
    var right = 0;
    var pinch = 0;
    var controllerOptions = { enableGestures: true };

    var controller = leapjs.loop(controllerOptions, function(frame) {
      var extendedFingers = 0;
      for (var i = 0; i < frame.fingers.length; i++) {
        var finger = frame.fingers[i];
        if (finger.extended) extendedFingers++;
        /*---------------- TAP ON LEAP ----------------*/
        if (finger.tipPosition[1] <= 30) {
          if (push === 0) {
            if ($("#initial").css("display") === "block") {
              console.log("music");
              musicComponent.playerManage();
            } else if ($("#upcoming").css("display") === "block") {
              if ($("#places").css("display") === "block") {
                console.log("save/unsave");
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
        /*---------------- TAP ON SCREEN ----------------*/

        if (extendedFingers <= 1) {
          //1 EXTENDED FINGER
          if (finger.type === 1) {
            //INDEX FINGER
            if (finger.extended) {
              if (finger.tipPosition[2] < -100) {
                //CLOSE TO DEVICE
                if (tap === 0) {
                  if ($("#initial").css("display") === "block") {
                    console.log("tap");

                    if (onceFlag === true) {

                      /*---------------- START SLIDESHOW (INITIAL) ----------------*/

                      imagesComponent.slideShow();

                      onceFlag = false;
                    } else {

                      /*---------------- PAUSE SLIDESHOW (INITIAL) ----------------*/

                      imagesComponent.pause();
                    }
                  } else if ($("#upcoming").css("display") === "block") {
                    console.log("tap");

                    /*---------------- SHOW/HIDE PLACES (UPCOMING) ----------------*/

                    infotableComponent.showHideImages();
                  } else if ($("#choice").css("display") === "block") {
                    console.log("tap");

                    /*---------------- CHOOSE STATE (STATES) ----------------*/

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
            //FIVE EXTENDED FINGERS
            if (movement[0] < -7 && movement[0] > -50) {
              //LEFT
              if (left === 0 && right === 0) {
                console.log("Left");
                if ($("#initial").css("display") === "block") {

                  /*---------------- NEXT IN SLIDESHOW (INITIAL) ----------------*/

                  imagesComponent.nextCity();
                } else if ($("#upcoming").css("display") === "block") {
                  if ($("#map").css("display") === "block") {

                    /*---------------- NEXT IN LIST OF PLACES (UPCOMING) ----------------*/

                    infotableComponent.nextScroll();
                  } else if ($("#places").css("display") === "block") {
                    console.log("Swipe Gesture");

                    /*---------------- NEXT IN PLACES-IMAGE SHOWN (UPCOMING) ----------------*/

                    placesComponent.nextImageUpcoming();
                  }
                } else if ($("#choice").css("display") === "block") {

                  /*---------------- NEXT IN STATES (STATES) ----------------*/

                  desktopComponent.activeChange();
                } else if ($("#away").css("display") === "block") {

                  /*---------------- NEXT SHOW/HIDE IMAGE (AWAY) ----------------*/

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

                  /*---------------- PREVIOUS IN SLIDESHOW (INITIAL) ----------------*/

                  imagesComponent.previousCity();
                } else if ($("#upcoming").css("display") === "block") {
                  if ($("#map").css("display") === "block") {

                    /*---------------- PREVIOUS IN LIST OF PLACES (UPCOMING) ----------------*/

                    infotableComponent.previousScroll();
                  } else if ($("#places").css("display") === "block") {

                    /*---------------- PREVIOUS IN PLACES-IMAGE SHOWN (UPCOMING) ----------------*/

                    placesComponent.nextImageUpcoming();
                  }
                } else if ($("#choice").css("display") === "block") {

                  /*---------------- PREVIOUS IN STATES (STATES) ----------------*/

                  desktopComponent.activeChangePrev();
                } else if ($("#away").css("display") === "block") {

                  /*---------------- PREVIOUS SHOW/HIDE IMAGE (AWAY) ----------------*/

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
          /*---------------- PINCH TO ZOOM----------------*/
          /*

          else if (extendedFingers === 2) {
            if (
              finger.type !== 2 &&
              finger.type !== 3 &&
              finger.type !== 4 &&
              finger.type !== 5
            ) {
              if (finger.extended) {
                  if (pinch === 0) {
                    if ($("#upcoming").css("display") === "block") {
                      if ($("#map").css("display") === "block") {
                        if (hand.pinchStrength > 0.6) {
                          console.log(hand.pinchStrength);

                          console.log("zoom out");
                          mapboxComponent.zoomOut();
                          pinch = -1;
                          setTimeout(function() {
                            pinch = 0;
                          }, 500);
                        } else if (hand.pinchStrength === 0) {
                          console.log(hand.pinchStrength);

                          console.log("zoom in");
                          mapboxComponent.zoomIn();
                          pinch = -1;
                          setTimeout(function() {
                            pinch = 0;
                          }, 500);
                        }
                      }

                  }
                }
              }
            }
          }*/
        }
      }
    });
  }
}
