import { InfotableComponent } from './infotable/infotable.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [InfotableComponent],
  exports:[InfotableComponent],
  imports: [
    CommonModule
  ]
})
export class UpcomingModule { }
