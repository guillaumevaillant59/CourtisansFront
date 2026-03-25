import { Component, inject, OnInit, signal } from '@angular/core';
import { PartieService } from '../../services/partie-service';
import Partie from '../../models/partie.model';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-parties',
  imports: [RouterLink],
  templateUrl: './parties.html',
  styleUrl: './parties.css',
})
export class Parties implements OnInit{
  ps=inject(PartieService);
  parties=signal<Partie[]>([]);

  constructor(private http:HttpClient, private router:Router){}

  ngOnInit(): void {
    this.chargerParties(); // utilise la méthode chargement centralisée
  }

  rejoindrePartie(id: number, event: Event) {
    event.preventDefault();
    this.ps.postWithToken(`${this.ps.apiUrl}/${id}/rejoindre`, {}).subscribe({
      next: () => {
        console.log('Partie rejointe');
        this.router.navigate(['/partie', id]);
      },
      error: (err) => console.error('Erreur rejoindre partie', err),
    });
  }

  supprimer(id: number, event: Event) {
  event.preventDefault();

  this.ps.supprimerPartie(id).subscribe({
    next: () => {
      console.log('Partie supprimée');
      // Exemple : recharger la liste
      this.chargerParties();
    },
    error: err => {
      console.error('Erreur suppression', err);
    }
  });
}

  chargerParties() {
    this.ps.getParties().subscribe({
      next: (res) => this.parties.set(res),
      error: (err) => {
        console.error('Erreur chargement parties', err);
        // si 401, rediriger vers login
        if (err.status === 401) this.router.navigate(['/']);
      },
    });
  }
}
