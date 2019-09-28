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
export class ImagesService {
  private query: string;
  private API_KEY: string = environmentpixabay.PIXABAY_API_KEY;
  private API_URL: string = environmentpixabay.PIXABAY_API_URL;
  private URL: string = this.API_URL + this.API_KEY + '&q=';
  private perPage: string = "&per_page=5";
  private width: string = "&min_width=1920";
  private orientation: string = "&orientation=horizontal";
  private categories: string = "&category=nature+places+travel+buildings";
  private imagetype:string ="&image_type=photo";
  constructor(private _http: HttpClient) { }
   getImage(query){

    //return
   /*  return this._http.get(this.URL + query + this.perPage + this.width  + this.categories + this.imagetype)
    .map(res => res);*/
    //console.log(query);
    return  this._http.get("https://api.unsplash.com/search/photos/?client_id=d8022994ba1054ae0c2cd3775b92cc7b0d59f21a49a30b47d07b8aad5688caba&per_page=5&orientation=landscape&query=landmarks-"+query)
    .map(res => res);


  }
}
