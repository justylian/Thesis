import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import io from "socket.io-client";
//import * as io from 'socket.io-client';

import * as Rx from "rxjs/Rx";
import { Subscriber } from "rxjs/Rx";
@Injectable({
  providedIn: "root"
})
export class SocketService {
  private url = "http://localhost:3000";
  private socket;

  constructor() {
    this.socket = io(this.url);
  }

  public sendCity( city) {
    this.socket.emit("new-city",  city);
  }
  public sendCountry( country) {
    this.socket.emit("new-country", country);
  }

  public getCity = () => {
    return Observable.create(observer => {
      this.socket.on("new-city", (city) => {
        console.log(city);
        observer.next(city);
      });
    });
  };
  public getCountry = () => {
    return Observable.create(observer => {
      this.socket.on("new-country", (country) => {
        console.log(country);
        observer.next( country);
      });
    });
  };
}
