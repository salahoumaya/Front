import { Component, OnInit } from '@angular/core';
import { TrainingService } from 'src/app/shared/service/TrainingPlan/training.service';

@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.scss']
})
export class TrainingListComponent implements OnInit {
  trainings: any[] = [];

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.loadTrainings();
  }

  loadTrainings() {
    this.trainingService.getAllTrainings().subscribe(
      (data) => {
        this.trainings = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des formations', error);
      }
    );
  }

  deleteTraining(id: number) {
    this.trainingService.deleteTraining(id).subscribe(() => {
      this.trainings = this.trainings.filter(training => training.id !== id);
      alert('Formation supprimée avec succès');
    });
  }
}
