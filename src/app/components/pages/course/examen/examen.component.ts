import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Examen, ExamenService } from 'src/app/services/examen.service';

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrl: './examen.component.scss',
})
export class ExamenComponent implements OnInit {
  examens: Examen[] = [];
  examenForm!: FormGroup;
  isEditing: boolean = false;
  selectedExamenId?: number;
  idformation!: number;
  userId: number = 2; 

  constructor(
    private route: ActivatedRoute,
    private examenService: ExamenService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.idformation = Number(this.route.snapshot.paramMap.get('id'));
    this.initForm();
    this.loadExamens();
  }

  initForm(): void {
    this.examenForm = this.fb.group({
      titre: ['', Validators.required],
      note: ['', [Validators.required, Validators.min(0), Validators.max(20)]],
      examenT: ['ORAL', Validators.required],
      session: ['PRINCIPALE', Validators.required],
      date: ['', Validators.required]
    });
  }
  goBack(){
    window.history.back()
  }
  loadExamens(): void {
    this.examenService.getExamensbyfor(this.idformation).subscribe((data) => {
      this.examens = data;
    });
  }

  addExamen(): void {
    if (this.examenForm.valid) {
      const formattedDate = new Date(this.examenForm.value.date).toISOString();

      this.examenForm.patchValue({
        date: formattedDate 
      });
      this.examenService.addExamen(this.examenForm.value, this.userId, this.idformation).subscribe(() => {
        this.loadExamens();
        this.examenForm.reset();
      },(error)=>{
        console.log(error);
        
      });
    }
  }

  editExamen(examen: Examen): void {
    this.isEditing = true;
    this.selectedExamenId = examen.id;
    this.examenForm.patchValue(examen);
  }

  updateExamen(): void {
    if (this.examenForm.valid && this.selectedExamenId) {
      const formattedDate = new Date(this.examenForm.value.date).toISOString();

      this.examenForm.patchValue({
        date: formattedDate 
      });
      this.examenService.updateExamen(this.selectedExamenId, this.examenForm.value).subscribe(() => {
        this.isEditing = false;
        this.selectedExamenId = undefined;
        this.loadExamens();
        this.examenForm.reset();
      });
    }
  }

  deleteExamen(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cet examen ?')) {
      this.examenService.deleteExamen(id).subscribe(() => {
        this.loadExamens();
      });
    }
  }
}
