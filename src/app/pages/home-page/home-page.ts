import { Component } from '@angular/core';
import {HeroComponent} from './components/hero/hero.component';
import {PromoBannerComponent} from './components/promo-banner/promo-banner.component';
import {FeaturedDestinationsComponent} from './components/featured-destinations/featured-destinations.component';
import {FooterComponent} from './components/footer/footer.component';

@Component({
  selector: 'app-home-page',
  imports: [
    HeroComponent,
    PromoBannerComponent,
    FeaturedDestinationsComponent,
    FooterComponent
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss'
})
export class HomePage {

}
