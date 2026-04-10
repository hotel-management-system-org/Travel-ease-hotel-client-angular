import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSeting } from './profile-seting';

describe('ProfileSeting', () => {
  let component: ProfileSeting;
  let fixture: ComponentFixture<ProfileSeting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileSeting]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileSeting);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
