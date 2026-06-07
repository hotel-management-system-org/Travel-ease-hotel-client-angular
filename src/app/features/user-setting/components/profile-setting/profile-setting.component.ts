import { Component } from '@angular/core';
import {ManageProfilePicComponent} from '../manage-profile-pic/manage-profile-pic.component';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';

@Component({
  selector: 'app-profile-setting',
  imports: [
    ManageProfilePicComponent,
    MatButton,
    RouterLink,
    MatInput,
    MatLabel,
    MatFormField
  ],
  templateUrl: './profile-setting.component.html',
  styleUrl: './profile-setting.component.scss'
})
export class ProfileSettingComponent {

}
