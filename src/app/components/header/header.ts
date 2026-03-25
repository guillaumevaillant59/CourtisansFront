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
    this.auth.utilisateur = null;
    localStorage.removeItem('jwt_token');
    this.router.navigate(['/']);
  }
}
