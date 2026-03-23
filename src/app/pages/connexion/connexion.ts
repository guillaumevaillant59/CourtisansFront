import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UtilisateurService } from '../../services/utilisateur-service';


@Component({
  selector: 'app-connexion',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './connexion.html',
  styleUrl: './connexion.css',
})


export class Connexion {
  email = '';
  password = '';

  constructor(private us: UtilisateurService, private router: Router) {}

  onLogin() {
    this.us.login(this.email, this.password).subscribe({
      next: (response: any) => { // <-- récupère la réponse ici
        const token = response.token; // le token JWT

        // stocker le token avant d'appeler fetchProfile
        localStorage.setItem('token', token);

        // récupérer le profil de l'utilisateur
        this.us.fetchProfile().subscribe({
          next: res => {
            this.us.utilisateur = res;
            this.router.navigate(['/profile']); // naviguer après tout est prêt
          },
          error: err => console.error(err)
        });
      },
      error: err => console.error('Login failed', err)
    });
  }
}