import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UtilisateurService } from '../../services/utilisateur-service';

@Component({
  selector: 'app-connexion',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './connexion.html',
  styleUrls: ['./connexion.css'], // corrigé
})
export class Connexion {
  email = '';
  password = '';

  constructor(private us: UtilisateurService, private router: Router) {}

  onLogin() {
    this.us.login(this.email, this.password).subscribe({
      next: (response: any) => {
        const token = response.token;
        localStorage.setItem('jwt_token', token);

        // ⚡ Appel correct avec subscribe
        this.us.fetchProfile(token).subscribe({
          next: res => {
            this.us.utilisateur = res;
            this.router.navigate(['/profile']);
          },
          error: err => {
            console.error('Erreur fetchProfile:', err);
            localStorage.removeItem('jwt_token');
            this.router.navigate(['/']);
          }
        });
      },
      error: err => console.error('Login failed', err)
    });
  }
}