import { Injectable } from "@angular/core";
import {Subject} from 'rxjs';


@Injectable({
  providedIn: "root"
})
export class SocketService {
  constructor() { }
  private p2pSource = new Subject<any>();

  // Observable string streams
  p2p$ = this.p2pSource.asObservable();

  p2p(data){
    //console.log(i);
    this.p2pSource.next(data);
  }


}
