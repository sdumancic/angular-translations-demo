import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyLoadedComponent } from './lazy-loaded-component';

describe('LazyLoadedComponentComponent', () => {
  let component: LazyLoadedComponent;
  let fixture: ComponentFixture<LazyLoadedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LazyLoadedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LazyLoadedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
