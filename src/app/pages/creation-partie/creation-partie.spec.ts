import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationPartie } from './creation-partie';

describe('CreationPartie', () => {
  let component: CreationPartie;
  let fixture: ComponentFixture<CreationPartie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreationPartie],
    }).compileComponents();

    fixture = TestBed.createComponent(CreationPartie);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
