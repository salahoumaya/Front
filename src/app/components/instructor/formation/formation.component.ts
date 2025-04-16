import { Component, OnInit } from '@angular/core';
import { ExamenService } from 'src/app/services/examen.service';
import { Formation, FormationService } from 'src/app/services/formation.service';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.scss'],
})
export class FormationComponent implements OnInit {
  userMoyennes: any[] = [];
getusersmoy(id: any) {
this.formationService.getmoyenneusers(id).subscribe((data) => {
  this.userMoyennes=data
  this.examen.calcul(id).subscribe((data) => {
    console.log(data);
  }, (error) => {
    console.error('Error fetching formations', error);
  }
  );
})
}
  formations: any[] = [];
  newFormation: Formation = new Formation();
  selectedFormation: Formation | null = null;

  constructor(private formationService: FormationService,
    private examen: ExamenService,
  ) {}
  examans:any[]=[]
  selectedFormationId:any
  showCourses:boolean = false;
  getCourses(id:any): void {
    this.selectedFormationId = id;
    this.showCourses = true;
    this.formationService.getAllCouresebyformation(id).subscribe((data) => {
      console.log(data);
      
      this.courses = data;
    });
  }
  hidden=false
  status=false
  moyenne:any
  formationMoyennes: { [key: number]: number } = {}; 

  ngOnInit(): void {
    this.getallFormations()
  }
  courses:any[]=[]

  formationsall:any[]=[]

  getallFormations(): void {
    this.formationService.getAllFormations().subscribe((data) => {
      this.formationsall = data;
  
    
  
    }, error => {
      console.error('Erreur lors de la récupération des formations', error);
    });
  }
  calculmoyenne(id:number):void{
    this.examen.calcul(id).subscribe((data) => {
      console.log(data);
      alert("la moyenne est : "+data)
    }, (error) => {
      console.error('Error fetching formations', error);
    }
    );
  }
  addFormation(): void {
    this.formationService.createFormation(this.newFormation).subscribe(() => {
      this.openadd=false
      this.newFormation = new Formation();
    });
  }

  editFormation(formation: Formation): void {
    this.selectedFormation = { ...formation };
  }

  updateFormation(): void {
    if (this.selectedFormation) {
      this.formationService
        .updateFormation(this.selectedFormation.id, this.selectedFormation)
        .subscribe(() => {
          this.selectedFormation = null;
        });
    }
  }

  deleteFormation(id: number): void {
    this.formationService.deleteFormation(id).subscribe(() => {
    });
  }
  cancelCoursesView() {
    this.showCourses = false;
    this.selectedFormationId = null;
  }
  
  cancelEdit(): void {
    this.selectedFormation = null;
  }
  openadd:boolean=false
  cancelajouter(): void {
    this.openadd = !this.openadd;
  }
}
