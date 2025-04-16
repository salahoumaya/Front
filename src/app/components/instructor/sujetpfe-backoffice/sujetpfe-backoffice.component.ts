import {Component, OnInit} from '@angular/core';
import {DemandeStatus, SujetPfe} from 'src/app/models/sujetpfe';
import {SujetPfeService} from 'src/app/shared/service/sujetpfe/sujetpfe.service';
import {OuruserService} from 'src/app/shared/service/ouruser/ouruser.service';
import {AuthService} from "../../../shared/service/Auth/auth.service";

declare var bootstrap: any;

@Component({
  selector: 'app-instructor-course',
  templateUrl: './sujetpfe-backoffice.component.html',
  styleUrls: ['./sujetpfe-backoffice.component.scss'],
})
export class SujetpfeBackofficeComponent implements OnInit {
  sujets: SujetPfe[] = [];  // Liste des sujets
  selectedSujet!: SujetPfe; // Sujet en cours d'édition
  selectedImage: string | ArrayBuffer | null = null;
  moderators: any[] = []; // Liste des modérateurs

  userId!:number;

  // ✅ Variables pour les statistiques
  totalSujets: number = 0;
  sujetsAttribues: number = 0;
  sujetsNonAttribues: number = 0;

  pourcentageAttribues: number = 0; // Pourcentage des sujets attribués

  constructor(private sujetPfeService: SujetPfeService, private authService:AuthService) {
  }

  ngOnInit(): void {
    this.authService.getProfile().subscribe(value => {
      this.userId=value.ourUsers.id;
      this.loadSujets(this.userId);
      this.loadPourcentageAttribues();
    });
  }

  loadSujets(userId:number): void {
    this.sujetPfeService.getSujetsByModerator(userId).subscribe((data) => {
      this.sujets = data;
      console.log("Liste des sujets : ", data);
      // ✅ Calcul des statistiques
      this.totalSujets = data.length;
      this.sujetsAttribues = data.filter(s => s.userAttribue != null).length;
      this.sujetsNonAttribues = this.totalSujets - this.sujetsAttribues;
    });
  }

  loadPourcentageAttribues(): void {
    this.sujetPfeService.getPourcentageSujetsAttribues().subscribe((pourcentage: number) => {
      this.pourcentageAttribues = pourcentage;
      console.log("Pourcentage des sujets attribués :", pourcentage);

    }, error => {
      console.error("Erreur lors de la récupération du pourcentage :", error);
    });

  }

  openEditModal(sujet: SujetPfe): void {
    this.selectedSujet = {...sujet};
    const modalElement = document.getElementById('editSujetModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedImage = file.name; // Le nom du fichier sans chemin complet
      if (this.selectedSujet) {
        this.selectedSujet.image = file.name;
      }
    }
  }
}
