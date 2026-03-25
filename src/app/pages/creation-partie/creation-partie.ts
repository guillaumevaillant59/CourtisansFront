import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PartieService } from '../../services/partie-service';

@Component({
  selector: 'app-creation-partie',
  imports: [FormsModule],
  templateUrl: './creation-partie.html',
  styleUrl: './creation-partie.css',
})
export class CreationPartie {
  partie = {
    nombreJoueurMax: 2
  };

  // Liste des options
  nombresJoueurs = [2, 3, 4, 5];

  constructor(private partieService: PartieService, private router: Router) {}

  createPartie() {
    this.partieService.createPartie(this.partie).subscribe({
      next: (res) => {
        console.log('Partie créée', res);
        this.router.navigate(['/parties']);
      },
      error: (err) => {
        console.error('Erreur création partie:', err);
      }
    });
  }
}