import { Component, inject, OnInit, signal } from '@angular/core';
import { PartieService } from '../../services/partie-service';
import Partie from '../../models/partie.model';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-parties',
  imports: [RouterLink],
  templateUrl: './parties.html',
  styleUrl: './parties.css',
})
export class Parties implements OnInit{
  ps=inject(PartieService);
  parties=signal<Partie[]>([]);

  constructor(private http:HttpClient, private router:Router){}

  ngOnInit(): void {
    this.ps.getParties().subscribe({
      next : (res) => {
        this.parties.set(res);
      }
    });
  }

  rejoindrePartie(id: number, event: Event) {
    event.preventDefault();
    
    const token = localStorage.getItem('token');

    this.http.post(`http://localhost:8000/api/partie/${id}/rejoindre`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe({
      next: () => {
        console.log('Partie rejointe');
        this.router.navigate(['/partie', id]); // redirige vers la partie
      },
      error: err => {
        console.error('Erreur lors de la connexion à la partie', err);
      }
    });
  }
}
