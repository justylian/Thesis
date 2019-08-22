import { Component, OnInit } from '@angular/core';
import timelinejson from '../../../assets/json/timeline.json';

@Component({
  selector: 'app-infotable',
  templateUrl: './infotable.component.html',
  styleUrls: ['./infotable.component.scss']
})
export class InfotableComponent implements OnInit {
  citiesFuture=timelinejson.citiesFuture;

  constructor() { }

  ngOnInit() {
  }

}
