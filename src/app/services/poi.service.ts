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

   public getPOI(query,placename){

    //console.log(coordinates);
   // return this._http.get("http://api.geonames.org/searchJSON?q="+query+"&featureCode=L&H&S&T&radius=15&maxRows=500&username=stylianx").map(data => data);



    return this._http.get("http://api.geonames.org/searchJSON?q="+query+"&name="+placename+"&featureCode=S&radius=25&maxRows=1&username=stylianx").map(data => data);

    //return this._http.get("http://api.geonames.org/searchJSON?lng="+coordinates[0]+"&lat="+coordinates[1]+"&featureCode=PRT&radius=15&maxRows=50&username=stylianx").map(data => data);
    //return this._http.get("http://api.geonames.org/findNearbyPOIsOSMJSON?lng="+coordinates[0]+"&lat="+coordinates[1]+"&radius=1&maxRows=50&username=stylianx").map(data => data);

  }
}
