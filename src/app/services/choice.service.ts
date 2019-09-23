import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChoiceService {

  constructor() { }


  private upcomingSource = new Subject<any>();

  // Observable string streams
  upcoming$ = this.upcomingSource.asObservable();

  upcoming(){
    this.upcomingSource.next();
  }


  private awaySource = new Subject<any>();

  // Observable string streams
  away$ = this.awaySource.asObservable();

  away(){
    this.awaySource.next();
  }
}
