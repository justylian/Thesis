import { InfotableComponent } from './infotable/infotable.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapboxComponent } from './mapbox/mapbox.component';


@NgModule({
  declarations: [InfotableComponent, MapboxComponent],
  exports:[InfotableComponent, MapboxComponent],
  imports: [
    CommonModule
  ]
})
export class UpcomingModule { }
