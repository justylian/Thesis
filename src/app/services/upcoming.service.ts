import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpcomingService {

  constructor() {


  }


  private placesSource = new Subject<any>();

  // Observable string streams
  places$ = this.placesSource.asObservable();

  places(i){
    //console.log(i);
    this.placesSource.next(i);
  }


  private foundSource = new Subject<any>();

  // Observable string streams
  found$ = this.foundSource.asObservable();

  found(allfound){
    //console.log(i);
    this.foundSource.next(allfound);
  }




  private imagesSource = new Subject<any>();

  // Observable string streams
  images$ = this.imagesSource.asObservable();

  images(j){
    //console.log(j);
    this.imagesSource.next(j);
  }




  private imageslocSource = new Subject<any>();

  // Observable string streams
  imagesloc$ = this.imageslocSource.asObservable();

  imagesloc(l){
   // console.log(l);

    this.imageslocSource.next(l);
  }


}
