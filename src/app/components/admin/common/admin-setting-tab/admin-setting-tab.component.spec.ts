import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminSettingTabComponent} from './admin-setting-tab.component';

describe('InstructorSettingTabComponent', () => {
  let component: AdminSettingTabComponent;
  let fixture: ComponentFixture<AdminSettingTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSettingTabComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AdminSettingTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
