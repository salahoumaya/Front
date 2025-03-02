import { Component, OnInit } from '@angular/core';
import { CandidatureService } from 'src/app/shared/service/candidature/candidature.service';

@Component({
  selector: 'app-candidature-list',
  templateUrl: './candidature-list.component.html',
  styleUrls: ['./candidature-list.component.scss']
})
export class CandidatureListComponent implements OnInit {
  candidatures: any[] = [];  // Liste des candidatures
  public errorMessage: string = '';
  public loading: boolean = true;

  constructor(private candidatureService: CandidatureService) {}

  ngOnInit(): void {
    this.loadCandidatures();
  }

  private loadCandidatures(): void {
    this.loading = true;
    this.candidatureService.getCandidatures().subscribe(
      data => {
        this.candidatures = data;
        this.loading = false;
      },
      error => {
        console.error('Erreur lors du chargement des candidatures', error);
        this.errorMessage = 'Impossible de charger les candidatures. Veuillez réessayer plus tard.';
        this.loading = false;
      }
    );
  }

  public getCountByStatus(status: string): number {
    return this.candidatures.filter(c => c.statut === status).length;
  }
}