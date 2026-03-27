import { Component, Input, OnChanges, SimpleChanges,ChangeDetectorRef} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Joueur from '../../models/joueur.model';

@Component({
  selector: 'app-joueur',
  imports: [],
  templateUrl: './joueur.html',
  styleUrl: './joueur.css',
})
export class JoueurComponent implements OnChanges {
  @Input() joueurId?: number;

  joueur? : Joueur;

  constructor(private http: HttpClient,  private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['joueurId'] && this.joueurId != null) {
      this.http.get<Joueur>(`http://localhost:8000/api/joueur/${this.joueurId}`)
      .subscribe(
          joueur => { // next callback
            this.joueur = joueur;
            this.cdr.detectChanges(); // force le rafraîchissement du template
          },
          err => { // error callback
            console.error("Erreur API Joueur :", err);
          }
        );
    }
  }
}
