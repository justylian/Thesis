import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
declare var $: any;
declare var jQuery: any;

@Injectable({
  providedIn: 'root'
})
export class DescplacingService {


  constructor() { }

  private placeDescsSource = new Subject<any>();

  // Observable string streams
  placeDescs$ = this.placeDescsSource.asObservable();

  public placeDescs(i){
    //this.timelineFocusSource.next(i);
    getColors(i);
  }
}


/* ----- Desc placing  ----- */

function getColors(i){
  for(var j=5;j>=1;j--){
    var length=0;
    var templength=0;
    var lessx=300;
    var lessy=800;
    length=extractColors('myCanvas',300,800,j,i);
    colorList={};
    templength=extractColors('myCanvas1',600,800,j,i);
    colorList={};

    if(length>templength){
      length=templength;
      lessx=600;
      lessy=800;
    }
       // console.log(length);
    //console.log(templength);
    templength=extractColors('myCanvas2',400,100,j,i);
    colorList={};

    //console.log(templength);
    if(length>templength){
      length=templength;
      lessx=400;
      lessy=100;
    }

    templength=extractColors('myCanvas3',300,600,j,i);
    colorList={};

    //console.log(templength);
    if(length>templength){
      length=templength;
      lessx=300;
      lessy=600;
    }
    templength=extractColors('myCanvas4',1300,100,j,i);
    colorList={};

    //console.log(templength);
    if(length>templength){
      length=templength;
      lessx=1300;
      lessy=100;
    }
    templength=extractColors('myCanvas5',700,50,j,i);
    colorList={};

    //console.log(templength);
    if(length>templength){
      length=templength;
      lessx=700;
      lessy=50;
    }
    console.log(length,lessx,lessy);


    if(j===5){
      $('#image'+i+'-five-inner').css({ "top": lessy, "left": lessx });
    }
    else  if(j===4){
      $('#image'+i+'-four-inner').css({ "top": lessy, "left": lessx });
    }else  if(j===3){
      $('#image'+i+'-three-inner').css({ "top": lessy, "left": lessx  });
    }else  if(j===2){
      $('#image'+i+'-two-inner').css({ "top": lessy, "left": lessx  });
    }else{
      $('#image'+i+'-one-inner').css({ "top": lessy, "left": lessx  });
    }

  }


}





var colorList = {};

function extractColors(cnv,x,y,j,i){
        var canvas : any = document.getElementById(cnv);
        var context = canvas.getContext('2d');
        if(j===5){
          var img = document.getElementById("image"+i+"-five-img");
        }
        else if(j===4){
          var img = document.getElementById("image"+i+"-four-img");
        }
        else if(j===3){
          var img = document.getElementById("image"+i+"-three-img");
        }
        else if(j===2){
          var img = document.getElementById("image"+i+"-two-img");
        }
        else {
          var img = document.getElementById("image"+i+"-one-img");
        }
        context.drawImage(img,x,y,250,200,0, 0,250,200);

        var imageData = context.getImageData(0, 0, 250, 200);
        var data = imageData.data;
        var i, n;

        // quickly iterate over all pixels
        for(i = 0, n = data.length; i < n; i += 4) {
           var r  = data[i];
           var g  = data[i + 1];
           var b  = data[i + 2];
           var hex = "rgb("+r+","+g+","+b+")";
            if (!(hex in colorList)){
                colorList[hex]=1;
            } else {
                colorList[hex]++;
            }
        }
        var keys = Object.keys(colorList);
        return keys.length;
}
