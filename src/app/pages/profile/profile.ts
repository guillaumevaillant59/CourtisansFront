import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Utilisateur from '../../models/utilisateur.model';
import { UtilisateurService } from '../../services/utilisateur-service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'], // corrigé
})
export class Profile implements OnInit {
  utilisateur: Utilisateur | null = null;

  constructor(private us: UtilisateurService, private router: Router) {}

  ngOnInit() {
    // Vérifie si on a déjà le DTO dans le service
    if (this.us.utilisateur) {
      this.utilisateur = this.us.utilisateur;
    } else {
      // Récupère le JWT depuis localStorage
      const token = localStorage.getItem('jwt_token');
      if (!token) {
        console.error('JWT manquant !');
        this.router.navigate(['/']); // redirige vers login
        return;
      }

      // Récupère le profil via API avec le token
      this.us.fetchProfile().subscribe({
        next: res => this.utilisateur = res,
        error: err => {
          console.error('Erreur API:', err);
          this.router.navigate(['/']); // redirige vers login si token invalide
        }
      });
    }
  }

  onLogout() {
    // Supprime le token côté client
    localStorage.removeItem('jwt_token');
    this.us.utilisateur = null;
    this.router.navigate(['/']);
  }
}