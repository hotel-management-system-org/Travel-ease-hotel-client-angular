import {Component} from '@angular/core';
import {
  HotelImageGalleryComponent
} from '../../components/hotel-image-gallery/hotel-image-gallery.component';
import {HotelInfoComponent} from '../../components/hotel-info/hotel-info.component';
import {GuestReviewsComponent} from '../../components/guest-reviews/guest-reviews.component';
import {FooterComponent} from '../../../home/components/footer/footer.component';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  imports: [
    HotelImageGalleryComponent,
    HotelInfoComponent,
    GuestReviewsComponent,
    FooterComponent
  ],
  styleUrls: ['./hotel-details.component.scss']
})
export class HotelDetailsComponent{}
