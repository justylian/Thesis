import { MapawayComponent } from "../away/mapaway/mapaway.component";
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
export class POIService {
  constructor(
    private _http: HttpClient,
    private mapawayComponent: MapawayComponent
  ) {}

  public getPOI(query) {
    //console.log(coordinates);
    // return this._http.get("http://api.geonames.org/searchJSON?q="+query+"&featureCode=L&H&S&T&radius=15&maxRows=500&username=stylianx").map(data => data);

    query = query.split(" ").join("-");
   //return this._http.get("http://api.geonames.org/searchJSON?q="+query+"&lang=en&featureCode=PIER&featureCode=OPRA&featureCode=THTR&featureCode=PRK&featureCode=STDM&featureCode=PAL&featureCode=NRWS&featureCode=CNL&featureCode=MUS&featureCode=MNMT&featureCode=ADMF&featureCode=BDG&featureCode=BCN&featureCode=ARCH&featureCode=CH&featureCode=CSTL&featureCode=FT&featureCode=LIBR&featureCode=MSQE&radius=50&maxRows=200&username=stylianx").map(data => data);
   //return this._http.get("http://api.geonames.org/searchJSON?q="+query+"&orderby=relevance&lang=en&featureClass=S&featureClass=H&featureClass=L&featureClass=T&featureClass=U&featureClass=VM&featureCode=MUS&radius=100&maxRows=200&username=stylianx").map(data => data);
    return this._http.get("http://api.geonames.org/searchJSON?q="+query+"&lang=en&orderby=relevance&featureCode=BCH&featureCode=BCHS&featureCode=CLDA&featureCode=CLF&featureCode=CNYN&featureCode=DLTA&featureCode=DSRT&featureCode=DUNE&featureCode=HLL&featureCode=GRGE&featureCode=HLLS&featureCode=ISL&featureCode=ISLET&featureCode=ISLS&featureCode=ISTH&featureCode=MT&featureCode=MT&featureCode=PEN&featureCode=PLAT&featureCode=RDGB&featureCode=VLC&featureCode=VAL&featureCode=CNYU&featureCode=PIER&featureCode=AMUS&featureCode=PRK&featureCode=PRT&featureCode=OPRA&featureCode=THTR&featureCode=PRK&featureCode=STDM&featureCode=PAL&featureCode=NRWS&featureCode=CNL&featureCode=MUS&featureCode=MNMT&featureCode=ADMF&featureCode=BDG&featureCode=BCN&featureCode=ARCH&featureCode=CH&featureCode=CSTL&featureCode=FT&featureCode=LIBR&featureCode=MSQE&featureCode=BAY&featureCode=BAYS&featureCode=BGHT&featureCode=BOG&featureCode=CHN&featureCode=CHNL&featureCode=CHNM&featureCode=CHNN&featureCode=CNFL&featureCode=CNLA&featureCode=CNLB&featureCode=CNLD&featureCode=CNLI&featureCode=CNLN&featureCode=CNLQ&featureCode=CNLX&featureCode=COVE&featureCode=CRKT&featureCode=CRNT&featureCode=CUTF&featureCode=DCK&featureCode=DCKB&featureCode=DOMG&featureCode=DPRG&featureCode=RR&featureCode=TNL&featureCode=TRL&featureCode=ASPH&featureCode=ATOL&featureCode=AMTH&featureCode=ANS&featureCode=ARCHV&featureCode=ART&featureCode=ASTR&featureCode=ATHF&featureCode=BCN&featureCode=BDG&featureCode=BDGQ&featureCode=BLDG&featureCode=BUR&featureCode=BUSTN&featureCode=CAVE&featureCode=CSNO&featureCode=CSTM&featureCode=CTHSE&featureCode=CTRR&featureCode=CTRS&featureCode=DAM&featureCode=DAMQ&featureCode=DAMSB&featureCode=FT&featureCode=FY&featureCode=FYT&featureCode=GATE&featureCode=GRVE&featureCode=HERM&featureCode=HSPL&featureCode=LTHSE&featureCode=MAR&featureCode=MKT&featureCode=MOLE&featureCode=MSTY&featureCode=MTRO&featureCode=OBPT&featureCode=OBS&featureCode=PGDA&featureCode=PIER&featureCode=PRKGT&featureCode=PYR&featureCode=PYRS&featureCode=QUAY&featureCode=RLG&featureCode=RSRT&featureCode=SCHC&featureCode=SPA&featureCode=STNW&featureCode=TMB&featureCode=TMPL&featureCode=TOWR&featureCode=UNIV&featureCode=WALL&featureCode=WALLA&featureCode=ZOO&radius=30&maxRows=300&username=stylianx").map(data => data);

      //&featureClass=H&featureClass=L&featureClass=T&featureClass=V
   // return this._http.get("http://api.geonames.org/searchJSON?q="+query+"&lang=en&featureClass=H&featureClass=L&featureClass=S&featureClass=T&featureClass=U&featureClass=V&radius=50&maxRows=200&username=stylianx").map(data => data);

    //return this._http.get("http://api.geonames.org/searchJSON?lng="+coordinates[0]+"&lat="+coordinates[1]+"&featureCode=PRT&radius=15&maxRows=50&username=stylianx").map(data => data);
    //return this._http.get("http://api.geonames.org/findNearbyPOIsOSMJSON?lng="+coordinates[0]+"&lat="+coordinates[1]+"&radius=1&maxRows=50&username=stylianx").map(data => data);
  }
}
