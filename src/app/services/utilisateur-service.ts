import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Utilisateur from '../models/utilisateur.model';

@Injectable({ providedIn: 'root' })
export class UtilisateurService {
  utilisateur: Utilisateur | null = null;
  private apiUrl: string = 'http://localhost:8000/api';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, { email, password }, { withCredentials: true });
  }

  register(data: any) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  fetchProfile() {
    return this.http.get<Utilisateur>(`${this.apiUrl}/profile`, { withCredentials: true });
  }

  logout() {
    return this.http.post(`${this.apiUrl}/logout`, {}, { 
      withCredentials: true,
      responseType: 'text'
     });
  }
}