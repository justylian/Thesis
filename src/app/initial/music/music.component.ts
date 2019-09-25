import { LeapService } from './../../services/leap.service';
import { Component, OnInit } from '@angular/core';
declare var $: any;
declare var jQuery: any;
import timelinejson from '../../../assets/json/timeline.json';
let plays=false;

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent implements OnInit {
  citiesPast=timelinejson.citiesPast;
  citiesPastCount=Object.keys(timelinejson.citiesPast).length;

  citiesFuture=timelinejson.citiesFuture;
  //plays;

  constructor() {
  /*  this.leapService.manageMusic$.subscribe(
      () => {
        //alert('(Component2) Method called!'+i);
        this.playerManage();
      }
    );*/  
   }

  ngOnInit() {
  }

  player=$('#music-desc1 #player')[0];

  public  playerManage(): void {
    

    var i;
    for( i=1;i<=6;i++){
      if(i<=this.citiesPastCount || i===6){

        if($('#music-desc'+i).css('display') === 'block')
        {
          this.player=$('#music-desc'+i+' #player')[0];
          //console.log(this.player);
          break;
        }
      }
    }
    //let player=<HTMLVideoElement>document.getElementById('player');
    if(this.player.paused){
      plays=true;
      this.player.play();
      document.getElementById('audio-button').style.background="url('../../../assets/images/pause.png')";
      document.getElementById('audio-button').style.backgroundSize="cover";
      $("#audio-player h1").animate({ left:-26}, 100);

    }
    else{
      plays=false;
      this.player.pause();
      document.getElementById('audio-button').style.background="url('../../../assets/images/play.png')";
      document.getElementById('audio-button').style.backgroundSize="cover";
      $("#audio-player h1").animate({ left:-100}, 100);

    }
  }

  public manageMusic(i){
    var j;
    if(i===1){
      for(j=2;j<=this.citiesPastCount;j++)
      {
        $('#music-desc'+j+' #player')[0].pause();

      }
     $('#music-desc6 #player')[0].pause();


      if(plays){
        $('#music-desc1 #player')[0].play();
      }

      $('#music-desc1').show();
      for(j=2;j<=this.citiesPastCount;j++)
      {
        $('#music-desc'+j).hide();

      }
      $('#music-desc6').hide();

    }
    else  if(i===2){
      for(j=1;j<=this.citiesPastCount;j++)
      {
        if(j!==2){
          $('#music-desc'+j+' #player')[0].pause();
        }
      }
      $('#music-desc6 #player')[0].pause();


      if(plays){
      $('#music-desc2 #player')[0].play();
      }
      $('#music-desc2').show();

      for(j=1;j<=this.citiesPastCount;j++)
      {
        if(j!==2){
          $('#music-desc'+j).hide();
        }

      }
      $('#music-desc6').hide();
    }
    else  if(i===3){
      for(j=1;j<=this.citiesPastCount;j++)
      {
        if(j!==3){
          $('#music-desc'+j+' #player')[0].pause();
        }
      }
      $('#music-desc6 #player')[0].pause();


      if(plays){
      $('#music-desc3 #player')[0].play();
      }
      $('#music-desc3').show();

      for(j=1;j<=this.citiesPastCount;j++)
      {
        if(j!==3){
          $('#music-desc'+j).hide();
        }

      }
      $('#music-desc6').hide();
    }
    else  if(i===4){
      for(j=1;j<=this.citiesPastCount;j++)
      {
        if(j!==4){
          $('#music-desc'+j+' #player')[0].pause();
        }
      }
      $('#music-desc6 #player')[0].pause();


      if(plays){
      $('#music-desc4 #player')[0].play();
      }
      $('#music-desc4').show();

      for(j=1;j<=this.citiesPastCount;j++)
      {
        if(j!==4){
          $('#music-desc'+j).hide();
        }

      }
      $('#music-desc6').hide();
    }
    else  if(i===5){
      for(j=1;j<=this.citiesPastCount;j++)
      {
        if(j!==5){
          $('#music-desc'+j+' #player')[0].pause();
        }
      }
      $('#music-desc6 #player')[0].pause();


      if(plays){
      $('#music-desc5 #player')[0].play();
      }
      $('#music-desc5').show();

      for(j=1;j<=this.citiesPastCount;j++)
      {
        if(j!==5){
          $('#music-desc'+j).hide();
        }

      }
      $('#music-desc6').hide();
    }
    else if(i===6){
      for(j=1;j<=this.citiesPastCount;j++)
      {
          $('#music-desc'+j+' #player')[0].pause();

      }


      if(plays){
      $('#music-desc6 #player')[0].play();
      }

      $('#music-desc6').show();

      for(j=1;j<=this.citiesPastCount;j++)
      {
          $('#music-desc'+j).hide();
      }

    }
  }

}

