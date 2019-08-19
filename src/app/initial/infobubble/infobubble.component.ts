import { Component, OnInit } from '@angular/core';
import timelinejson from '../../../assets/json/timeline.json';
declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-infobubble',
  templateUrl: './infobubble.component.html',
  styleUrls: ['./infobubble.component.scss']
})
export class InfobubbleComponent implements OnInit {
  citiesPast=timelinejson.citiesPast;
  citiesFuture=timelinejson.citiesFuture;
  constructor() { }

  ngOnInit() {
  }


  public  infobubbleManage(): void {

    if(document.getElementById('info-bubble-inner-1').style.zIndex==='')
    {
      document.getElementById('info-bubble-inner-1').style.zIndex='';
      document.getElementById('info-bubble-inner-2').style.zIndex='';
      document.getElementById('info-bubble-inner-3').style.zIndex='';
    }
  }
}
