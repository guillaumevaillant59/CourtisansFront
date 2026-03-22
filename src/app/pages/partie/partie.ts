import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import Partie from '../../models/partie.model';
import { DomaineReineComponent } from '../../components/domaine-reine/domaine-reine';

@Component({
  selector: 'app-partie',
  imports: [CommonModule,DomaineReineComponent],
  templateUrl: './partie.html',
  styleUrl: './partie.css',
})
export class PartieComponent implements OnInit{
  partie : Partie | null = null;

  constructor(
    private route: ActivatedRoute, // 🔥 pour récupérer l'id
    private http: HttpClient       // 🔥 pour appeler l'API
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.http.get<Partie>(`http://localhost:8000/api/partie/${id}`, {
      withCredentials: true
    }).subscribe(res => {
      console.log(res);
      this.partie = res;
    });
  }
}
  
