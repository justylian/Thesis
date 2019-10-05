import { environmentpixabay } from "../environments/environmentpixabay";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { map } from "rxjs/operators";
import "rxjs/add/operator/map";

@Injectable({
  providedIn: "root"
})
export class ImagesService {
  private query: string;
  private API_KEY: string = environmentpixabay.PIXABAY_API_KEY;
  private API_URL: string = environmentpixabay.PIXABAY_API_URL;
  private URL: string = this.API_URL + this.API_KEY + '&q=';
  private perPage: string = "&per_page=3";
  private width: string = "&min_width=1920";
  private height: string = "&min_height=1080";
  private colors: string = "&colors=brown.pink.lilac.blue.turquoise.green.yellow.orange.red.transparent"
  private orientation: string = "&orientation=horizontal";
  private imagetype:string ="&image_type=photo";
  constructor(private _http: HttpClient) { }
  public getImage(query){

    //return
    query=query.split(' ').join('-');
    //console.log(query);
   // console.log(this.URL + query + this.height +this.perPage+this.orientation+ this.imagetype);
    return this._http.get(this.URL + query + this.height +this.colors +this.perPage+this.orientation+ this.imagetype)
    .map(res => res);
    //console.log(query);

  }
}
