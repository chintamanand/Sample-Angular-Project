import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeComponentComponent } from './three-component.component';

describe('ThreeComponentComponent', () => {
  let component: ThreeComponentComponent;
  let fixture: ComponentFixture<ThreeComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThreeComponentComponent]
    });
    fixture = TestBed.createComponent(ThreeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
