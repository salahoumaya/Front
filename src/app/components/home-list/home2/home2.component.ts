import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importez Router
import { EntretienService } from 'src/app/shared/service/Entretien/entretien.service';

@Component({
  selector: 'app-home2',
  templateUrl: './home2.component.html',
  styleUrls: ['./home2.component.scss'],
})
export class Home2Component implements OnInit {

  entretiens: any[] = [];  // Liste des entretiens
  newEntretien: any = { dateEntretien: '', lieu: '', note: '' };  
  errorMessage: string = '';  
  successMessage: string = ''; 
  isClicked: boolean = false; 

  constructor(private entretienService: EntretienService, private router: Router) { } // Injectez Router

  ngOnInit(): void {
    this.loadEntretiens();
  }

  loadEntretiens() {
    this.entretienService.getEntretiens().subscribe(
      (response) => {
        this.entretiens = response;
      },
      (error) => {
        console.error('Erreur lors du chargement des entretiens', error);
        if (error.status === 403) {
          this.errorMessage = "Vous n'avez pas l'autorisation d'afficher les entretiens.";
        } else {
          this.errorMessage = 'Impossible de charger les entretiens, veuillez réessayer.';
        }
      }
    );
  }

  onSubmit(form: any) { 
    if (this.isValidEntretien(this.newEntretien)) {
      this.isClicked = true;

      this.entretienService.addEntretien(this.newEntretien).subscribe(
        (response) => {
          console.log('✅ Entretien ajouté avec succès', response);
          this.successMessage = 'Entretien ajouté avec succès !';
          this.errorMessage = ''; 
          
          this.newEntretien = { dateEntretien: '', lieu: '', note: '' };
          form.resetForm();
          this.resetButtonColor();
          
          // Appel à la méthode pour rediriger vers la liste des entretiens
          this.goToEntretienList();
        },
        (error) => {
          console.error('❌ Erreur lors de l\'ajout de l\'entretien', error);
          this.successMessage = ''; 
          this.errorMessage = 'Une erreur est survenue lors de l\'ajout de l\'entretien.';
          this.resetButtonColor();
        }
      );
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
    }
  }

  isValidEntretien(entretien: any): boolean {
    return entretien.dateEntretien && entretien.lieu; // Vérifiez les champs requis
  }

  // Nouvelle méthode pour rediriger vers la liste des entretiens
  goToEntretienList() {
    this.router.navigate(['/entretien/list']); // Remplacez par le chemin de votre route
  }

  // Réinitialisation de la couleur après 2 secondes
  resetButtonColor() {
    setTimeout(() => {
      this.isClicked = false;
    }, 1000);
  }
}


