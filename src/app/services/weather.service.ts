import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { map } from "rxjs/operators";
import "rxjs/add/operator/map";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private _http: HttpClient) { }


  public getWeather(lat,lang,parameter) {

    if(parameter===1){
      return  this._http.get("https://api.meteostat.net/v1/stations/search?q=toronto&key=Owa18FRN").map(data => data);

    }
   // https://api.meteostat.net/v1/climate/normals?station=10637&key=Owa18FRN
   // https://api.meteostat.net/v1/stations/search?q=toronto&key=XXXXXXXX
    else{
      return this._http.get("https://api.meteostat.net/v1/climate/normals?station="+parameter+"&key=Owa18FRN").map(data => data);

    }

  }
}
