import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomaineReine } from './domaine-reine';

describe('DomaineReine', () => {
  let component: DomaineReine;
  let fixture: ComponentFixture<DomaineReine>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomaineReine],
    }).compileComponents();

    fixture = TestBed.createComponent(DomaineReine);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
