import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Utilisateur from '../models/utilisateur.model';

@Injectable({ providedIn: 'root' })
export class UtilisateurService {
  utilisateur: Utilisateur | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http.post('http://localhost:8000/api/login', { email, password }, { withCredentials: true });
  }

  fetchProfile() {
    return this.http.get<Utilisateur>('http://localhost:8000/api/profile', { withCredentials: true });
  }

  logout() {
    return this.http.post('http://localhost:8000/api/logout', {}, { 
      withCredentials: true,
      responseType: 'text'
     });
  }
}