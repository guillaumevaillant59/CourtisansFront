import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UtilisateurService } from '../../services/utilisateur-service';


@Component({
  selector: 'app-connexion',
  imports: [FormsModule, CommonModule],
  templateUrl: './connexion.html',
  styleUrl: './connexion.css',
})


export class Connexion {
  email = '';
  password = '';

  constructor(private us: UtilisateurService, private router: Router) {}

  onLogin() {
    this.us.login(this.email, this.password).subscribe({
      next: () => {
        // récupérer le profil après login
        this.us.fetchProfile().subscribe({
          next: res => {
            this.us.utilisateur = res;
            this.router.navigate(['/profile']);
          },
          error: err => console.error(err)
        });
      },
      error: err => console.error('Login failed', err)
    });
  }
}