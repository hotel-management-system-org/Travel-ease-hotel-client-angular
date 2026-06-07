import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProfilePicComponent } from './manage-profile-pic.component';

describe('ManageProfilePicComponent', () => {
  let component: ManageProfilePicComponent;
  let fixture: ComponentFixture<ManageProfilePicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageProfilePicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageProfilePicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
