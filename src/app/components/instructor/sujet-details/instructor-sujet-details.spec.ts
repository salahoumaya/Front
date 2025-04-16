import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorSujetDetails } from './instructor-sujet-details';

describe('InstructorProfileComponent', () => {
  let component: InstructorSujetDetails;
  let fixture: ComponentFixture<InstructorSujetDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructorSujetDetails ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorSujetDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
