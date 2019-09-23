import { AppComponent } from './../app.component';
import {  ImagesawayComponent } from './../away/imagesaway/imagesaway.component';
import { MusicComponent } from './../initial/music/music.component';
import { ImagesComponent} from './../initial/images/images.component';
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

  constructor(private infotableComponent:InfotableComponent,private imagesawayComponent:ImagesawayComponent,private appComponent:AppComponent,private imagesComponent:ImagesComponent,private musicComponent:MusicComponent) {
    this.manageLeap();
  }
  ngOnInit() {
  }



  /* ----- Upcoming ----- */







  /* ----- Initial ----- */


  /* ----- Away ----- */

  /* ----- Leap function ----- */


    public manageLeap(): void {
      // tslint:disable-next-line: member-ordering

     // nextScroll$ = this.nextScrollSource.asObservable();
    //  nextScroll(){

     // }
      var imagesawayComponent=this.imagesawayComponent;
      var musicComponent=this.musicComponent;
      var imagesComponent=this.imagesComponent;
      var appComponent=this.appComponent;

      var infotableComponent=this.infotableComponent;
      var onceFlag=true;

      var leapjs      = require('leapjs');
      var controller  = new leapjs.Controller({enableGestures: true});
      console.log('LEAP OK');

      controller.on('deviceFrame', function(frame) {
          // loop through available gestures
          //console.log('NEXTTTLEAP OK');

          //leapjs.loop(controller, function(frame) {
          
          for(var i = 0; i < frame.gestures.length; i++){
            var gesture = frame.gestures[i];
            var type    = gesture.type;

            switch( type ){

              case "circle":
                console.log('circle');
                if (gesture.state == "stop") {
                  if($('#initial').css('display')==='block'){
                    musicComponent.playerManage();
                  }
                  if($('#upcoming').css('display')==='block'){
                    infotableComponent.showHideImages();

                  }
                }
                break;

              case "swipe":
                console.log('swipe');
                if (gesture.state == "stop") {
                  if($('#initial').css('display')==='block'){
                    console.log(gesture.direction[0]);
                    if (gesture.direction[0] > 0){
                      imagesComponent.nextCity();
                    }
                    else{
                      imagesComponent.previousCity();

                    }
                  }
                  else if($('#upcoming').css('display')==='block'){
                    if($('#map').css('display')==='block'){
                      if (gesture.direction[0] > 0){
                        infotableComponent.nextScroll();
                      }
                      else{
                        infotableComponent.previousScroll();

                      }


                    }
                    else if($('#places').css('display')==='block'){
                      infotableComponent.nextImageUpcoming();
                    }
                  }
                  else if($('#away').css('display')==='block'){
                    imagesawayComponent.showImage();
                  }
                  else if($('#choice').css('display')==='block'){
                    appComponent.activeChange();
                  }

                }
                break;

              case "screenTap":
                console.log('screenTap');

                if (gesture.state == "stop") {
                  if($('#initial').css('display')==='block'){
                    if(onceFlag===true){
                      imagesComponent.slideShow();
                      onceFlag=false;
                    }
                  }
                  else if($('#upcoming').css('display')==='block'){
                    infotableComponent.showHideImages();

                  }
                  else if($('#choice').css('display')==='block'){
                    appComponent.activeChoose();
                  }
              }
                break;

              case "keyTap":
                  console.log('keyTap');

                  if (gesture.state == "stop") {
                    if($('#initial').css('display')==='block'){
                      if(onceFlag===true){
                        imagesComponent.slideShow();
                        onceFlag=false;
                      }
                    }
                    else if($('#upcoming').css('display')==='block'){
                      infotableComponent.showHideImages();

                    }
                    else if($('#choice').css('display')==='block'){
                      appComponent.activeChoose();
                    }
                }
                break;
  // tslint:disable-next-line: no-trailing-whitespace

              }
            
          }
        });


      controller.connect();
    
    }

  }




