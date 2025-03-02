import { Component, OnInit } from '@angular/core';
import { CandidatureService } from 'src/app/shared/service/candidature/candidature.service';

@Component({
  selector: 'app-student-order-history',
  templateUrl: './student-order-history.component.html',
  styleUrls: ['./student-order-history.component.scss']
})
export class StudentOrderHistoryComponent implements OnInit {
  candidatures: any[] = []; // Déclaration de la propriété
  loading: boolean = false; // Pour gérer l'état de chargement
  errorMessage: string | null = null; // Pour gérer les messages d'erreur

  constructor(private candidatureService: CandidatureService) {}

  ngOnInit(): void {
    this.loadCandidatures(); // Appel pour charger les candidatures
  }

  loadCandidatures(): void {
    this.loading = true; // Démarrer le chargement
    this.candidatureService.getCandidatures().subscribe({
      next: (data) => {
        this.candidatures = data; // Remplir la propriété avec les données
        this.loading = false; // Fin du chargement
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement des candidatures.'; // Gérer l'erreur
        this.loading = false; // Fin du chargement
      }
    });
  }
}