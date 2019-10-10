import { AppstateService } from './services/appstate.service';
import { DesktopComponent } from './routes/desktop/desktop.component';
import { MobileComponent } from './routes/mobile/mobile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Router } from '@angular/router';
import { CheckboxControlValueAccessor } from '@angular/forms';

const routes: Routes = [{
  path: 'mobile',
  component: MobileComponent},{

  path: '',
  component: DesktopComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})


export class AppRoutingModule {
  public constructor(private router: Router,
    private appstateService: AppstateService) {

    if (appstateService.getIsMobileResolution()) {
      router.navigate(['/mobile']);
    }
    else{
      router.navigate(['']);

    }
  }
}
