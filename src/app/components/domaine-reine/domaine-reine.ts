import { Component, Input, OnChanges, SimpleChanges,ChangeDetectorRef} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import DomaineReine from '../../models/domaineReine.model';

@Component({
  selector: 'app-domaine-reine',
  standalone: true,
  imports: [],
  templateUrl: './domaine-reine.html',
  styleUrl: './domaine-reine.css',
})
export class DomaineReineComponent {
  @Input()
  set domaineReineId(value: number | null | undefined) {
    

    if (value) {
      this.loadDomaine(value);
    }
  }
  domaineReine?: DomaineReine;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  loadDomaine(id: number) {
    this.http
      .get<DomaineReine>(`http://localhost:8000/api/domaine-reine/${id}`)
      .subscribe({
        next: (domaine) => {
          console.log('DATA', domaine);
          this.domaineReine = domaine;
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error('API ERROR', err);
        }
      });
  }
}

