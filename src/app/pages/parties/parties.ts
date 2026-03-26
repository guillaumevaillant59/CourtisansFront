import { Component, inject, OnInit, signal } from '@angular/core';
import { PartieService } from '../../services/partie-service';
import Partie from '../../models/partie.model';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-parties',
  imports: [RouterLink],
  templateUrl: './parties.html',
  styleUrls: ['./parties.css'], // corrigé
})
export class Parties implements OnInit {
  ps = inject(PartieService);
  parties = signal<Partie[]>([]);

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log(localStorage.getItem('jwt_token'));
    this.chargerParties(); // charge la liste au démarrage
  }

  rejoindrePartie(id: number, event: Event) {
    event.preventDefault();

    this.ps.rejoindrePartie(id).subscribe({
      next: () => {
        // Succès : navigation vers la partie
        console.log('Partie rejointe');
        this.router.navigate(['/partie', id]);
      },
      error: (err) => {
        // Si c'est un 400 avec message, affiche la notification
        if (err.status === 400 && err.error?.error) {
          this.showNotification(err.error.error); // fonction custom pour notifier l'utilisateur
        } else {
          // Erreur inconnue
          console.error('Erreur rejoindre partie', err);
          this.showNotification('Une erreur est survenue, réessayez.');
        }
      },
    });
  }

  // Méthode pour afficher la notification (simple signal + alert)
  notification = signal<string | null>(null);

  showNotification(message: string) {
    this.notification.set(message);
    // Supprime la notification automatiquement après 3 secondes
    setTimeout(() => this.notification.set(null), 3000);
  }

  supprimer(id: number, event: Event) {
    event.preventDefault();

    this.ps.supprimerPartie(id).subscribe({
      next: () => {
        console.log('Partie supprimée');
        this.chargerParties(); // recharge la liste après suppression
      },
      error: (err) => console.error('Erreur suppression', err),
    });
  }

  chargerParties() {
    this.ps.getParties().subscribe({
      next: (res) => this.parties.set(res),
      error: (err) => {
        console.error('Erreur chargement parties', err);
        if (err.status === 401) this.router.navigate(['/login']); // redirection si non auth
      },
    });
  }
}