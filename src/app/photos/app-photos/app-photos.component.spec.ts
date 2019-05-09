import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPhotosComponent } from './app-photos.component';

describe('AppPhotosComponent', () => {
  let component: AppPhotosComponent;
  let fixture: ComponentFixture<AppPhotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppPhotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
