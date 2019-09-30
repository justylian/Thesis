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
export class PlacesService {
  private query: string;
  private perPage: string = "&per_page=5";
  private width: string = "&min_width=1920";
  private orientation: string = "&orientation=horizontal";
  private categories: string = "&category=nature+places+travel+buildings";
  private imagetype:string ="&image_type=photo";
  constructor(private _http: HttpClient) { }

  public getInfo(query){


    return  this._http.get("https://en.wikipedia.org/api/rest_v1/page/summary/"+query)
    .map(data => data)
  }


  //0j05m3231zn8su61830it0s20kafys9z
}




