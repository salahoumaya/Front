import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorPfeDetailsComponent } from './instructor-pfe-details.component';

describe('PfeDetailsComponent', () => {
  let component: InstructorPfeDetailsComponent;
  let fixture: ComponentFixture<InstructorPfeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructorPfeDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorPfeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
