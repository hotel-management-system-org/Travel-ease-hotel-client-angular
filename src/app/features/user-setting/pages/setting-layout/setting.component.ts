import { Component } from '@angular/core';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {ProfileSettingComponent} from '../../components/profile-setting/profile-setting.component';
import {HistoryComponent} from '../../components/history/history.component';

@Component({
  selector: 'app-setting',
  imports: [
    MatTabGroup,
    MatTab,
    ProfileSettingComponent,
    HistoryComponent
  ],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.scss'
})
export class SettingComponent {

}
