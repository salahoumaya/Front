import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorForumsComponent } from './instructor-forums.component';

describe('InstructorForumsComponent', () => {
  let component: InstructorForumsComponent;
  let fixture: ComponentFixture<InstructorForumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructorForumsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorForumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
