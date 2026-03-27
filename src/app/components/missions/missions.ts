import { ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import MissionBlanche from '../../models/missionBlanche.model';
import MissionBleue from '../../models/missionBleue.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.html',
  styleUrls: ['./missions.css'], // attention: 'styleUrls' au pluriel
})
export class MissionsComponent implements OnChanges {
  @Input() missionBlancheId?: number; 
  @Input() missionBleueId?: number;

  missionBlanche?: MissionBlanche;
  missionBleue?: MissionBleue;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    // Chargement Mission Blanche
    if ('missionBlancheId' in changes && this.missionBlancheId != null) {
      this.http.get<MissionBlanche>(
        `http://localhost:8000/api/mission-blanche/${this.missionBlancheId}`
      ).subscribe({
        next: (mission) => {
          console.log('Mission Blanche reçue:', mission);
          this.missionBlanche = mission;
          this.cdr.detectChanges();
        },
        error: (err) => console.error("Erreur API Mission Blanche :", err),
      });
    } else {
      this.missionBlanche = undefined; // reset si ID null
    }

    // Chargement Mission Bleue
    if ('missionBleueId' in changes && this.missionBleueId != null) {
      this.http.get<MissionBleue>(
        `http://localhost:8000/api/mission-bleue/${this.missionBleueId}`
      ).subscribe({
        next: (mission) => {
          this.missionBleue = mission;
          this.cdr.detectChanges();
        },
        error: (err) => console.error("Erreur API Mission Bleue :", err),
      });
    } else {
      this.missionBleue = undefined; // reset si ID null
    }
  }
}