import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExamenService } from 'src/app/services/examen.service';
import { FormationService } from 'src/app/services/formation.service';
import { AuthService } from 'src/app/shared/service/Auth/auth.service';
import { userTestService } from 'src/app/shared/service/LevelTest/userTest.service';
import { routes } from 'src/app/shared/service/routes/routes';

@Component({
  selector: 'app-test-selection',
  templateUrl: './test-selection.component.html',
  styleUrls: ['./test-selection.component.scss']
})
export class TestSelectionComponent implements OnInit {
  tests: any[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  public routes = routes;

  constructor(private testService: userTestService,private examenservice:ExamenService,private auth: AuthService, private router: Router,private formationService: FormationService) {}
id:any
status:boolean=false
  ngOnInit() {
    this.auth.getProfile().subscribe(
      (user) => {
        console.log("User profile:", user.ourUsers.id);
        this.id = user.ourUsers.id
        console.log("User ID:", this.id);
        this.getFormations()
        this.getExamens()
        this.getallFormations()
        this.loadTests()
        this.getmoyenne()
      },
      (error) => {
        console.error("Error fetching user profile:", error);
      }
    );
  
   
  }
  hidden:boolean = false;
  toggleHidden() {
    this.hidden = !this.hidden;
  }
  formations:any[]=[]
  examans:any[]=[]
  getExamens(): void {
    this.examenservice.getAllexsuser(this.id).subscribe((data) => {
      this.examans = data;
      console.log(data);
      
    });
  }
  
  getFormations(): void {
    this.formationService.getAllFormationsuser(this.id).subscribe((data) => {
      console.log(data);
      
      this.formations = data;
    });
  }
  moyenne:any
  getmoyenne():void{
    this.examenservice.getmoyenne(this.id).subscribe((data:any[]) => {
      console.log(data);
      this.moyenne=data[0].moyenne
     
    }, (error) => {
      console.error('Error fetching formations', error);
    }
    );
  }

  getallFormations(): void {
    this.formationService.getAllFormations().subscribe((data) => {
      console.log(data);
      
      this.formations = data;
    });
  }
  assignUser(formationId: number) {
    this.formationService.assignUserToFormation(formationId, this.id).subscribe(response => {
      alert(response);
    }, error => {
      alert("Erreur lors de l'affectation !");
    });
  }
  selected(){
    this.status=  !this.status
    if (this.status) {
      this.getallFormations()
    }else{
      this.getFormations()
    }

  }
  loadTests() {
    this.testService.getTests().subscribe({
      next: (data) => {
        this.tests = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Erreur lors du chargement des tests :", err);
        this.errorMessage = "Impossible de charger les tests.";
        this.isLoading = false;
      }
    });
  }

  startTest(testId: number) {
    console.log("Navigation vers :", `${this.routes.test_attempt}/${testId}`);
    this.router.navigate([`${this.routes.test_attempt}/${testId}`]);
  }
}
