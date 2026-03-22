import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import DomaineReine from '../../models/domaineReine.model';

@Component({
  selector: 'app-domaine-reine',
  imports: [],
  templateUrl: './domaine-reine.html',
  styleUrl: './domaine-reine.css',
})
export class DomaineReineComponent implements OnInit{
  @Input() domaineReineId?: number;

  domaineReine?: DomaineReine;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    if (this.domaineReineId) {
      // 1️⃣ Fetch le domaineReine léger
      this.http.get<DomaineReine>(`http://localhost:8000/api/domaine-reine/${this.domaineReineId}`)
        .subscribe(domaine => {
          this.domaineReine = domaine;
          console.log("ici")
          
        });
    }
  }
}
