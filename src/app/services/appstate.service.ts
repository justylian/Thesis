import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppstateService {
  private isMobileResolution: boolean;

  constructor() {
    if (window.screen.width < 1920) {
      console.log('mobile')
      this.isMobileResolution = true;
    } else {
      //console.log('desktop')

      this.isMobileResolution = false;
    }
  }

  public getIsMobileResolution(): boolean {
    return this.isMobileResolution;
  }
}
