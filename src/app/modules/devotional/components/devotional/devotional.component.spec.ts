import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevotionalComponent } from './devotional.component';

describe('DevotionalComponent', () => {
  let component: DevotionalComponent;
  let fixture: ComponentFixture<DevotionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevotionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevotionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
