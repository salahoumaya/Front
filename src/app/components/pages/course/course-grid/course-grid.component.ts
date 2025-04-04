import { Component, OnInit } from '@angular/core';
import { TrainingService } from 'src/app/shared/service/TrainingPlan/training.service';
interface data {
  active?: boolean;
}
import { routes } from 'src/app/shared/service/routes/routes';
declare var bootstrap: any; 

@Component({
  selector: 'app-course-grid',
  templateUrl: './course-grid.component.html',
  styleUrls: ['./course-grid.component.scss'],
})
export class CourseGridComponent implements OnInit {
  courses: any[] = [];
  filteredCourses: any[] = [];
  displayedCourses: any[] = []; 
  isLoading: boolean = false;
  errorMessage: string = '';
  searchDataValue: string = '';
  selectedTypes: string[] = [];
  routes = routes ; 
  selectedTraining: any = null; 
  isSubscribing: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 0;

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.fetchCourses();
  }

  fetchCourses() {
    this.isLoading = true;
    this.trainingService.getTrainingsForAuthenticatedSTUDENT().subscribe(
      (data) => {
        this.courses = data;
        this.filteredCourses = data; 
        this.updatePagination();
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to load courses. Please try again.';
        this.isLoading = false;
      }
    );
  }

  searchData() {
    this.filterCourses();
  }

  toggleTypeFilter(type: string) {
    if (this.selectedTypes.includes(type)) {
      this.selectedTypes = this.selectedTypes.filter(t => t !== type);
    } else {
      this.selectedTypes.push(type);
    }
    this.filterCourses();
  }

  filterCourses() {
    let filtered = this.courses;

    // Apply search filter
    if (this.searchDataValue.trim()) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(this.searchDataValue.toLowerCase()) ||
        course.description.toLowerCase().includes(this.searchDataValue.toLowerCase())
      );
    }

    // Apply type filter
    if (this.selectedTypes.length > 0) {
      filtered = filtered.filter(course => this.selectedTypes.includes(course.typeTraning));
    }

    this.filteredCourses = filtered;
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredCourses.length / this.itemsPerPage);
    this.displayedCourses = this.filteredCourses.slice(
      (this.currentPage - 1) * this.itemsPerPage, 
      this.currentPage * this.itemsPerPage
    );
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }
  openSubscribeModal(training: any) {
    this.selectedTraining = training;
    const modal = new bootstrap.Modal(document.getElementById('subscribeModal'));
    modal.show();
  }

  confirmSubscription() {
    if (!this.selectedTraining || this.isSubscribing) return;
    this.isSubscribing = true;
    this.trainingService.subscribeToTraining(this.selectedTraining.id).subscribe(
      (response) => {
        console.log('Subscription successful:', response);
        this.isSubscribing = false;
        const modal = bootstrap.Modal.getInstance(document.getElementById('subscribeModal'));
        this.fetchCourses();
        modal.hide();
      },
      (error) => {
        console.error('Subscription failed:', error);
        this.isSubscribing = false;
      }
    );
  }
}
