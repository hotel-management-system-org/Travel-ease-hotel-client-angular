import { Component } from '@angular/core';
import {ManageProfilePic} from '../manage-profile-pic/manage-profile-pic';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';

@Component({
  selector: 'app-profile-setting',
  imports: [
    ManageProfilePic,
    MatButton,
    RouterLink,
    MatInput,
    MatLabel,
    MatFormField
  ],
  templateUrl: './profile-setting.html',
  styleUrl: './profile-setting.scss'
})
export class ProfileSeting {

}
