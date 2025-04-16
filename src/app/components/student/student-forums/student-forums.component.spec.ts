import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentForumsComponent } from './student-forums.component';

describe('StudentTicketsComponent', () => {
  let component: StudentForumsComponent;
  let fixture: ComponentFixture<StudentForumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentForumsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentForumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
