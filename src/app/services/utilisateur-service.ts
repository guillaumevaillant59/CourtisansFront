// src/app/services/utilisateur.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import Utilisateur from '../models/utilisateur.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UtilisateurService {
  utilisateur: Utilisateur | null = null;
  private apiUrl: string = 'http://localhost:8000/api';

  constructor(private http: HttpClient, private router: Router) {}

  // Login : récupère le token et le stocke automatiquement
  login(email: string, password: string): Observable<{ token: string }> {
    return new Observable(observer => {
      this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password })
        .subscribe({
          next: (res) => {
            localStorage.setItem('jwt_token', res.token); // stocke le token
            observer.next(res);
            observer.complete();
          },
          error: (err) => observer.error(err)
        });
    });
  }

  // Register
  register(data: any) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  // Récupère automatiquement le token depuis localStorage
  fetchProfile(): Observable<Utilisateur> {
    const token = localStorage.getItem('jwt_token');
    if (!token) {
      throw new Error('Token manquant, l’utilisateur n’est pas connecté');
    }

    return this.http.get<Utilisateur>(`${this.apiUrl}/profile`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    });
  }

  // Logout
  logout() {
    this.utilisateur = null;
    localStorage.removeItem('jwt_token');
    this.router.navigate(['/login']);
  }

  // Méthode utilitaire pour savoir si l’utilisateur est connecté
  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwt_token');
  }
}