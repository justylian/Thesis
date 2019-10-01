import { Component } from '@angular/core';
import { ChoiceService } from './services/choice.service';
declare var Load: any;
declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private choiceService:ChoiceService) {


    }

  title = 'thesis-app';

  public activeChange(){
    if ($("#choice-1").hasClass("active")) {
      $("#choice-1").removeClass("active");
      $("#choice-2").addClass("active");
    }
    else if ($("#choice-2").hasClass("active")) {
      $("#choice-2").removeClass("active");
      $("#choice-3").addClass("active");
    }
    else if ($("#choice-3").hasClass("active")) {
      $("#choice-3").removeClass("active");
      $("#choice-1").addClass("active");
    }
  }

  public activeChangePrev(){
    if ($("#choice-1").hasClass("active")) {
      $("#choice-1").removeClass("active");
      $("#choice-3").addClass("active");
    }
    else if ($("#choice-2").hasClass("active")) {
      $("#choice-2").removeClass("active");
      $("#choice-1").addClass("active");
    }
    else if ($("#choice-3").hasClass("active")) {
      $("#choice-3").removeClass("active");
      $("#choice-2").addClass("active");
    }
  }

  public activeChoose(){
    if ($("#choice-1").hasClass("active")) {

      $("#choice").hide();
      $("#initial").show();
      //this.choiceService.initial();

    }
    else if ($("#choice-2").hasClass("active")) {
      $("#choice").hide();
      $("#upcoming").show();
      this.choiceService.upcoming();

    }
    else if ($("#choice-3").hasClass("active")) {
      $("#choice").hide();
      $("#away").show();
      this.choiceService.away();
    }
  }

  public initialClicked(){

    $("#choice").hide();
    $("#initial").show();
    //this.choiceonclickService.initial();
  }
  public upcomingClicked(){
    $("#choice").hide();
      $("#upcoming").show();
      this.choiceService.upcoming();

  }
  public awayClicked(){
    $("#choice").hide();
    $("#away").show();
    this.choiceService.away();
  }
}
