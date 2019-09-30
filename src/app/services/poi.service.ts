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

   public getPOI(query){

    //console.log(coordinates);
   // return this._http.get("http://api.geonames.org/searchJSON?q="+query+"&featureCode=L&H&S&T&radius=15&maxRows=500&username=stylianx").map(data => data);



    //return this._http.get("http://api.geonames.org/searchJSON?q="+query+"&lang=en&featureCode=PIER&featureCode=OPRA&featureCode=THTR&featureCode=PRK&featureCode=STDM&featureCode=PAL&featureCode=NRWS&featureCode=CNL&featureCode=MUS&featureCode=MNMT&featureCode=ADMF&featureCode=BDG&featureCode=BCN&featureCode=ARCH&featureCode=CH&featureCode=CSTL&featureCode=FT&featureCode=LIBR&featureCode=MSQE&radius=50&maxRows=50&username=stylianx").map(data => data);
    return this._http.get("http://api.geonames.org/searchJSON?q="+query+"&lang=en&featureClass=H&featureClass=L&featureClass=S&featureClass=T&featureClass=U&featureClass=V&radius=50&maxRows=200&username=stylianx").map(data => data);

    //return this._http.get("http://api.geonames.org/searchJSON?lng="+coordinates[0]+"&lat="+coordinates[1]+"&featureCode=PRT&radius=15&maxRows=50&username=stylianx").map(data => data);
    //return this._http.get("http://api.geonames.org/findNearbyPOIsOSMJSON?lng="+coordinates[0]+"&lat="+coordinates[1]+"&radius=1&maxRows=50&username=stylianx").map(data => data);

  }
}
