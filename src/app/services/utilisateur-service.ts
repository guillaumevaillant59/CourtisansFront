// src/app/services/utilisateur.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Utilisateur from '../models/utilisateur.model';

@Injectable({ providedIn: 'root' })
export class UtilisateurService {
  utilisateur: Utilisateur | null = null;
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient, private router: Router) {}

  // Connexion : reçoit un token côté serveur
  login(email: string, password: string) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password });
  }

  // Inscription
  register(data: any) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  // Récupération du profil : le token est géré par l'interceptor
  fetchProfile() {
    return this.http.get<Utilisateur>(`${this.apiUrl}/profile`);
  }

  // Déconnexion
  logout() {
    this.utilisateur = null;
    localStorage.removeItem('jwt_token');
    this.router.navigate(['/login']);
  }
}