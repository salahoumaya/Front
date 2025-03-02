import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidatureService } from 'src/app/shared/service/candidature/candidature.service';
import { NgForm } from '@angular/forms'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-candidature',
  templateUrl: './update-candidature.component.html',
  styleUrls: ['./update-candidature.component.scss']
})
export class UpdateCandidatureComponent implements OnInit {
  candidatureId: number = 0; // Initialisé à une valeur par défaut
  candidature: any; // Remplacez par votre type spécifique

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private candidatureService: CandidatureService
  ) {}

  ngOnInit(): void {
    this.candidatureId = +this.route.snapshot.paramMap.get('id')!; // Assurez-vous que l'ID est un nombre
    this.loadCandidature();
  }

  private loadCandidature(): void {
    this.candidatureService.getCandidatureById(this.candidatureId).subscribe(
      data => {
        this.candidature = data;
      },
      error => {
        console.error('Erreur lors du chargement de la candidature', error);
        alert('Erreur lors du chargement de la candidature. Veuillez réessayer.'); // Alerte à l'utilisateur
      }
    );
  }

  public onSubmit(candidatureForm: NgForm): void { // Accepte le formulaire en tant qu'argument
    if (candidatureForm.valid) {
        this.candidatureService.modifyCandidature(this.candidature).subscribe(
            () => {
                alert('Candidature mise à jour avec succès.');
                this.router.navigate(['/pages/course/candidature-list']);
            },
            error => {
                console.error('Erreur lors de la mise à jour de la candidature', error);
                alert('Erreur lors de la mise à jour de la candidature. Veuillez réessayer.'); // Alerte à l'utilisateur
            }
        );
    } else {
        alert('Veuillez remplir tous les champs requis.');
    }
  }

  public goToCandidatureList(): void {
    this.router.navigate(['/pages/course/candidature-list']);
  }

  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // Logique pour gérer le fichier sélectionné
      console.log('Fichier sélectionné:', file);
    }
  }
}