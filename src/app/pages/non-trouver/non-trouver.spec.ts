import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonTrouver } from './non-trouver';

describe('NonTrouver', () => {
  let component: NonTrouver;
  let fixture: ComponentFixture<NonTrouver>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NonTrouver],
    }).compileComponents();

    fixture = TestBed.createComponent(NonTrouver);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
