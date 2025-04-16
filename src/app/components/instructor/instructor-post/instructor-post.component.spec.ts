import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorPostComponent } from './instructor-post.component';

describe('InstructorPostComponent', () => {
  let component: InstructorPostComponent;
  let fixture: ComponentFixture<InstructorPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructorPostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
