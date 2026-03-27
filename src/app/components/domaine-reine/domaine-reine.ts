import { Component, Input, OnChanges, SimpleChanges,ChangeDetectorRef} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import DomaineReine from '../../models/domaineReine.model';

@Component({
  selector: 'app-domaine-reine',
  imports: [],
  templateUrl: './domaine-reine.html',
  styleUrl: './domaine-reine.css',
})
export class DomaineReineComponent implements OnChanges{
  @Input() domaineReineId?: number;

  domaineReine?: DomaineReine;

  constructor(private http: HttpClient,  private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['domaineReineId'] && this.domaineReineId != null) {
      this.http.get<DomaineReine>(`http://localhost:8000/api/domaine-reine/${this.domaineReineId}`)
        .subscribe(
          domaine => { // next callback
            this.domaineReine = domaine;
            this.cdr.detectChanges(); // force le rafraîchissement du template
          },
          err => { // error callback
            console.error("Erreur API DomaineReine :", err);
          }
        );
    }
  }
}

