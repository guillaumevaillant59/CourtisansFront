// src/app/services/partie-service.ts
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Partie from '../models/partie.model';

@Injectable({
  providedIn: 'root',
})
export class PartieService {
  apiUrl = 'http://127.0.0.1:8000/api/partie';
  http = inject(HttpClient);

  // GET toutes les parties
  getParties(): Observable<Partie[]> {
    return this.http.get<Partie[]>(this.apiUrl);
  }

  // GET une partie par ID
  getPartie(id: number): Observable<Partie> {
    return this.http.get<Partie>(`${this.apiUrl}/${id}`);
  }

  // POST création d'une partie
  createPartie(partie: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/creation`, partie);
  }

  // POST rejoindre une partie
  rejoindrePartie(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/rejoindre`, {});
  }

  // DELETE une partie par ID
  supprimerPartie(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}