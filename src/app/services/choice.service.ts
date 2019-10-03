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

  private initialSource = new Subject<any>();

  // Observable string streams
  initial$ = this.initialSource.asObservable();

  initial(){
    this.initialSource.next();
  }





  private distSource = new Subject<any>();

  // Observable string streams
  dist$ = this.distSource.asObservable();

  dist(i){
    this.distSource.next(i);
  }



  private mobileSource = new Subject<any>();

  // Observable string streams
  mobile$ = this.mobileSource.asObservable();

  mobile(){
    this.mobileSource.next();
  }
}
