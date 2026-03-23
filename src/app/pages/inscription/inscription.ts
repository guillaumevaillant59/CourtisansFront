import { Component } from '@angular/core';
import { UtilisateurService } from '../../services/utilisateur-service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  imports: [FormsModule],
  templateUrl: './inscription.html',
  styleUrl: './inscription.css',
})
export class Inscription {
  form = {
    email: '',
    password: '',
    pseudo:''
  };

  constructor(private authService: UtilisateurService, private router: Router) {}

  onSubmit() {
    this.authService.register(this.form).subscribe({
      next: (res) => {
        console.log('Utilisateur créé', res);
        this.router.navigate(['/connexion']);
      },
      error: (err) => {
        console.error('Erreur', err);
      }
    });
  }
}
