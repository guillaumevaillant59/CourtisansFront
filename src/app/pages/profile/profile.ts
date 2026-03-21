import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Utilisateur from '../../models/utilisateur.model';
import { UtilisateurService } from '../../services/utilisateur-service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
    utilisateur: Utilisateur | null = null;

  constructor(private us : UtilisateurService, private router: Router) {}

  ngOnInit() {
    // si on a déjà le DTO dans le service, on l'utilise
    if (this.us.utilisateur) {
      this.utilisateur = this.us.utilisateur;
    } else {
      // sinon on le récupère via API
      this.us.fetchProfile().subscribe({
        next: res => this.utilisateur = res,
        error: err => {
          console.error(err);
          this.router.navigate(['/']); // redirige vers login si pas connecté
        }
      });
    }
  }

  onLogout() {
    this.us.logout().subscribe({
      next: () => {
        this.us.utilisateur = null;
        this.router.navigate(['/']);
      },
      error: err => console.error(err)
    });
  }
}
