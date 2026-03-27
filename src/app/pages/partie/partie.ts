import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import Partie from '../../models/partie.model';
import { DomaineReineComponent } from '../../components/domaine-reine/domaine-reine';
import Joueur from '../../models/joueur.model';
import { JoueurComponent } from '../../components/joueur/joueur';

@Component({
  selector: 'app-partie',
  imports: [CommonModule,DomaineReineComponent, JoueurComponent],
  templateUrl: './partie.html',
  styleUrl: './partie.css',
})
export class PartieComponent implements OnInit{
  partie : Partie | null = null;
  joueurs: Joueur[] = [];
  currentUserId : number = 0;

  constructor(
    private route: ActivatedRoute, // 🔥 pour récupérer l'id
    private http: HttpClient       // 🔥 pour appeler l'API
  ) {}

  ngOnInit() {
    const userIdStr = localStorage.getItem('user_id');
    if (userIdStr) {
      this.currentUserId = Number(userIdStr);
    }

    const id = this.route.snapshot.paramMap.get('id');
    

  if (id) {
      // Récupérer la partie
      this.http.get<Partie>(`http://localhost:8000/api/partie/${id}`)
        .subscribe(partieRes => {
          this.partie = partieRes;

          // 🔥 Récupérer les joueurs de cette partie
          this.http.get<Joueur[]>(`http://localhost:8000/api/joueur/partie/${id}`)
            .subscribe(joueursRes => {
              this.joueurs = joueursRes;
            });
        });
    }
  }
}
  
