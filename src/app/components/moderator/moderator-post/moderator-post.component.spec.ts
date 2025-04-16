import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorPostComponent } from './moderator-post.component';

describe('ModeratorPostComponent', () => {
  let component: ModeratorPostComponent;
  let fixture: ComponentFixture<ModeratorPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModeratorPostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModeratorPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
