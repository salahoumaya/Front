import { Component, OnInit } from '@angular/core';
import { CandidatureService } from 'src/app/shared/service/candidature/candidature.service';
import { routes } from 'src/app/shared/service/routes/routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {
  candidatures: any[] = [];  // Liste des candidatures
  public errorMessage: string = '';
  public loading: boolean = true;

  constructor(private candidatureService: CandidatureService, private router: Router) {}

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

  public onUpdate(candidature: any): void {
    console.log('onUpdate called with:', candidature);
    const id = candidature.candidatId; // Assurez-vous que cette propriété existe
    if (id) {
      this.router.navigate(['/student/student-message', id]);
    } else {
      console.error('ID de candidature non valide');
    }
  }

  public getCountByStatus(status: string): number {
    return this.candidatures.filter(c => c.statut === status).length;
  }

  // Méthode pour supprimer une candidature
  public onDelete(candidatId: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette candidature ?')) {
      this.candidatureService.removeCandidature(candidatId).subscribe(
        () => {
          this.candidatures = this.candidatures.filter(c => c.candidatId !== candidatId);
          alert('Candidature supprimée avec succès.');
        },
        error => {
          console.error('Erreur lors de la suppression de la candidature', error);
          this.errorMessage = 'Impossible de supprimer la candidature. Veuillez réessayer plus tard.';
        }
      );
    }
  }

  public downloadCandidaturePdf(): void {
    console.log('Tentative de téléchargement du PDF...');
    this.candidatureService.downloadPdf().subscribe(
        (response: Blob) => {
            console.log('PDF reçu, traitement...');
            const blob = new Blob([response], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'candidatures.pdf';
            a.click();
            window.URL.revokeObjectURL(url);
            console.log('Téléchargement terminé.');
        },
        error => {
            console.error('Erreur lors du téléchargement du PDF', error);
            this.errorMessage = 'Impossible de télécharger le PDF. Veuillez réessayer plus tard.';
        }
    );
}
}