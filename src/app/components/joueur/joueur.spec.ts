import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Joueur } from './joueur';

describe('Joueur', () => {
  let component: Joueur;
  let fixture: ComponentFixture<Joueur>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Joueur],
    }).compileComponents();

    fixture = TestBed.createComponent(Joueur);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
