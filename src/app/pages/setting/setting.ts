import { Component } from '@angular/core';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {ProfileSeting} from './inner/profile-setting/profile-seting';
import {History} from './inner/history/history';

@Component({
  selector: 'app-setting',
  imports: [
    MatTabGroup,
    MatTab,
    ProfileSeting,
    History
  ],
  templateUrl: './setting.html',
  styleUrl: './setting.scss'
})
export class Setting {

}
