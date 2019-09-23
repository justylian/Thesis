import { Component } from '@angular/core';
declare var Load: any;
declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
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

  public activeChoose(){
    if ($("#choice-1").hasClass("active")) {
      $("#choice").hide();
      $("#initial").show();
    }
    else if ($("#choice-2").hasClass("active")) {
      $("#choice").hide();
      $("#upcoming").show();
    }
    else if ($("#choice-3").hasClass("active")) {
      $("#choice").hide();
      $("#away").show();
    }
  }
}
