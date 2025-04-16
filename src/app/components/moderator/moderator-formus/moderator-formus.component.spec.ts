import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorFormusComponent } from './moderator-formus.component';

describe('ModeratorFormusComponent', () => {
  let component: ModeratorFormusComponent;
  let fixture: ComponentFixture<ModeratorFormusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModeratorFormusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModeratorFormusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
