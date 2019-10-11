import { Injectable } from "@angular/core";
import {Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: "root"
})
export class SocketService {
  constructor(private http: HttpClient) { }
  private p2pSource = new Subject<any>();
  // Observable string streams
  p2p$ = this.p2pSource.asObservable();

  p2p(data){
    console.log(data);
    this.p2pSource.next(data);
  }




  setInfo(data){
    console.log("Seting");
    this.http.post('http://localhost:3000/setNextDestination', data,{

    }).subscribe(res => {
    });

  }

  resetInfo(){
    console.log("Resetting");

    this.http.post('http://localhost:3000/resetNextDestination', {

    }).subscribe(res => {
    });
  }


}
