import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InitialService {

  constructor() { }

  private timelineFocusSource = new Subject<any>();

  // Observable string streams
  timelineFocus$ = this.timelineFocusSource.asObservable();

  timelineFocus(i){
    this.timelineFocusSource.next(i);
  }
}
