import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Partie from '../models/partie.model';

@Injectable({
  providedIn: 'root',
})
export class PartieService {
  apiUrl: string = 'http://127.0.0.1:8000/api/partie';
  http = inject(HttpClient);

  // GET toutes les parties
  getParties(): Observable<Partie[]> {
    const token = localStorage.getItem('jwt_token');
    return this.http.get<Partie[]>(this.apiUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  // DELETE une partie par ID avec JWT
  supprimerPartie(id: number) {
    const token = localStorage.getItem('jwt_token');
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // Méthode générique POST avec JWT
  postWithToken(url: string, data: any) {
    const token = localStorage.getItem('jwt_token');
    return this.http.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  }

  // Création de partie via postWithToken
  createPartie(partie: any) {
    return this.postWithToken(`${this.apiUrl}/creation`, partie);
  }
}