import { MapawayComponent } from '../away/mapaway/mapaway.component';
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
export class POIService {

  constructor(private _http: HttpClient,private mapawayComponent:MapawayComponent) {

  }

   public getPOI(coordinates){

    console.log(coordinates);
    return this._http.get("http://api.geonames.org/findNearbyJSON?lng="+coordinates[0]+"&lat="+coordinates[1]+"&radius=15&maxRows=100&username=stylianx").map(data => data);
  }
}
