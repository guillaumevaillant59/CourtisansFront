import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import Utilisateur from '../models/utilisateur.model';

@Injectable({ providedIn: 'root' })
export class UtilisateurService {
  utilisateur: Utilisateur | null = null;
  private apiUrl: string = 'http://localhost:8000/api';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http.post<{token: string}>(`${this.apiUrl}/login`, { email, password });
  }

  register(data: any) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

fetchProfile(token: string) {
  return this.http.get<Utilisateur>(`${this.apiUrl}/profile`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}
  logout() {
    // Si tu utilises JWT stateless, logout côté serveur n’est pas nécessaire.
    // Tu peux simplement supprimer le token côté client
    this.utilisateur = null;
    localStorage.removeItem('jwt_token');
    this.router.navigate(['/login']);
  }
}