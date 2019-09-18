import { InfotableComponent } from './infotable/infotable.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapboxComponent } from './mapbox/mapbox.component';
import { PlacesComponent } from './places/places.component';


@NgModule({
  declarations: [InfotableComponent, MapboxComponent, PlacesComponent],
  exports:[InfotableComponent, MapboxComponent,PlacesComponent],
  imports: [
    CommonModule
  ]
})
export class UpcomingModule { }
