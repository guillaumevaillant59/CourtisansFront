import { Component } from '@angular/core';
import { RouterLink, Router } from "@angular/router";
import { UtilisateurService } from '../../services/utilisateur-service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  constructor(public auth: UtilisateurService, private router: Router) {}

  logout() {
    this.auth.logout().subscribe({
      next: () => {
        this.auth.utilisateur = null;
        this.router.navigate(['/']);
      },
      error: () => {
        this.auth.utilisateur = null;
        this.router.navigate(['/']);
      }
    });
  }
}
