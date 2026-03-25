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

  getParties(): Observable<Partie[]> {
    return this.http.get<Partie[]>(`${this.apiUrl}`);
  }

  supprimerPartie(id: number) {
  const token = localStorage.getItem('token');

  return this.http.delete(`http://localhost:8000/api/partie/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}
}
