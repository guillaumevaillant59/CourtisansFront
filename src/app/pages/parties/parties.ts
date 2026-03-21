import { Component, inject, OnInit, signal } from '@angular/core';
import { PartieService } from '../../services/partie-service';
import Partie from '../../models/partie.model';

@Component({
  selector: 'app-parties',
  imports: [],
  templateUrl: './parties.html',
  styleUrl: './parties.css',
})
export class Parties implements OnInit{
  ps=inject(PartieService);
  parties=signal<Partie[]>([]);

  ngOnInit(): void {
    this.ps.getParties().subscribe({
      next : (res) => {
        this.parties.set(res);
      }
    });
  }
}
