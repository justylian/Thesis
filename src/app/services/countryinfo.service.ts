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
export class CountryinfoService {

  constructor(private _http: HttpClient) { }


  public getCountryInfo(query) {

    query = query.split(" ").join("-");

    return this._http.get("https://restcountries.eu/rest/v2/name/"+query).map(data => data);
  }
}
