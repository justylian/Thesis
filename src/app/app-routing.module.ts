import { AppstateService } from './services/appstate.service';
import { DesktopComponent } from './routes/desktop/desktop.component';
import { MobileComponent } from './routes/mobile/mobile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Router } from '@angular/router';
import { CheckboxControlValueAccessor } from '@angular/forms';

const MobileRoutes: Routes = [{
  path: 'mobile',
  component: MobileComponent
}];
const DesktopRoutes: Routes=[
{
  path: '',
  component: DesktopComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(DesktopRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})


export class AppRoutingModule {
  public constructor(private router: Router,
    private appstateService: AppstateService) {

    if (appstateService.getIsMobileResolution()) {
      console.log("cds")
      //this.router.navigate();
      router.resetConfig(MobileRoutes);
    }
  }
}
