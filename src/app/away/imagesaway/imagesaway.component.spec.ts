import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesawayComponent } from './imagesaway.component';

describe('ImagesawayComponent', () => {
  let component: ImagesawayComponent;
  let fixture: ComponentFixture<ImagesawayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagesawayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesawayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
