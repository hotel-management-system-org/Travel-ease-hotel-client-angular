import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MainHeader} from './pages/home-page/inner-items/main-header/main-header';
import {FooterComponent} from './shared/components/footer-component/footer-component';

@Component({
  selector: 'app-root',
  imports: [
    MainHeader,
    RouterOutlet
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('travel-ease-client');
}
