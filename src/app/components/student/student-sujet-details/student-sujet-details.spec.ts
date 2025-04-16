import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSujetDetails } from './student-sujet-details';

describe('InstructorProfileComponent', () => {
  let component: StudentSujetDetails;
  let fixture: ComponentFixture<StudentSujetDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentSujetDetails ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentSujetDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
