import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import Partie from '../../models/partie.model';
import Joueur from '../../models/joueur.model';
import { DomaineReineComponent } from '../../components/domaine-reine/domaine-reine';
import { JoueurComponent } from '../../components/joueur/joueur';

@Component({
  selector: 'app-partie',
  standalone: true,
  imports: [CommonModule, DomaineReineComponent, JoueurComponent],
  templateUrl: './partie.html',
  styleUrls: ['./partie.css']
})
export class PartieComponent implements OnInit {
  partie: Partie | null = null;
  joueurs: Joueur[] = [];
  currentUserId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const userIdStr = localStorage.getItem('user_id');
    if (userIdStr) this.currentUserId = Number(userIdStr);

    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.loadPartie(id);
  }

  private loadPartie(id: string) {
    this.http.get<Partie>(`http://localhost:8000/api/partie/${id}`)
      .subscribe({
        next: (res) => {
          this.partie = res;

          // Charger les DTO des joueurs
          if (this.partie.joueurs && this.partie.joueurs.length > 0) {
            this.loadJoueurs(this.partie.joueurs);
          }

          this.cdr.detectChanges(); // rafraîchissement du template
        },
        error: (err) => console.error('Erreur API Partie:', err)
      });
  }

  private loadJoueurs(joueurs: number[]) {
    // Supposons que joueurEntities contiennent les IDs des joueurs
    const ids = joueurs;
    

    // Appel API pour récupérer les DTO des joueurs
    ids.forEach(id => {
      this.http.get<Joueur>(`http://localhost:8000/api/joueur/${id}`)
        .subscribe({
          next: joueurDto => {
            this.joueurs.push(joueurDto);
            this.cdr.detectChanges(); // rafraîchit le template pour chaque joueur
          },
          error: err => console.error('Erreur API Joueur:', err)
        });
    });
  }
}