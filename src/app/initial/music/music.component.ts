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
  citiesFuture=timelinejson.citiesFuture;
  //plays;

  constructor() { }

  ngOnInit() {
  }


  public  playerManage(): void {
    let player;
    var i;
    for( i=1;i<=6;i++){
      //onsole.log(i);

      if($('#music-desc'+i).css('display') === 'block')
      {
        player=$('#music-desc'+i+' #player')[0];
        console.log(player);
        break;
      }
    }
    //let player=<HTMLVideoElement>document.getElementById('player');
    if(player.paused){
      plays=true;
      player.play();
      document.getElementById('audio-button').style.background="url('../../../assets/images/pause.png')";
      document.getElementById('audio-button').style.backgroundSize="cover";
      $("#audio-player h1").animate({ left:-35}, 100);

    }
    else{
      plays=false;
      player.pause();
      document.getElementById('audio-button').style.background="url('../../../assets/images/play.png')";
      document.getElementById('audio-button').style.backgroundSize="cover";
      $("#audio-player h1").animate({ left:-100}, 100);

    }
  }

  public manageMusic(i){
    if(i===1){
      $('#music-desc6 #player')[0].pause();
      $('#music-desc5 #player')[0].pause();
      $('#music-desc4 #player')[0].pause();
      $('#music-desc3 #player')[0].pause();
      $('#music-desc2 #player')[0].pause();


      if(plays){
        $('#music-desc1 #player')[0].play();
      }

      $('#music-desc1').show();

      $('#music-desc2').hide();
      $('#music-desc3').hide();
      $('#music-desc4').hide();
      $('#music-desc5').hide();
      $('#music-desc6').hide();

    }
    else  if(i===2){
      $('#music-desc6 #player')[0].pause();
      $('#music-desc5 #player')[0].pause();
      $('#music-desc4 #player')[0].pause();
      $('#music-desc3 #player')[0].pause();
      $('#music-desc1 #player')[0].pause();

      if(plays){
      $('#music-desc2 #player')[0].play();
      }
      $('#music-desc2').show();

      $('#music-desc1').hide();
      $('#music-desc3').hide();
      $('#music-desc4').hide();
      $('#music-desc5').hide();
      $('#music-desc6').hide();
    }
    else  if(i===3){
      $('#music-desc6 #player')[0].pause();
      $('#music-desc5 #player')[0].pause();
      $('#music-desc4 #player')[0].pause();
      $('#music-desc2 #player')[0].pause();
      $('#music-desc1 #player')[0].pause();

      if(plays){
      $('#music-desc3 #player')[0].play();
      }
      $('#music-desc3').show();

      $('#music-desc1').hide();
      $('#music-desc2').hide();
      $('#music-desc4').hide();
      $('#music-desc5').hide();
      $('#music-desc6').hide();
    }
    else  if(i===4){
      $('#music-desc6 #player')[0].pause();
      $('#music-desc5 #player')[0].pause();
      $('#music-desc2 #player')[0].pause();
      $('#music-desc3 #player')[0].pause();
      $('#music-desc1 #player')[0].pause();

      if(plays){
      $('#music-desc4 #player')[0].play();
      }
      $('#music-desc4').show();

      $('#music-desc1').hide();
      $('#music-desc3').hide();
      $('#music-desc2').hide();
      $('#music-desc5').hide();
      $('#music-desc6').hide();
    }
    else  if(i===5){
      $('#music-desc6 #player')[0].pause();
      $('#music-desc2 #player')[0].pause();
      $('#music-desc4 #player')[0].pause();
      $('#music-desc3 #player')[0].pause();
      $('#music-desc1 #player')[0].pause();

      if(plays){
      $('#music-desc5 #player')[0].play();
      }
      $('#music-desc5').show();

      $('#music-desc1').hide();
      $('#music-desc3').hide();
      $('#music-desc4').hide();
      $('#music-desc2').hide();
      $('#music-desc6').hide();
    }
    else{
      $('#music-desc2 #player')[0].pause();
      $('#music-desc5 #player')[0].pause();
      $('#music-desc4 #player')[0].pause();
      $('#music-desc3 #player')[0].pause();
      $('#music-desc1 #player')[0].pause();

      if(plays){
      $('#music-desc6 #player')[0].play();
      }
      
      $('#music-desc6').show();

      $('#music-desc1').hide();
      $('#music-desc3').hide();
      $('#music-desc4').hide();
      $('#music-desc5').hide();
      $('#music-desc2').hide();

    }
  }

}

