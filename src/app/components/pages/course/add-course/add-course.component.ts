import { Component, OnInit } from '@angular/core';
import { CandidatureService } from 'src/app/shared/service/candidature/candidature.service';
import { Router } from '@angular/router'; // Importez Router

@Component({
  selector: 'app-add-course', // Assurez-vous que le sélecteur est correct
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {

  candidatures: any[] = [];  // Liste des candidatures
  newCandidature: any = { nom: '', prenom: '', email: '', specialite: '', statut: '', cvFile: null };  
  selectedCandidature: any = null;  
  activeIndex: number = 0;  
  errorMessage: string = '';  
  successMessage: string = ''; 
  isClicked: boolean = false; 

  constructor(private candidatureService: CandidatureService, private router: Router) { } // Injectez Router

  ngOnInit(): void {
    this.loadCandidatures();
  }

  loadCandidatures() {
    this.candidatureService.getCandidatures().subscribe(
      (response) => {
        this.candidatures = response;
      },
      (error) => {
        console.error('Erreur lors du chargement des candidatures', error);
        if (error.status === 403) {
          this.errorMessage = "Vous n'avez pas l'autorisation d'afficher les candidatures.";
        } else {
          this.errorMessage = 'Impossible de charger les candidatures, veuillez réessayer.';
        }
      }
    );
  }

  onSubmit(form: any) { 
    if (this.isValidCandidature(this.newCandidature)) {
      this.isClicked = true;

      this.candidatureService.addCandidature(this.newCandidature).subscribe(
        (response) => {
          console.log('✅ Candidature envoyée avec succès', response);
          this.successMessage = 'Candidature envoyée avec succès !';
          this.errorMessage = ''; 
          
          this.newCandidature = { nom: '', prenom: '', email: '', specialite: '', statut: 'EN_ATTENTE', cvFile: null };
          form.resetForm();
          this.resetButtonColor();
          
          // Appel à la méthode pour rediriger vers la liste des candidatures
          this.goToCandidatureList();
        },
        (error) => {
          console.error('❌ Erreur lors de l\'ajout de la candidature', error);
          this.successMessage = ''; 
          this.errorMessage = 'Une erreur est survenue lors de l\'ajout de la candidature.';
          this.resetButtonColor();
        }
      );
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
    }
  }

  // Ajoutez la méthode onFileSelected pour gérer le changement de fichier
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.newCandidature.cvFile = input.files[0];
    }
  }

  isValidCandidature(candidature: any): boolean {
    return candidature.nom && candidature.prenom && candidature.email && candidature.specialite && candidature.statut && candidature.cvFile;
  }

  // Nouvelle méthode pour rediriger vers la liste des candidatures
  goToCandidatureList() {
    this.router.navigate(['/pages/course/course-details']); // Remplacez par le chemin de votre route
  }

  // Réinitialisation de la couleur après 2 secondes
  resetButtonColor() {
    setTimeout(() => {
      this.isClicked = false;
    }, 1000);
  }
}