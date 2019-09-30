import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
const { getColorFromURL } = require('color-thief-node');
declare var $: any;
declare var jQuery: any;
declare var require: any

@Injectable({
  providedIn: 'root'
})
export class DominantcolorService {

  constructor() { }

  private handleDominantColorSource = new Subject<any>();

  // Observable string streams
  handleDominantColor$ = this.handleDominantColorSource.asObservable();



  private getDominantColorSource = new Subject<any>();

  // Observable string streams
  getDominantColor$ = this.getDominantColorSource.asObservable();



  /* ----- Dominant colours ----- */


public handleDominantColor(timelineno,no){
  var imageURL=$('#cityImages'+timelineno+' #image'+timelineno+'-'+no+'-img').attr('src');//get img color

  (async () => {
    const dominantColor = await getColorFromURL(imageURL);
    //console.log(dominantColor);
    var rgb='rgb('+dominantColor[0]+','+dominantColor[1]+','+dominantColor[2]+')';

    $("body").css("--main-timeline-color", 'rgb('+dominantColor[0]+','+dominantColor[1]+','+dominantColor[2]+')');

    var hsp = Math.sqrt(
      0.299 * (dominantColor[0] * dominantColor[0]) +
      0.587 * (dominantColor[1] * dominantColor[1]) +
      0.114 * (dominantColor[2] * dominantColor[2])
      );
    if (hsp>127.5) {
      //console.log('light');
      $("body").css("--main-timeline-shadow", '#000');
    }
    else {
      //console.log('dark');
      $("body").css("--main-timeline-shadow", '#fff');
    }

  })();
}






public getDominantColor(timelineno,no){
  var imageURL=$('#cityImages'+timelineno+' #image'+timelineno+'-'+no+'-img').attr('src');//get img color

  (async () => {
    const dominantColor = await getColorFromURL(imageURL);
    if(dominantColor[2]<120){
      dominantColor[2]=170;
    }
    //console.log(dominantColor);
    var rgb='rgb('+dominantColor[0]+','+dominantColor[1]+','+dominantColor[2]+')';

    $("body").css("--main-timeline-color-"+no+"", 'rgb('+dominantColor[0]+','+dominantColor[1]+','+dominantColor[2]+')');

  })();
}
}
