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
  private URL: string = this.API_URL + this.API_KEY + "&q=";
  private perPage: string = "&per_page=5";
  private width: string = "&min_width=1920";
  private orientation: string = "&orientation=horizontal";
  private categories: string = "&category=nature+places+travel+buildings";
  private imagetype: string = "&image_type=photo";
  private queryparameter1 = "city";
  private queryparameter2 = "sightseeing";
  private queryparameter3 = "cityscape";
  private queryparameter4 = "monument";
  private queryparameter5 = "landmark";
  private queryparameter6 = "museum";
  private queryparameter7 = "architecture";
  private queryparameter8 = "building";
  private queryparameter9 = "park";
  queryparameter;
  results=5;
  loop = 0;

  constructor(private _http: HttpClient) {}
  getImage(query) {
    this.loop++;
    if (this.loop === 1) {
      this.queryparameter = this.queryparameter1;
    } else if (this.loop === 2) {
      this.results=1;
      this.queryparameter = this.queryparameter2;
    } else if (this.loop === 3) {
      this.queryparameter = this.queryparameter3;
    } else if (this.loop === 4) {
      this.queryparameter = this.queryparameter4;
    } else if (this.loop === 5) {
      this.queryparameter = this.queryparameter5;
    } else if (this.loop === 6) {
      this.queryparameter = this.queryparameter6;
    } else if (this.loop === 7) {
      this.queryparameter = this.queryparameter7;
    } else if (this.loop === 8) {
      this.queryparameter = this.queryparameter8;
    } else {
      this.queryparameter = this.queryparameter9;
    }
    console.log(this.queryparameter);
    return this._http
      .get(
        "https://api.unsplash.com/search/photos/?client_id=d8022994ba1054ae0c2cd3775b92cc7b0d59f21a49a30b47d07b8aad5688caba&per_page="+this.results+"&orientation=landscape&query=" +
          query +
          "-" +
          this.queryparameter
      )
      .map(res => res);
  }
}
