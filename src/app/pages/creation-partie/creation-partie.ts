import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router} from '@angular/router';

@Component({
  selector: 'app-creation-partie',
  imports: [FormsModule],
  templateUrl: './creation-partie.html',
  styleUrl: './creation-partie.css',
})
export class CreationPartie {
  partie = {
  nombreJoueurMax: 2
};

// Liste des options
  nombresJoueurs = [2, 3, 4, 5];
  

constructor(private http: HttpClient, private router: Router) {}

createPartie() {
  const token = localStorage.getItem('token');
  this.http.post('http://localhost:8000/api/partie/creation', this.partie,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  )
    .subscribe({
      next: (res) => {
        console.log('Partie créée', res);
        this.router.navigate(['/parties']);
      },
      error: (err) => {
        console.error(err);
      }
    });
}
}
