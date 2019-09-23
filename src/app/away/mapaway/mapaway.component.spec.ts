import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapawayComponent } from './mapaway.component';

describe('MapawayComponent', () => {
  let component: MapawayComponent;
  let fixture: ComponentFixture<MapawayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapawayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapawayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
