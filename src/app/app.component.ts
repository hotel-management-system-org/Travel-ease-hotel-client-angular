import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MainHeaderComponent} from './features/home/components/main-header/main-header.component';
import {GlobalFooterComponent} from './shared/components/global-footer/global-footer.component';

@Component({
  selector: 'app-root',
  imports: [
    MainHeaderComponent,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  protected readonly title = signal('travel-ease-client');
}
