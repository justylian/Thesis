import { Component, OnInit } from '@angular/core';
declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  public  playerManage(): void {
    let player=<HTMLVideoElement>document.getElementById('player');
    if(player.paused){
      player.play();
      document.getElementById('audio-button').style.background="url('../../../assets/images/pause.png')";
      document.getElementById('audio-button').style.backgroundSize="cover";
      $("#audio-player h1").animate({ left:-35}, 100);

    }
    else{
      player.pause();
      document.getElementById('audio-button').style.background="url('../../../assets/images/play.png')";
      document.getElementById('audio-button').style.backgroundSize="cover";
      $("#audio-player h1").animate({ left:-100}, 100);

    }
  }

}

