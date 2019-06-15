import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefreshTodosComponent } from './refresh-todos.component';

describe('RefreshTodosComponent', () => {
  let component: RefreshTodosComponent;
  let fixture: ComponentFixture<RefreshTodosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefreshTodosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefreshTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
