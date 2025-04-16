import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPostComponent } from './student-forums.component';

describe('StudentTicketsComponent', () => {
  let component: StudentPostComponent;
  let fixture: ComponentFixture<StudentPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentPostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
