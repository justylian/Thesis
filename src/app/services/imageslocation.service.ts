import { environmentpixabay } from '../environments/environmentpixabay';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import { map } from "rxjs/operators";
import 'rxjs/add/operator/map';
@Injectable({
  providedIn: 'root'
})
export class ImageslocationService {

  constructor(private _http: HttpClient) { }
  public getImageLocation(photoid){

    //return
   /*  return this._http.get(this.URL + query + this.perPage + this.width  + this.categories + this.imagetype)
    .map(res => res);*/
    //console.log(photoid);
    return this._http.get("https://api.unsplash.com/photos/"+photoid+"/?client_id=d8022994ba1054ae0c2cd3775b92cc7b0d59f21a49a30b47d07b8aad5688caba")
    .map(res => res);


  }
}
